import ResetPasswordPage from '@/modules/auth/pages/ResetPasswordPage';
import { useForgetPasswordStore } from '@/modules/auth/stores/forget-password-store';
import { userStore } from '@/modules/core/stores/userStore';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_auth/reset-password')({
    head: () => ({
        ...getPageMetaData('reset-password'),
    }),

    component: ResetPasswordPage,
    beforeLoad: async ({ search }) => {
        if (userStore.getState().isCustomer()) {
            throw redirect({
                to: (search as { redirect?: string })?.redirect ?? urls.home,
            });
        }

        if (useForgetPasswordStore.getState().email === '') {
            throw redirect({
                to: urls.auth.forgetPassword,
            });
        }
    },
});
