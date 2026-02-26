export type ParsedSortToken = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};

type CategoryNodeLike = {
  id?: number | string | null;
  children?: CategoryNodeLike[] | null;
};

export function parseSortToken(token?: string | null): ParsedSortToken | null {
  if (!token) return null;

  const normalized = String(token).trim();
  if (!normalized) return null;

  const [sortBy, sortOrderRaw] = normalized.split(":");
  if (!sortBy) return null;

  const sortOrder = sortOrderRaw === "asc" ? "asc" : "desc";
  return { sortBy, sortOrder };
}

export function getProductNumericPrice(product: any): number {
  const raw = product?.final_price ?? product?.original_price ?? product?.price ?? 0;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  if (typeof raw === "string") {
    const parsed = Number(raw.replace(/[^\d.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function isProductOnOffer(product: any): boolean {
  if (!product || typeof product !== "object") return false;

  if (product.applied_offer) return true;
  if (product.has_offer === true || product.has_offer === 1) return true;

  const finalPrice = getProductNumericPrice(product);
  const originalPrice = getProductNumericPrice({ original_price: product.original_price });

  if (originalPrice > 0 && finalPrice > 0 && finalPrice < originalPrice) {
    return true;
  }

  return false;
}

const toFiniteNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const categorySelectionCache = new WeakMap<object, Map<number, Set<number>>>();
const fallbackCategorySelectionCache = new Map<number, Set<number>>();

const collectDescendantCategoryIds = (
  categories: CategoryNodeLike[] | undefined,
  targetId: number
): Set<number> => {
  if (!Array.isArray(categories) || categories.length === 0) {
    let fallback = fallbackCategorySelectionCache.get(targetId);
    if (!fallback) {
      fallback = new Set<number>([targetId]);
      fallbackCategorySelectionCache.set(targetId, fallback);
    }
    return fallback;
  }

  const treeKey = categories as unknown as object;
  let treeCache = categorySelectionCache.get(treeKey);
  if (!treeCache) {
    treeCache = new Map<number, Set<number>>();
    categorySelectionCache.set(treeKey, treeCache);
  }

  const cached = treeCache.get(targetId);
  if (cached) return cached;

  const findNode = (nodes: CategoryNodeLike[]): CategoryNodeLike | null => {
    for (const node of nodes) {
      if (!node) continue;
      const nodeId = toFiniteNumber((node as any).id);
      if (nodeId === targetId) return node;
      if (Array.isArray(node.children) && node.children.length > 0) {
        const found = findNode(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const root = findNode(categories);
  if (!root) {
    const fallback = new Set<number>([targetId]);
    treeCache.set(targetId, fallback);
    return fallback;
  }

  const ids = new Set<number>();
  const walk = (node?: CategoryNodeLike | null) => {
    if (!node) return;
    const nodeId = toFiniteNumber((node as any).id);
    if (nodeId !== null) {
      ids.add(nodeId);
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };

  walk(root);
  if (ids.size === 0) ids.add(targetId);
  treeCache.set(targetId, ids);
  return ids;
};

export function getCategorySelectionIdSet(
  selectedCategoryId: number | null | undefined,
  categoriesTree?: CategoryNodeLike[]
): Set<number> | null {
  const parsedId = toFiniteNumber(selectedCategoryId);
  if (parsedId === null) return null;
  return collectDescendantCategoryIds(categoriesTree, parsedId);
}

export function productMatchesCategoryIdSet(
  product: any,
  selectedIds: ReadonlySet<number> | null | undefined
): boolean {
  if (!product || !selectedIds || selectedIds.size === 0) return false;

  const matchesSelected = (value: unknown) => {
    const parsed = toFiniteNumber(value);
    return parsed !== null && selectedIds.has(parsed);
  };

  if (
    matchesSelected(product?.category?.id) ||
    matchesSelected(product?.category?.parent_id) ||
    matchesSelected(product?.category_id) ||
    matchesSelected(product?.parent_category_id)
  ) {
    return true;
  }

  if (Array.isArray(product?.category_ids)) {
    for (const id of product.category_ids) {
      if (matchesSelected(id)) return true;
    }
  }

  if (Array.isArray(product?.categories)) {
    for (const cat of product.categories) {
      if (matchesSelected(cat?.id) || matchesSelected(cat?.parent_id)) {
        return true;
      }
    }
  }

  return false;
}

export function productMatchesCategorySelection(
  product: any,
  selectedCategoryId: number,
  categoriesTree?: CategoryNodeLike[]
): boolean {
  const selectedIds = getCategorySelectionIdSet(selectedCategoryId, categoriesTree);
  return productMatchesCategoryIdSet(product, selectedIds);
}
