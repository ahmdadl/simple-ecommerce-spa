import { ProductEntity } from '@/modules/shop/utils/types';

export type BrandEntity = {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    image: string | null;
    sort_order: number;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string[] | null;
    meta_image: string | null;
    products_count: number;
    products: ProductEntity[];
    is_main: boolean;
};
