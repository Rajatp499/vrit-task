export interface ProductType {
  _id: number;
  title:string;
  isNew: boolean;
  oldPrice: string;
  price: number;
  discountedPrice: number;
  description: string;
  category: string;
  type: string;
  stock: number;
  brand: string;
  size: string[];
  image: string;
  rating: number;
}
