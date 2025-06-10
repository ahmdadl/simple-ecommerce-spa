import http from './http';

interface User {
    id: string;
    email: string;
    name: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

// API endpoints
export const api = {
    auth: {
        getUser: () => http.get<User>('/auth/user'),

        guest: {
            login: () =>
                http.post<{ user: User; token: string }>('/login/guests'),

            register: (userData: RegisterData) =>
                http.post<{ user: User; token: string }>('/register', userData),

            forgetPassword: (email: string) =>
                http.post<{ success: boolean }>('/forget-password', { email }),

            resetPassword: (
                password: string,
                password_confirmation: string,
                otp: string
            ) =>
                http.post<{ user: User; token: string }>('/reset-password', {
                    password,
                    password_confirmation,
                    otp,
                }),
        },

        login: (credentials: LoginCredentials) =>
            http.post<{ user: User; token: string }>('/login', credentials),

        logout: () => http.post<void>('/logout'),
    },
};
