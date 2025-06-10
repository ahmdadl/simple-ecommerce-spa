import CategoryProductsPage from '@/modules/categories/pages/CategoryProductsPage';
import CategoryProductsSkeletonPage from '@/modules/categories/pages/CategoryProductsSkeletonPage';
import { getCatalogMetaData } from '@/modules/core/utils/methods';
import { shopApi } from '@/modules/shop/utils/shopApi';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_catalog/categories/$slug')({
    head: ({ loaderData }) => ({
        // @ts-ignore
        ...getCatalogMetaData(loaderData?.record),
    }),

    component: CategoryProductsPage,

    loader: ({ params, location }) => {
        return shopApi.loadProducts({
            forCategory: params.slug,
            withBrand: true,
        });
    },

    pendingComponent: CategoryProductsSkeletonPage,
});

export const categoryRoute = Route;
