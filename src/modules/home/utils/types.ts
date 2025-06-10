import { BrandEntity } from '@/modules/brands/utils/types';
import { CategoryEntity } from '@/modules/categories/utils/types';
import { ProductEntity } from '@/modules/shop/utils/types';

export type BannerEntity = {
    id: number;
    title: string;
    subtitle: string;
    media: string;
    action: BannerActionType;
    action_id: string;
    category: CategoryEntity | null;
    product: ProductEntity | null;
    brand: BrandEntity | null;
};

export enum BannerActionType {
    CATEGORY = 'category',
    PRODUCT = 'product',
    BRAND = 'brand',
    MEDIA = 'media',
}
