import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { ProductEntity } from '@/modules/shop/utils/types';
import { create } from 'zustand';

type ProductStoreState = {
    record: ProductEntity;
};

export const productStore = create<ProductStoreState>(() => ({
    record: {} as ProductEntity,
}));

export const useProductStore = createZustandSelectors(productStore);
