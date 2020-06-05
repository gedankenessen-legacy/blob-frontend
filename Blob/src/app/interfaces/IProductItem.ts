import { IProductLocationItem } from './IProductLocationItem';
import { ICategoryItem } from './ICategoryItem';
import { IPropertyItem } from './IPropertyItem';

export interface IProductItem {
    id: number;
    productservice: string;
    name: string;
    sku?: string;
    category: ICategoryItem;
    location: IProductLocationItem;
    property: IPropertyItem;
    price: number;
}
