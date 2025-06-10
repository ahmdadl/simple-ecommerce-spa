import { cartApi } from '@/modules/cart/utils/cart-api';
import BaseCheckoutPage from '@/modules/checkout/pages/BaseCheckoutPage';
import CheckoutSkeletonPage from '@/modules/checkout/pages/CheckoutSkeletonPage';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_cart/checkout')({
    head: () => ({
        ...getPageMetaData('checkout'),
    }),

    component: BaseCheckoutPage,

    loader: async () =>
        cartApi.load({
            with: ['addresses', 'paymentMethods', 'wallet'],
        }),

    pendingComponent: CheckoutSkeletonPage,
});

export const checkoutRoute = Route;
