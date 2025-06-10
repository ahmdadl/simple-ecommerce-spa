import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { parsePrice } from '@/modules/orders/utils/methods';
import { Trans } from '@lingui/react/macro';

interface CartTotalsProps {
    totals: {
        original: number;
        discount: number;
        taxes: number;
        products: number;
        items: number;
        subtotal: number;
        coupon: number;
        shipping: number;
        total: number;
    };
}

export default function CartTotals({ totals }: CartTotalsProps) {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>
                    <Trans>Order Summary</Trans>
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-muted-foreground'>
                            <Trans>
                                Subtotal ({totals.items}{' '}
                                {totals.items === 1 ? 'item' : 'items'})
                            </Trans>
                        </span>
                        <span>{parsePrice(totals.subtotal)}</span>
                    </div>

                    {totals.discount > 0 && (
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-muted-foreground'>
                                <Trans>Discount</Trans>
                            </span>
                            <span className='text-green-600'>
                                -{parsePrice(totals.discount)}
                            </span>
                        </div>
                    )}

                    {totals.coupon > 0 && (
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-muted-foreground'>
                                <Trans>Coupon</Trans>
                            </span>
                            <span className='text-green-600'>
                                -{parsePrice(totals.coupon)}
                            </span>
                        </div>
                    )}

                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-muted-foreground'>
                            <Trans>Shipping</Trans>
                        </span>
                        {totals.shipping > 0 ? (
                            <span>{parsePrice(totals.shipping)}</span>
                        ) : (
                            <span className='text-green-600'>
                                <Trans>Free</Trans>
                            </span>
                        )}
                    </div>

                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-muted-foreground'>
                            <Trans>Taxes</Trans>
                        </span>
                        <span>{parsePrice(totals.taxes)}</span>
                    </div>
                </div>

                <Separator />

                <div className='flex items-center justify-between font-medium'>
                    <span>
                        <Trans>Total</Trans>
                    </span>
                    <span className='text-lg'>{parsePrice(totals.total)}</span>
                </div>

                <div className='pt-4'></div>
            </CardContent>
            <CardFooter>
                <Button className='w-full' asChild>
                    <Link to={urls.checkout}>
                        <Trans>Proceed to Checkout</Trans>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
