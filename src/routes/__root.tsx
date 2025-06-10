import BottomMenu from '@/modules/core/components/BottomMenu/BottomMenu';
import Footer from '@/modules/core/components/Footer/Footer';
import Header from '@/modules/core/components/Header/Header';
import LayoutShared from '@/modules/core/components/LayoutShared/LayoutShared';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    head() {
        return {
            meta: [
                {
                    charSet: 'utf-8',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    title: 'Supps Store',
                },
            ],
            links: [
                {
                    rel: 'icon',
                    href: '/meta/favicon-96x96.png',
                },
                {
                    rel: 'canonical',
                    href: window.location.href,
                },
            ],
        };
    },
    component: () => (
        <>
            <HeadContent />

            <main className='min-h-screen  mx-auto'>
                <Header />

                <Outlet />

                <BottomMenu />

                <Footer />

                <LayoutShared />
            </main>
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
});
