import { EOrderState } from 'src/app/enums/order/eorder-state.enum';

export interface ITabContent {
    title: string,
    state: EOrderState
}
