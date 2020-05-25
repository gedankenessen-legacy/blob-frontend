import { IAdress } from '../iadress';

export interface ICustomerItem {
    id: number;
    firstName: string;
    lastName
    address: IAdress;
    createdAt: string;
}
