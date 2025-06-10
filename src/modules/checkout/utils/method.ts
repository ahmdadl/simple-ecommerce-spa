import { CartResponse } from '@/modules/cart/utils/types';
import { i18n } from '@lingui/core';
import { toast } from 'sonner';

export async function validateCartEntries(state: CartResponse) {
    return new Promise((resolve) => {
        const { selectedAddress, selectedPaymentMethod, paymentMethods } =
            state;

        if (!selectedAddress?.phone) {
            toast.warning(i18n._('Please select shipping address'));
            resolve(false);
        }

        if (!selectedPaymentMethod?.length) {
            toast.warning(i18n._('Please select payment method'));
            resolve(false);
        }

        resolve(true);
    });
}
