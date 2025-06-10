import { PaginationInfoEntity } from '@/modules/core/utils/types';
import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { OrderEntity } from '../utils/types';

type OrdersState = {
    list: OrderEntity[];
    currentOrder: null | OrderEntity;
    paginationInfo: PaginationInfoEntity;
};

export const ordersStore = create<OrdersState>(() => ({
    list: [],
    currentOrder: null,
    paginationInfo: {} as PaginationInfoEntity,
}));

export const useOrdersStore = createZustandSelectors(ordersStore);
