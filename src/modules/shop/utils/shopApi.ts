import http from '@/modules/core/utils/http';
import { productsStore } from '../stores/products-store';

export const shopApi = {
    loadProducts: async (params: any = {}, allowFilters: boolean = true) => {
        const response = await http.get('/products', {
            params: {
                ...params,
                withCategory: !params.withBrand, // default is true
                withBrand: params.withBrand,
            },
        });

        if (!response?.data) return;

        productsStore.setState({
            records: response.data.records,
            paginationInfo: response.data.paginationInfo,
            category: response.data.category,
            brand: response.data.brand,
            tag: response.data.tag,
        });

        return {
            record:
                response.data.category ??
                response.data.brand ??
                response.data.tag,
        };
    },

    searchForProducts: async (query: string) => {
        return {};
    },
};
