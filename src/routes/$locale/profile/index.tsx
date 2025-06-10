import { getPageMetaData } from '@/modules/core/utils/methods';
import ProfilePage from '@/modules/profile/pages/ProfilePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/profile/')({
    head: () => ({
        ...getPageMetaData('profile'),
    }),

    component: ProfilePage,
});
