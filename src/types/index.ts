export interface Product {
  id: number;
  name: string;
  price: number;
  favourite?: boolean;
  isNew?: boolean;
  discount?: string;
  variations?: { color: string; image: string }[];
}
