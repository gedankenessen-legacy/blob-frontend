
import { ICategoryItem } from './ICategoryItem';
import { IPropertyItem } from './IPropertyItem';
import { IProductLocationItem } from './IProductLocationItem';

export interface IProductDashboardItem {
    id: number;
    name: string;
    sku?: string;
    categories: ICategoryItem[];
    productsAtLocations: IProductLocationItem[];
    locationString: string;
    properties: IPropertyItem[];
    price: number;
}
