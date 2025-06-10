import { Button } from '@/components/ui/button';
import { cartStore } from '@/modules/cart/stores/cart-store';
import { cartApi } from '@/modules/cart/utils/cart-api';
import { CartResponse } from '@/modules/cart/utils/types';
import loadingToast from '@/modules/core/utils/methods';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { paymentStatusModalStore } from '../../stores/payment-status-modal-store';
import { validateCartEntries } from '../../utils/method';

export default function GuestCheckoutPlaceOrderButton() {
    const { t } = useLingui();
    const [isLoading, setIsLoading] = useState(false);

    async function placeOrder() {
        if (isLoading) return;

        const cartState = cartStore.getState();
        const { selectedAddress, selectedPaymentMethod, receipt } = cartState;

        console.log(cartState);

        // validate cart entries
        const isValid = await validateCartEntries(cartState);

        if (!isValid) return;

        setIsLoading(true);

        loadingToast(
            async () => {
                const response = await cartApi.placeGuestOrder({
                    address: selectedAddress,
                    payment_method: selectedPaymentMethod,
                    receipt,
                });

                if (!response) return;

                if (response.payment_url) {
                    window.location.href = response.payment_url;

                    return response;
                }

                if (response.record) {
                    toast.success(t`Order placed successfully`);

                    cartStore.setState({
                        cart: {} as CartResponse['cart'],
                        selectedAddress: null,
                        selectedPaymentMethod: null,
                        receipt: null,
                    });

                    paymentStatusModalStore.setState({
                        isOpened: true,
                        type: 'success',
                        description: '',
                    });
                }

                return response;
            },
            {
                onFinally: () => {
                    setIsLoading(false);
                },
            }
        );
    }

    return (
        <>
            <Button
                type='button'
                disabled={isLoading}
                className='w-full'
                onClick={placeOrder}
            >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                <Trans>Place Order</Trans>
            </Button>
        </>
    );
}
