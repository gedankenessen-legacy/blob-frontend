import { IProductItem } from '../product/IProductItem';

export interface ITopSellerItem {
  product: IProductItem | string;
  count: number;
  profit: number;
}
