import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { FilterState } from '../utils/types';

export const filtersStore = create<FilterState>((set, get) => ({
    filters: null,
    selectedCategories: [],
    selectedBrands: [],
    currentPriceRange: [0, 1000],
    isLoading: false,
    error: null,
    currentPage: 1,
    sortBy: '',
    categorySlug: '',
    brandSlug: '',
    selectedTags: [],
    tagSlug: '',

    setFilters: (filters) =>
        // @ts-ignore
        set((state) => {
            const newState = {
                ...state,
                filters,
                currentPriceRange: state.currentPriceRange.every(
                    (v) => v === 0 || v === 1000
                )
                    ? [
                          Number.parseFloat(filters.price_range.min),
                          Number.parseFloat(filters.price_range.max),
                      ]
                    : state.currentPriceRange,
                currentPage: state.currentPage || 1,
            };
            return newState;
        }),

    toggleCategory: (categoryId) =>
        set((state) => ({
            selectedCategories: state.selectedCategories.includes(categoryId)
                ? state.selectedCategories.filter((id) => id !== categoryId)
                : [...state.selectedCategories, categoryId],
            currentPage: 1,
        })),

    toggleBrand: (brandId) =>
        set((state) => ({
            selectedBrands: state.selectedBrands.includes(brandId)
                ? state.selectedBrands.filter((id) => id !== brandId)
                : [...state.selectedBrands, brandId],
            currentPage: 1,
        })),

    toggleTag: (tagId) => {
        console.log({
            selectedTags: get().selectedTags.includes(tagId)
                ? get().selectedTags.filter((id) => id !== tagId)
                : [...get().selectedTags, tagId],
            currentPage: 1,
        });
        return set((state) => ({
            selectedTags: state.selectedTags.includes(tagId)
                ? state.selectedTags.filter((id) => id !== tagId)
                : [...state.selectedTags, tagId],
            currentPage: 1,
        }));
    },

    setPriceRange: (range) => set({ currentPriceRange: range, currentPage: 1 }),

    setPage: (page: number) => set({ currentPage: page }),

    setSortBy: (sortBy: string) => set({ sortBy, currentPage: 1 }),

    setCategorySlug: (
        slug: string,
        search: Record<string, string | string[]>
    ) => {
        set({ categorySlug: slug, brandSlug: '' });

        get().syncWithUrl(search);
    },

    setBrandSlug: (slug: string, search: Record<string, string | string[]>) => {
        set({ brandSlug: slug, categorySlug: '' });

        get().syncWithUrl(search);
    },

    setTagSlug: (slug: string, search: Record<string, string | string[]>) => {
        set({ tagSlug: slug, categorySlug: '' });

        get().syncWithUrl(search);
    },

    forShop: (search: Record<string, string | string[]>) => {
        set({ categorySlug: '', brandSlug: '' });

        get().syncWithUrl(search);
    },

    resetFilters: () =>
        set((state) => ({
            selectedCategories: [],
            selectedBrands: [],
            currentPriceRange: state.filters
                ? [
                      Number.parseFloat(state.filters.price_range.min),
                      Number.parseFloat(state.filters.price_range.max),
                  ]
                : [0, 1000],
            currentPage: state.currentPage || 1,
            sortBy: '',
            categorySlug: '',
            brandSlug: '',
            selectedTags: [],
            tagSlug: '',
        })),

    syncWithUrl: (search) =>
        set((state) => {
            const categories =
                typeof search.categories === 'string'
                    ? search.categories.split(',').filter(Boolean)
                    : [];
            const brands =
                typeof search.brands === 'string'
                    ? search.brands.split(',').filter(Boolean)
                    : [];
            const price =
                typeof search.price === 'string'
                    ? search.price.split('-')
                    : null;
            const tags =
                typeof search.tags === 'string'
                    ? search.tags.split(',').filter(Boolean)
                    : [];

            return {
                ...state,
                selectedCategories: categories,
                selectedBrands: brands,
                currentPriceRange: price
                    ? [Number.parseFloat(price[0]), Number.parseFloat(price[1])]
                    : state.filters
                      ? [
                            Number.parseFloat(state.filters.price_range.min),
                            Number.parseFloat(state.filters.price_range.max),
                        ]
                      : [0, 1000],
                currentPage: Number(search.page) ?? 1,
                sortBy: search.sortBy as string,
                selectedTags: tags,
            };
        }),
}));

export const useFiltersStore = createZustandSelectors(filtersStore);
