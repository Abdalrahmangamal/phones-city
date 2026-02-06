export interface Product {
  id: number;
  name: string;
  about?: string;
  capacity?: string;

  main_image: string | null;

  original_price: string;
  final_price: string;

  stock_status: string; // "limited" | "in_stock" | "out_of_stock"

  category?: {
    id: number;
    name: string;
  };

  applied_offer?: {
    id: number;
    name_en: string | null;
    name_ar: string | null;
    discount_amount: string;
  } | null;

  slug: string;
  price?: string;
  options: {
    id: number;
    type: string; // "color", ...
    value: string;
    sku?: string;
    original_price: string;
    final_price: string;
    price?: string;
    sale_price?: string;
    quantity?: number;
    stock_status?: string;
    images: { id: number; url: string }[];
  }[];

  images: { id: number; url: string }[];

  quantity?: number;
  points?: number;
  product_mark?: string;
  average_rating?: number;
  reviews_count?: number;
}

// types.ts
export type Fulfillment = "delivery" | "pickup";
export type PaymentMethod =
  | "card" | "bank" | "tabby" | "tamara" | "emkan" | "madfu" | "mispay" | "amwal";

export type Address = {
  id?: string;               // ييجي من الـ API بعد الحفظ
  firstName: string;         // الاسم الأول
  lastName: string;          // الاسم الثاني
  country: string;           // الدولة/المنطقة (ثابت: "المملكة العربية السعودية")
  city: string;              // المدينة (قائمة منسدلة)
  street: string;            // شارع
  district: string;          // الحي
  phone: string;             // +966...
  email: string;             // البريد الإلكتروني
  orderNotes?: string;       // ملاحظات الطلب (اختياري)
  addressLabel?: string;     // حفظ العنوان باسم (اختياري) — "المنزل 2" مثلاً
};