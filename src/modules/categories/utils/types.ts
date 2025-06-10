import { LocalizedEntity } from '@/modules/core/utils/types';

export type CategoryEntity = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    image: string;
    products_count?: number;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string[];
    meta_image: string | null;
    is_main: boolean;
};

export type CategoryCachedEntity = CategoryEntity & {
    title: LocalizedEntity;
    description: LocalizedEntity;
    meta_title: LocalizedEntity;
    meta_description: LocalizedEntity;
};
