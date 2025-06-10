import { Button } from '@/components/ui/button';
import { cartStore } from '@/modules/cart/stores/cart-store';
import { cartApi } from '@/modules/cart/utils/cart-api';
import { CartResponse } from '@/modules/cart/utils/types';
import loadingToast, { localizeUrl } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { Trans, useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { validateCartEntries } from '../utils/method';

export default function CheckoutPlaceOrderButton() {
    const { t } = useLingui();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function createOrder() {
        if (loading) return;

        const cartState = cartStore.getState();
        const { selectedAddress, selectedPaymentMethod, receipt } = cartState;

        // validate cart entries
        const isValid = await validateCartEntries(cartState);

        if (!isValid) return;

        setLoading(true);

        loadingToast(
            async () => {
                const response = await cartApi.placeOrder({
                    address: selectedAddress?.id,
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

                    navigate({
                        to: localizeUrl(
                            urls.profile.orders.view(response.record)
                        ),
                    });

                    setTimeout(
                        () =>
                            cartStore.setState({
                                cart: {} as CartResponse['cart'],
                                selectedAddress: null,
                                selectedPaymentMethod: null,
                                receipt: null,
                            }),
                        700
                    );
                }

                return response;
            },
            {
                onFinally: () => {
                    setLoading(false);
                },
            }
        );
    }

    return (
        <Button
            className='w-full'
            size='lg'
            onClick={createOrder}
            disabled={loading}
        >
            {loading && <Loader2 className='h-4 w-4 animate-spin' />}
            <Trans>Place Order</Trans>
        </Button>
    );
}
