import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { ProductEntity } from '../utils/types';

type SearchResultStoreState = {
    records: ProductEntity[];
    clear: () => void;
};

export const searchResultStore = create<SearchResultStoreState>((set) => ({
    records: [],

    clear: () => set({ records: [] }),
}));

export const useSearchResultStore = createZustandSelectors(searchResultStore);
