import { IAdress } from '../iadress';

export interface ICustomerItem {
    id: number;
    firstName: string;
    lastName: string;
    address: IAdress;
    createdAt: string;
}
