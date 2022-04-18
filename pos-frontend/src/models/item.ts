import { Product } from './product';

export interface ItemDto {
  product: string;
  quantity: number;
}

export interface Item {
  product: Product;
  quantity: number;
}
