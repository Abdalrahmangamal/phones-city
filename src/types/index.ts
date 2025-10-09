export interface Product {
  id: number;
  name: string;
  price: number;
  isNew?: boolean;
  discount?: string;
  variations?: { color: string; image: string }[];
}
