import http from '@/modules/core/utils/http';
import { categoriesStore } from '../stores/categories-store';

export const categoriesApi = {
    load: async () => {
        const response = await http.get('/categories');

        if (!response?.data) return;

        categoriesStore.setState({
            records: response.data.records,
        });

        return {};
    },
};
