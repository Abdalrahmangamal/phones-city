export interface Product {
  id: number;
  name: string;
  containerstyle?:string;
  price: number;
  favourite?: boolean;
  isNew?: boolean;
  discount?: string;
  variations?: { color: string; image: string }[];
  image?: string; // Added image property
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