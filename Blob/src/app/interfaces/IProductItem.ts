import { ILocationItem } from './ILocationItem';
import { ICategoryItem } from './ICategoryItem';
import { IPropertyItem } from './IPropertyItem';

export interface IProductItem {
    id: number;
    productservice: string;
    product: string;
    sku?: string;
    stock: string;
    category: ICategoryItem;
    location: ILocationItem;
    property: IPropertyItem;
    price: number;
}
