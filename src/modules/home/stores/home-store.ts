import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { ProductEntity } from '@/modules/shop/utils/types';
import { create } from 'zustand';
import { BannerEntity } from '../utils/types';

type HomeState = {
    banners: BannerEntity[];
    bestSellers: ProductEntity[];
};

export const homeStore = create<HomeState>(() => ({
    banners: [] as BannerEntity[],
    bestSellers: [] as ProductEntity[],
}));

export const useHomeStore = createZustandSelectors(homeStore);
