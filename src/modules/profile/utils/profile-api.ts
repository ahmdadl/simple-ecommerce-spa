import http from '@/modules/core/utils/http';

export const profileApi = {
    update: (data: any) => http.patch('/profile/update', data),
    changePassword: (data: any) => http.patch('/profile/change-password', data),

    cities: () => http.get('/cities'),
    governments: () => http.get('/governments'),

    address: {
        index: () => http.get('/profile/addresses'),
    },
    wishlist: {
        index: () => http.get('/profile/wishlist'),
    },
    orders: {
        index: () => http.get('/profile/orders'),
        show: (id: number) => http.get(`/profile/orders/${id}`),
    },
};
