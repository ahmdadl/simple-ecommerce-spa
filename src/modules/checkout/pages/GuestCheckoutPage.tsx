import { addressesStore } from '@/modules/addresses/stores/addresses-store';
import { cartStore } from '@/modules/cart/stores/cart-store';
import { checkoutRoute } from '@/routes/$locale/_cart/checkout';
import { useEffect } from 'react';
import CheckoutHero from '../components/CheckoutHero';
import CheckoutOrderSummary from '../components/CheckoutOrderSummary';
import GuestCheckoutProgress from '../components/GuestCheckout/CheckoutProgress';
import { paymentStatusModalStore } from '../stores/payment-status-modal-store';

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export default function GuestCheckoutPage() {
    const search = checkoutRoute.useSearch() as any;

    useEffect(() => {
        if (search.payment_failed) {
            paymentStatusModalStore.setState({
                isOpened: true,
                type: 'error',
                description: search.payment_failed,
            });

            const newUrl = window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        }

        return () => {
            addressesStore.setState({ currentAddress: undefined });
            cartStore.setState({ selectedAddress: null });
        };
    }, []);

    return (
        <>
            <CheckoutHero />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 px-5'>
                <div className='lg:col-span-2 space-y-6'>
                    <GuestCheckoutProgress />
                </div>

                <CheckoutOrderSummary />
            </div>
        </>
    );
}
