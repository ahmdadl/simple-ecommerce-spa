import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';

type PaymentStatusModalStoreState = {
    isOpened: boolean;
    type: 'success' | 'error' | 'warning';
    description: string;
};

export const paymentStatusModalStore = create<PaymentStatusModalStoreState>(
    () => ({
        isOpened: false,
        type: 'success',
        description: '',
    })
);

export const usePaymentStatusModalStore = createZustandSelectors(
    paymentStatusModalStore
);
