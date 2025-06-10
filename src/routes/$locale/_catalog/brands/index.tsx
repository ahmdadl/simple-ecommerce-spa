import BrandsPage from '@/modules/brands/pages/BrandsPage';
import { BrandsSkeletonPage } from '@/modules/brands/pages/BrandsSkeletonPage';
import { brandsApi } from '@/modules/brands/utils/brands-api';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_catalog/brands/')({
    head: () => ({
        ...getPageMetaData('brands'),
    }),

    component: BrandsPage,

    loader: () => brandsApi.load(),

    pendingComponent: BrandsSkeletonPage,
});
