import { IAdress } from '../IAdress';

export interface ICustomerItem {
  id: number;
  firstname: string;
  lastname: string;
  address: IAdress;
  createdAt: string;
}
