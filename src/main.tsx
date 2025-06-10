import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
    RouterProvider,
    createRouteMask,
    createRouter,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { messages as arMessages } from './locales/ar/messages';
import { messages as enMessages } from './locales/en/messages';
import './main.css';
import BaseLoadingPage from './modules/core/components/BaseLoadingPage';
import useLocaleStore from './modules/core/stores/localeStore';
import Error404Page from './modules/errors/pages/Error404Page';
import ErrorGenericPage from './modules/errors/pages/ErrorGenericPage';
import { routeTree } from './routeTree.gen';

const withoutLocaleToLocalizedMask = createRouteMask({
    routeTree,
    from: '/',
    // @ts-ignore
    to: '/en',
    params: true,
});

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    routeMasks: [withoutLocaleToLocalizedMask],
    defaultHashScrollIntoView: true,
    defaultErrorComponent: ErrorGenericPage,
    defaultNotFoundComponent: Error404Page,
    notFoundMode: 'root',
    defaultPendingComponent: BaseLoadingPage,
});
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

i18n.load({
    en: enMessages,
    ar: arMessages,
});
const locale = useLocaleStore.getState().locale;
i18n.activate(locale);
document.documentElement.lang = locale;
document.documentElement.dir = useLocaleStore.getState().isRtl()
    ? 'rtl'
    : 'ltr';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
    <StrictMode>
        <I18nProvider i18n={i18n}>
            <RouterProvider router={router} />
        </I18nProvider>
    </StrictMode>
);
