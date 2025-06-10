import BrandProductsPage from '@/modules/brands/pages/BrandProductsPage';
import BrandProductsSkeletonPage from '@/modules/brands/pages/BrandProductsSkeletonPage';
import { getCatalogMetaData } from '@/modules/core/utils/methods';
import { filtersStore } from '@/modules/shop/stores/filters-store';
import { shopApi } from '@/modules/shop/utils/shopApi';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_catalog/brands/$slug')({
    head: ({ loaderData }) => ({
        // @ts-ignore
        ...getCatalogMetaData(loaderData?.record),
    }),
    component: BrandProductsPage,

    loader: ({ params, location }) => {
        filtersStore.getState().setBrandSlug(params.slug, location.search);

        return shopApi.loadProducts({
            forBrand: params.slug,
        });
    },

    pendingComponent: BrandProductsSkeletonPage,
});

export const brandRoute = Route;
