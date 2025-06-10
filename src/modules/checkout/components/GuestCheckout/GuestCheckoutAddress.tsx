import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import AddressForm, {
    AddressFormData,
} from '@/modules/addresses/components/AddressForm/AddressForm';
import { addressesStore } from '@/modules/addresses/stores/addresses-store';
import { addressApi } from '@/modules/addresses/utils/addresses-api';
import { cartStore } from '@/modules/cart/stores/cart-store';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function GuestCheckoutAddress({
    goToNextStep,
}: {
    goToNextStep: () => void;
}) {
    const [formInstance, setFormInstance] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function validateAddress(values: AddressFormData) {
        if (isLoading) return;

        setIsLoading(true);

        const response = await addressApi
            .validate(values)
            .catch((err) => parseError(err, formInstance));

        setIsLoading(false);

        if (typeof response !== 'object' || !response?.data) return;

        const address = response.data.record;
        delete address.name;

        cartStore.setState({
            selectedAddress: address,
        });

        addressesStore.setState({
            currentAddress: address,
        });

        goToNextStep();
    }

    return (
        <Card className='my-3'>
            <CardHeader>
                <h3 className='text-xl  font-semibold'>
                    <Trans>Shipping Address</Trans>
                </h3>
                <p>
                    <Trans>
                        Please enter your shipping address to continue.
                    </Trans>
                </p>
            </CardHeader>

            <CardContent>
                <AddressForm
                    onSave={validateAddress}
                    setFormInstance={setFormInstance}
                    isLoading={isLoading}
                />
            </CardContent>

            <CardFooter>
                <Button
                    type='submit'
                    form='address-form'
                    disabled={isLoading}
                    className='w-full'
                >
                    {isLoading && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    <Trans>Continue to Payment</Trans>
                </Button>
            </CardFooter>
        </Card>
    );
}
