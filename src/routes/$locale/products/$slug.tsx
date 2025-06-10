import { getCatalogMetaData } from '@/modules/core/utils/methods';
import ProductPage from '@/modules/product/pages/ProductPage';
import ProductSkeletonPage from '@/modules/product/pages/ProductSkeletonPage';
import { productApi } from '@/modules/product/utils/product-api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/products/$slug')({
    head: ({ loaderData }) => ({
        // @ts-ignore
        ...getCatalogMetaData(loaderData?.record),
    }),

    component: ProductPage,

    loader: ({ params }) => productApi.load(params.slug),

    pendingComponent: ProductSkeletonPage,
});

export const productRoute = Route;
