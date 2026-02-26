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

const addCategoryId = (set: Set<number>, value: unknown) => {
  const parsed = toFiniteNumber(value);
  if (parsed !== null) {
    set.add(parsed);
  }
};

const collectDescendantCategoryIds = (
  categories: CategoryNodeLike[] | undefined,
  targetId: number
): number[] => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return [targetId];
  }

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
  if (!root) return [targetId];

  const ids = new Set<number>();
  const walk = (node?: CategoryNodeLike | null) => {
    if (!node) return;
    addCategoryId(ids, (node as any).id);
    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };

  walk(root);
  return ids.size > 0 ? Array.from(ids) : [targetId];
};

export function productMatchesCategorySelection(
  product: any,
  selectedCategoryId: number,
  categoriesTree?: CategoryNodeLike[]
): boolean {
  if (!product || !selectedCategoryId) return false;

  const selectedIds = new Set(
    collectDescendantCategoryIds(categoriesTree, Number(selectedCategoryId)).filter(
      (id) => Number.isFinite(id)
    )
  );

  if (selectedIds.size === 0) {
    selectedIds.add(Number(selectedCategoryId));
  }

  const productCategoryIds = new Set<number>();

  addCategoryId(productCategoryIds, product?.category?.id);
  addCategoryId(productCategoryIds, product?.category?.parent_id);
  addCategoryId(productCategoryIds, product?.category_id);
  addCategoryId(productCategoryIds, product?.parent_category_id);

  if (Array.isArray(product?.category_ids)) {
    product.category_ids.forEach((id: unknown) => addCategoryId(productCategoryIds, id));
  }

  if (Array.isArray(product?.categories)) {
    product.categories.forEach((cat: any) => {
      addCategoryId(productCategoryIds, cat?.id);
      addCategoryId(productCategoryIds, cat?.parent_id);
    });
  }

  for (const id of productCategoryIds) {
    if (selectedIds.has(id)) {
      return true;
    }
  }

  return false;
}
