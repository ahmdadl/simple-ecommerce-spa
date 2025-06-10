import CartPage from '@/modules/cart/pages/CartPage';
import CartSkeletonPage from '@/modules/cart/pages/CartSkeletonPage';
import { cartApi } from '@/modules/cart/utils/cart-api';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_cart/cart')({
    head: () => ({
        ...getPageMetaData('cart'),
    }),

    component: CartPage,

    loader: async () => cartApi.load(),

    pendingComponent: CartSkeletonPage,
});
