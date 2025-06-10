import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { BrandEntity } from '../utils/types';

type BrandsStoreState = {
    records: BrandEntity[];
};

export const BrandsStore = create<BrandsStoreState>(() => ({
    records: [],
}));

export const useBrandsStore = createZustandSelectors(BrandsStore);
