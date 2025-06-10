import { Button } from '@/components/ui/button';
import { cartApi } from '@/modules/cart/utils/cart-api';
import loadingToast from '@/modules/core/utils/methods';
import { productsStore } from '@/modules/shop/stores/products-store';
import { ProductEntity } from '@/modules/shop/utils/types';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import ProductCartUpdateButton from './ProductCartUpdateButton';

export default function ProductAddToCartButton({
    product,
}: {
    product: ProductEntity;
}) {
    const { t } = useLingui();
    const [isLoading, setIsLoading] = useState(false);

    async function addToCart() {
        if (isLoading) return;
        setIsLoading(true);

        loadingToast(cartApi.add(product.id), {
            successMessage: t`Added to Cart`,
            onFinally: () => {
                // update product is carted
                productsStore.getState().cartIncrement(product.id);
                setIsLoading(false);
            },
        });
    }

    if (product.is_carted && product.has_stock) {
        return <ProductCartUpdateButton product={product} />;
    }

    return (
        <Button
            className='w-full'
            disabled={!product.has_stock || isLoading}
            onClick={addToCart}
        >
            {product.has_stock && (
                <>
                    {isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin me-2' />
                    ) : (
                        <>
                            <ShoppingCart className='h-4 w-4 me-2' />
                            <Trans>Add to Cart</Trans>
                        </>
                    )}
                </>
            )}

            {!product.has_stock && <Trans>Out of Stock</Trans>}
        </Button>
    );
}
