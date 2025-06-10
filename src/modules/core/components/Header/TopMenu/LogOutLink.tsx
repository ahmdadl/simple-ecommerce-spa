import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cartStore } from '@/modules/cart/stores/cart-store';
import { CartItemEntity } from '@/modules/cart/utils/types';
import { userStore } from '@/modules/core/stores/userStore';
import { localizeUrl } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';

export default function LogOutLink({ className }: { className?: string }) {
    const navigate = useNavigate();

    async function logout() {
        userStore.getState().logout();

        cartStore.setState({
            // @ts-ignore
            cart: {
                items: [] as CartItemEntity[],
                totals: {
                    items: 0,
                    subtotal: 0,
                    taxes: 0,
                    discount: 0,
                    shipping: 0,
                    total: 0,
                    original: 0,
                    products: 0,
                    coupon: 0,
                    wallet: 0,
                },
                shipping_address_id: null,
                coupon_id: null,
                wallet_amount: 0,
            },
        });

        navigate({ to: localizeUrl(urls.home) });
    }

    return (
        <Button
            variant={'link'}
            className={cn(className, 'rtl:flex-row-reverse')}
            onClick={logout}
        >
            <LogOut className='h-4 w-4' />
            <Trans>Logout</Trans>
        </Button>
    );
}
