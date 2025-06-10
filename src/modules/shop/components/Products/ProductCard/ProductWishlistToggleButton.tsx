import { Button } from '@/components/ui/button';
import { ProductEntity } from '@/modules/shop/utils/types';
import { Trans } from '@lingui/react/macro';
import { Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ProductWishlistToggleButton({
    product,
}: {
    product: ProductEntity;
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function toggle() {
        if (isLoading) return;
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        product.is_wished = !product.is_wished;

        setIsLoading(false);
    }

    return (
        <Button
            variant='outline'
            size='icon'
            className={`absolute top-2 right-2 rounded-full border-none bg-background/80 backdrop-blur-sm ${
                product.is_wished
                    ? 'bg-destructive text-white hover:bg-destructive'
                    : ''
            }`}
            onClick={toggle}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className='h-4 w-4 animate-spin text-white' />
            ) : (
                <Heart
                    className={`h-4 w-4 ${product.is_wished && 'fill-white'}`}
                />
            )}
            <span className='sr-only'>
                <Trans>Add to wishlist</Trans>
            </span>
        </Button>
    );
}
