import { checkoutRoute } from '@/routes/$locale/_cart/checkout';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CheckoutAddresses from '../components/CheckoutAddresses';
import CheckoutHero from '../components/CheckoutHero';
import CheckoutOrderSummary from '../components/CheckoutOrderSummary';
import CheckoutPaymentMethods from '../components/CheckoutPaymentMethods';

export default function CheckoutPage() {
    const search = checkoutRoute.useSearch() as any;

    useEffect(() => {
        if (search.payment_failed) {
            toast.error(search.payment_failed);

            const newUrl = window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        }
    }, []);

    return (
        <>
            <CheckoutHero />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 px-5'>
                <div className='lg:col-span-2 space-y-6'>
                    <CheckoutAddresses />

                    <CheckoutPaymentMethods />
                </div>

                <CheckoutOrderSummary />
            </div>
        </>
    );
}
