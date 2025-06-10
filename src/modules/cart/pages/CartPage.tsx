import { ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import CartHero from '../components/CartHero';
import { CartItemCard } from '../components/CartItemCard';
import CartTotals from '../components/CartTotals';
import ClearCartButton from '../components/ClearCartButton';
import { useCartStore } from '../stores/cart-store';

export default function CartPage() {
    const cart = useCartStore.use.cart();

    return (
        <div className='flex flex-col gap-4'>
            <CartHero />

            {cart.items.length === 0 ? (
                <div className='text-center py-16'>
                    <div className='flex justify-center mb-4'>
                        <ShoppingBag className='h-16 w-16 text-muted-foreground' />
                    </div>
                    <h2 className='text-xl font-semibold mb-2'>
                        <Trans>Your cart is empty</Trans>
                    </h2>
                    <p className='text-muted-foreground mb-6'>
                        <Trans>
                            Looks like you haven't added anything to your cart
                            yet.
                        </Trans>
                    </p>
                    <Button asChild>
                        <Link to={urls.shop}>
                            <Trans>Continue Shopping</Trans>
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2'>
                        <div className='flex items-center justify-end'>
                            <div className='mb-4 mt-1 me-2'>
                                <ClearCartButton />
                            </div>
                        </div>

                        <div className='space-y-4 py-4 px-6 lg:px-0'>
                            {cart.items.map((item) => (
                                <CartItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-1 relative pe-3'>
                        <div className='sticky top-4'>
                            <CartTotals totals={cart.totals} />
                        </div>

                        <div className='mt-4'>
                            <Card>
                                <CardContent className='p-4'>
                                    <div className='flex items-center gap-2'>
                                        <ShoppingBag className='h-5 w-5 text-muted-foreground' />
                                        <span className='text-sm'>
                                            <Trans>
                                                Need help? Contact our support
                                                team
                                            </Trans>
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
