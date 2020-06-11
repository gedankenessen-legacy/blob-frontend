
import { ICategoryItem } from './ICategoryItem';
import { IPropertyItem } from './IPropertyItem';
import { IProductLocationItem } from './IProductLocationItem';

export interface IProductDashboardItem {
    id: number;
    productservice: string;
    name: string;
    sku?: string;
    category: ICategoryItem[];
    productsAtLocations: IProductLocationItem[];
    locationString: string;
    property: IPropertyItem[];
    price: number;
}
