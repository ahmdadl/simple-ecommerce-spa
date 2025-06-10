import { Home } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/modules/cart/stores/cart-store';
import { Trans } from '@lingui/react/macro';
import CheckoutAddAddress from './CheckoutAddAddress';
import CheckoutAddressRadio from './CheckoutAddressRadio';

export default function CheckoutAddresses() {
    const addresses = useCartStore.use.addresses();

    return (
        <Card>
            <CardHeader className='flex flex-row items-center'>
                <CardTitle className='flex items-center gap-2'>
                    <Home className='h-5 w-5' />
                    <Trans>Shipping Address</Trans>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 max-h-[25rem] py-3 overflow-y-auto'>
                    {Boolean(addresses?.length) &&
                        addresses?.map((address) => (
                            <CheckoutAddressRadio
                                key={address.id}
                                address={address}
                            />
                        ))}
                </div>

                <CheckoutAddAddress />
            </CardContent>
        </Card>
    );
}
