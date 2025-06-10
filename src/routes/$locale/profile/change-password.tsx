import { getPageMetaData } from '@/modules/core/utils/methods';
import ChangePasswordPage from '@/modules/profile/pages/ChangePasswordPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/profile/change-password')({
    head: () => ({
        ...getPageMetaData('change-password'),
    }),

    component: ChangePasswordPage,
});
