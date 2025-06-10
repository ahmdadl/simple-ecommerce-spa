import CategoriesPage from '@/modules/categories/pages/CategoriesPage';
import { CategorySkeletonPage } from '@/modules/categories/pages/CategoriesSkeletonPage';
import { categoriesApi } from '@/modules/categories/utils/categories-api';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_catalog/categories/')({
    head: () => ({
        ...getPageMetaData('categories'),
    }),

    component: CategoriesPage,

    loader: () => categoriesApi.load(),

    pendingComponent: CategorySkeletonPage,
});
