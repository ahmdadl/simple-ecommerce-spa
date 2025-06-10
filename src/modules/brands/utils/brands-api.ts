import http from '@/modules/core/utils/http';
import { BrandsStore } from '../stores/brands-store';

export const brandsApi = {
    load: async () => {
        const response = await http.get('/brands');

        if (!response?.data) return;

        BrandsStore.setState({
            records: response.data.records,
        });

        return {};
    },
};
