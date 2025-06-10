import { Check } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { AddressEntity } from '@/modules/addresses/utils/types';
import { useCartStore } from '@/modules/cart/stores/cart-store';
import { cartApi } from '@/modules/cart/utils/cart-api';
import loadingToast from '@/modules/core/utils/methods';
import { Trans } from '@lingui/react/macro';

export default function CheckoutAddressRadio({
    address,
}: {
    address: AddressEntity;
}) {
    const selectedAddress = useCartStore.use.selectedAddress();

    async function selectAddress(addressId: string) {
        if (selectedAddress?.id === addressId) return;

        loadingToast(cartApi.setAddress(addressId), {
            onFinally: () => {
                useCartStore.setState({
                    selectedAddress: address,
                });
            },
        });
    }

    return (
        <div
            className={`flex items-start space-x-3 border cursor-pointer rounded-lg p-4 ${
                selectedAddress?.id === address.id
                    ? 'border-primary'
                    : 'border-border'
            }`}
            onClick={() => selectAddress(address.id)}
        >
            <div className='flex'>
                {selectedAddress?.id === address.id ? (
                    <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                        <Check className='h-3 w-3' />
                    </div>
                ) : (
                    <div className='border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50' />
                )}
            </div>
            <div className='flex-1'>
                <Label
                    // htmlFor={`address-${address.id}`}
                    className='font-medium cursor-pointer'
                >
                    {address.title}
                    {address.is_default && (
                        <span className='ml-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded'>
                            <Trans>Default</Trans>
                        </span>
                    )}
                </Label>
                <p className='text-sm text-muted-foreground mt-1'>
                    {address.address}
                </p>
                <p className='text-sm text-muted-foreground'>
                    {address.city.title}
                </p>
            </div>
        </div>
    );
}
