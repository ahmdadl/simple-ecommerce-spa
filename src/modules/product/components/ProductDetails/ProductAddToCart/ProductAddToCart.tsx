import { Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cartApi } from '@/modules/cart/utils/cart-api';
import loadingToast from '@/modules/core/utils/methods';
import { ProductEntity } from '@/modules/shop/utils/types';
import { Trans } from '@lingui/react/macro';

export default function ProductAddToCart({
    product,
}: {
    product: ProductEntity;
}) {
    const [quantity, setQuantity] = useState(product.carted_quantity || 1);
    const [isLoading, setIsLoading] = useState(false);

    function addToCart() {
        if (isLoading) return;

        setIsLoading(true);

        loadingToast(cartApi.add(product.id, quantity), {
            onFinally: () => {
                setIsLoading(false);
            },
        });
    }

    function incrementQuantity() {
        if (isLoading) return;

        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (isLoading) return;

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <div>
                <h3 className='mb-3 text-sm font-medium'>
                    <Trans>Quantity</Trans>
                </h3>
                <div className='flex items-center'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={decrementQuantity}
                        disabled={quantity <= 1 || isLoading}
                    >
                        <Minus className='h-4 w-4' />
                    </Button>
                    <span className='mx-4 w-8 text-center'>{quantity}</span>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={incrementQuantity}
                        disabled={isLoading || product.stock < quantity}
                    >
                        <Plus className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            <div className='flex flex-wrap gap-3'>
                <Button
                    className='w-full flex-1'
                    size='lg'
                    disabled={
                        isLoading ||
                        product.stock < quantity ||
                        !product.has_stock
                    }
                    onClick={addToCart}
                >
                    {isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                        <ShoppingCart className='mr-2 h-5 w-5' />
                    )}

                    {product.has_stock ? (
                        <Trans>Add to Cart</Trans>
                    ) : (
                        <Trans>Out of Stock</Trans>
                    )}
                </Button>
            </div>
        </>
    );
}
