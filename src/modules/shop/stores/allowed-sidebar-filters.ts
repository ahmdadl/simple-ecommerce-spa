import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';

type AllowedFiltersState = {
    list: string[];
    all: string[];
    enableForShop: () => void;
    enableForCategory: () => void;
    enableForBrand: () => void;
    enableForTag: () => void;
};
export const allowedSidebarFilters = create<AllowedFiltersState>(
    (set, get) => ({
        list: [],
        all: ['category', 'brand', 'price', 'tags'],

        enableForShop: () => set({ list: get().all }),

        enableForCategory: () =>
            set({ list: get().all.filter((item) => item !== 'category') }),

        enableForBrand: () =>
            set({ list: get().all.filter((item) => item !== 'brand') }),

        enableForTag: () =>
            set({ list: get().all.filter((item) => item !== 'tags') }),
    })
);

export const useAllowedSidebarFilters = createZustandSelectors(
    allowedSidebarFilters
);
