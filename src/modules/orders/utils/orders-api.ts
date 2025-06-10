import http from '@/modules/core/utils/http';
import { parseError } from '@/modules/core/utils/parseError';
import { AxiosResponse } from 'axios';
import { ordersStore } from '../stores/orders-store';

export const ordersApi = {
    index: (params: any = {}) =>
        http.get('/profile/orders', {
            params,
        }),
    show: (id: string) => http.get(`/orders/${id}`),

    loadOrders: async (page?: number, id?: string) => {
        const params: any = {
            page: page ?? 1,
        };

        if (id) {
            params.id = id;
        }

        const response = (await http
            .get('/profile/orders', {
                params,
            })
            .catch(parseError)) as AxiosResponse;

        if (!response?.data?.records) return;

        const data = response.data;

        ordersStore.setState({
            list: data.records,
            paginationInfo: data.paginationInfo,
        });

        return;
    },

    loadOne: async (id: string) => {
        const response = (await ordersApi
            .show(id)
            .catch(parseError)) as AxiosResponse;

        if (!response?.data?.record) return;

        ordersStore.setState({
            currentOrder: response.data.record,
        });

        return;
    },
};
