import { requireGuest } from '@/modules/core/utils/middlewares';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_auth')({
    component: RouteComponent,

    beforeLoad: ({ location }) => requireGuest(location),
});

function RouteComponent() {
    return <Outlet />;
}
