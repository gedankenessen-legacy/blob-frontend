

import { ICategoryItem } from './ICategoryItem';
import { IPropertyItem } from './IPropertyItem';
import { IProductLocationItem } from './IProductLocationItem';

export interface IProductItem {
    id?: number;
    name: string;
    sku?: string;
    categories: ICategoryItem[];
    productsAtLocations: IProductLocationItem[];
    properties: IPropertyItem[];
    price: number;
}
