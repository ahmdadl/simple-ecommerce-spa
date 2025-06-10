import http from '@/modules/core/utils/http';
import { citiesStore } from '../stores/cities-store';
import { governmentsStore } from '../stores/goverments-store';

export const addressApi = {
    getAll: (withGovernments: boolean = false, withCities: boolean = false) =>
        http.get('/addresses', {
            params: { withGovernments, withCities },
        }),
    create: (data: any) => http.post('/addresses', data),
    update: (addressId: string, data: any) =>
        http.patch('/addresses/' + addressId, data),
    delete: (id: string) => http.delete(`/addresses/${id}`),

    loadGovernments: async () => {
        if (governmentsStore.getState().records.length) return;

        const response = await http.get('/governments');

        if (!response?.data) return;

        governmentsStore.setState({
            records: response.data.records,
        });
    },

    loadCities: async (governmentId: string) => {
        if (citiesStore.getState().isGovernmentLoaded(governmentId)) return;

        const response = await http.get(`/cities`, {
            params: {
                government_id: governmentId,
            },
        });

        if (!response?.data) return;

        citiesStore.getState().addCities(governmentId, response.data.records);
    },

    validate: async (data: any) => http.post('/addresses/validate', data),
};
