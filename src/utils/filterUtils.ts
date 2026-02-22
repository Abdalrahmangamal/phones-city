export type ParsedSortToken = {
  sortBy: string;
  sortOrder: "asc" | "desc";
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

  const finalPrice = getProductNumericPrice({ final_price: product.final_price });
  const originalPrice = getProductNumericPrice({ final_price: product.original_price });

  if (originalPrice > 0 && finalPrice > 0 && finalPrice < originalPrice) {
    return true;
  }

  return false;
}
