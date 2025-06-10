import { requireCustomer } from '@/modules/core/utils/middlewares';
import ProfileLayout from '@/modules/profile/components/ProfileLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/profile')({
    component: ProfileLayout,

    beforeLoad: async ({ location }) => requireCustomer(location),
});
