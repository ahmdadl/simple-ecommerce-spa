import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { CartEntity, CartResponse } from '../utils/types';

export const cartStore = create<CartResponse>(() => ({
    cart: {} as CartEntity,
    addresses: null,
    paymentMethods: [
        {
            code: 'cod',
            name: 'Cash on Delivery',
            image: '',
            require_receipt: false,
        },
    ],
    wallet: null,

    selectedAddress: null,
    selectedPaymentMethod: null,
    receipt: null,
}));

export const useCartStore = createZustandSelectors(cartStore);
