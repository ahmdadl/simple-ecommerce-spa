import { BrandEntity } from '@/modules/brands/utils/types';
import { CategoryEntity } from '@/modules/categories/utils/types';
import { PaginationInfoEntity } from '@/modules/core/utils/types';
import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { ProductEntity } from '../utils/types';
import { TagEntity } from './../../tags/utils/types';

type ProductsState = {
    records: ProductEntity[];
    paginationInfo: PaginationInfoEntity;
    category: CategoryEntity | null;
    brand: BrandEntity | null;
    tag: TagEntity | null;

    toggleWishlist: (productId: string) => void;
    cartIncrement: (productId: string) => void;
    cartDecrement: (productId: string) => void;
};

export const productsStore = create<ProductsState>((set) => ({
    records: [],
    paginationInfo: {} as PaginationInfoEntity,
    category: null,
    brand: null,
    tag: null,

    toggleWishlist: (productId: string) => {
        set((state) => ({
            records: state.records.map((product) => {
                if (product.id === productId) {
                    return { ...product, is_wished: !product.is_wished };
                }
                return product;
            }),
        }));
    },

    cartIncrement: (productId: string) => {
        set((state) => ({
            records: state.records.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        carted_quantity: product.carted_quantity + 1,
                        is_carted: true,
                    };
                }
                return product;
            }),
        }));
    },

    cartDecrement: (productId: string) => {
        set((state) => ({
            records: state.records.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        carted_quantity: product.carted_quantity - 1,
                        is_carted: product.carted_quantity - 1 > 0,
                    };
                }
                return product;
            }),
        }));
    },
}));

export const useProductsStore = createZustandSelectors(productsStore);
