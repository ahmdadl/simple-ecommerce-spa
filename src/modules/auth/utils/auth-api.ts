import useUserStore from '@/modules/core/stores/userStore';
import http from '@/modules/core/utils/http';
import { parseError } from '@/modules/core/utils/parseError';
import { AxiosResponse } from 'axios';

interface LoginCredentials {
    email: string;
    password: string;
}

// API endpoints
export const authApi = {
    guest: {
        login: async () => {
            const response = (await http
                .post('/login/guests')
                .catch(parseError)) as AxiosResponse;

            if (!response?.data) return;

            useUserStore.getState().login({
                ...response.data.record,
                isLoaded: true,
                role: 'guest',
            });

            return response.data;
        },

        register: (userData: any) => http.post('/register', userData),

        forgetPassword: (email: string) =>
            http.post('/forget-password', { email }),

        resetPassword: (data: any) =>
            http.post<{ record: any }>('/reset-password', {
                ...data,
            }),
    },

    login: (credentials: LoginCredentials) => http.post('/login', credentials),
};
