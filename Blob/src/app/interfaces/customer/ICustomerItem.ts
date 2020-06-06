import { IAdress } from '../iadress';

export interface ICustomerItem {
    id: number;
    firstname: string;
    lastname: string;
    address: IAdress;
    createdAt: string;
}
