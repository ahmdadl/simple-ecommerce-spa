import http from '@/modules/core/utils/http';
import { productsStore } from '@/modules/shop/stores/products-store';
import { productStore } from '../stores/product-store';

export const productApi = {
    load: async (slug: string) => {
        const response = await http.get(`/products/${slug}`, {
            params: {
                withCategory: true,
                withBrand: true,
                withTags: true,
            },
        });

        if (typeof response !== 'object' || !response?.data) return;

        productStore.setState({
            record: response.data.record,
        });

        productsStore.setState({
            records: response.data.relatedProducts,
        });

        return {
            record: response.data.record,
        };
    },
};
