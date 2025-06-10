import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { useCartStore } from '@/modules/cart/stores/cart-store';
import { Trans } from '@lingui/react/macro';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import CheckoutPaymentMethodRecord from './CheckoutPaymentMethodRecord';

export default function CheckoutPaymentMethods() {
    const paymentMethods = [
        {
            code: 'cod',
            name: 'Cash on Delivery',
            image: '',
            require_receipt: false,
        },
    ];

    const [selectedPayment, setSelectedPayment] = useState('');

    useEffect(() => {
        setSelectedPayment(useCartStore.getState().selectedPaymentMethod || '');
    }, []);

    if (!paymentMethods) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    <Trans>Payment Method</Trans>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={selectedPayment} className='space-y-4'>
                    {paymentMethods.map((method) => (
                        <CheckoutPaymentMethodRecord
                            method={method}
                            key={method.code}
                        />
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
}
