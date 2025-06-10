import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { CategoryEntity } from '../utils/types';

type CategoriesStoreState = {
    records: CategoryEntity[];
};

export const categoriesStore = create<CategoriesStoreState>(() => ({
    records: [],
}));

export const useCategoriesStore = createZustandSelectors(categoriesStore);
