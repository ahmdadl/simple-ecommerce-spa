import { Button } from '@/components/ui/button';
import loadingToast from '@/modules/core/utils/methods';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cartApi } from '../utils/cart-api';

export default function RemoveFromCartButton({
    itemId,
    children,
}: {
    itemId: string;
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function removeItem() {
        if (isLoading) return;
        setIsLoading(true);

        loadingToast(cartApi.remove(itemId), {
            onFinally: () => {
                setIsLoading(false);
            },
        });
    }

    return (
        <Button variant={'destructive'} onClick={removeItem}>
            {isLoading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
                <>{children}</>
            )}
        </Button>
    );
}
