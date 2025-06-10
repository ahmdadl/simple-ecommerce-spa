import { Button } from '@/components/ui/button';
import { cartApi } from '@/modules/cart/utils/cart-api';
import loadingToast from '@/modules/core/utils/methods';
import { productsStore } from '@/modules/shop/stores/products-store';
import { ProductEntity } from '@/modules/shop/utils/types';
import { Trans } from '@lingui/react/macro';
import { Loader2, Minus, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

export default function ProductCartUpdateButton({
    product,
}: {
    product: ProductEntity;
}) {
    const quantity = product.carted_quantity || 1;
    const [isLoading, setIsLoading] = useState(false);

    function handleIncrement() {
        if (isLoading) return;
        const newQuantity = quantity + 1;

        setIsLoading(true);

        loadingToast(cartApi.updateByProduct(product.id, newQuantity), {
            onFinally: async () => {
                productsStore.getState().cartIncrement(product.id);
                setIsLoading(false);
            },
        });
    }

    function handleDecrement() {
        if (isLoading) return;
        const newQuantity = quantity - 1;

        if (newQuantity === 0) return handleRemove();

        setIsLoading(true);

        loadingToast(cartApi.updateByProduct(product.id, newQuantity), {
            onFinally: async () => {
                productsStore.getState().cartDecrement(product.id);
                setIsLoading(false);
            },
        });
    }

    async function handleRemove() {
        setIsLoading(true);

        loadingToast(cartApi.removeByProduct(product.id), {
            onFinally: async () => {
                productsStore.getState().cartDecrement(product.id);
                setIsLoading(false);
            },
        });
    }

    if (!product.is_carted) return null;

    return (
        <div
            className='flex items-center justify-between w-full h-10 bg-primary/40 p-1 rounded-2xl lg:w-2/3 mx-auto'
            dir='ltr'
        >
            <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 rounded-full'
                onClick={handleDecrement}
                disabled={isLoading}
            >
                {quantity > 1 ? (
                    <Minus className='h-3 w-3' />
                ) : (
                    <Trash className='h-3 w-3 text-destructive' />
                )}
                <span className='sr-only'>
                    <Trans>Decrease quantity</Trans>
                </span>
            </Button>

            <span className='font-medium mx-2'>
                {isLoading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                    quantity
                )}
            </span>

            <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 rounded-full'
                onClick={handleIncrement}
                disabled={isLoading}
            >
                <Plus className='h-3 w-3' />
                <span className='sr-only'>
                    <Trans>Increase quantity</Trans>
                </span>
            </Button>
        </div>
    );
}
