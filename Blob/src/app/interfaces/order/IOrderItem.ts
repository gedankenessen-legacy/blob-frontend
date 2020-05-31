import { ICustomerItem } from '../customer/ICustomerItem';
import { EOrderState } from 'src/app/enums/order/eorder-state.enum';
import { IOrderProduct } from './IOrderProduct';
import { IOrderState } from './IOrderState';

export interface IOrderItem {
    id: number;
    locationId: number;
    customer: ICustomerItem;
    createdAt: string;
    orderedProducts:IOrderProduct[];
    state: IOrderState;
}
