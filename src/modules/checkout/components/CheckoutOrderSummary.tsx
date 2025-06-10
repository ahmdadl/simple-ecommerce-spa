import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/modules/cart/stores/cart-store';
import Image from '@/modules/core/components/Image';
import { userStore } from '@/modules/core/stores/userStore';
import { parsePrice } from '@/modules/orders/utils/methods';
import { Trans } from '@lingui/react/macro';
import CheckoutPlaceOrderButton from './CheckoutPlaceOrderButton';

export default function CheckoutOrderSummary() {
    const { isCustomer } = userStore.getState();
    const { items, totals } = useCartStore.use.cart();

    return (
        <div className='lg:col-span-1'>
            <Card className='sticky top-5'>
                <CardHeader>
                    <CardTitle>
                        <Trans>Order Summary</Trans>
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    {/* Cart Items */}
                    <div className='space-y-4'>
                        {Boolean(items?.length) &&
                            items.map((item) => (
                                <div key={item.id} className='flex gap-4'>
                                    <Image
                                        src={item.product.images[0] || ''}
                                        alt={item.product.title}
                                        width={64}
                                        height={64}
                                        className='rounded-md object-cover'
                                    />
                                    <div className='flex-1'>
                                        <h4 className='font-medium'>
                                            <Trans>{item.product.title}</Trans>
                                        </h4>
                                        <p className='text-sm text-muted-foreground'>
                                            <Trans>
                                                Quantity: {item.quantity}
                                            </Trans>
                                        </p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-medium'>
                                            {parsePrice(item.totals.total)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                            <p className='text-muted-foreground'>
                                <Trans>Subtotal</Trans>
                            </p>
                            <p>{parsePrice(totals?.subtotal)}</p>
                        </div>
                        {totals?.discount > 0 && (
                            <div className='flex items-center justify-between text-sm'>
                                <span className='text-muted-foreground'>
                                    <Trans>Discount</Trans>
                                </span>
                                <span className='text-green-600'>
                                    -{parsePrice(totals?.discount)}
                                </span>
                            </div>
                        )}

                        {totals?.coupon > 0 && (
                            <div className='flex items-center justify-between text-sm'>
                                <span className='text-muted-foreground'>
                                    <Trans>Coupon</Trans>
                                </span>
                                <span className='text-green-600'>
                                    -{parsePrice(totals?.coupon)}
                                </span>
                            </div>
                        )}
                        {totals?.wallet > 0 && (
                            <div className='flex items-center justify-between text-sm'>
                                <span className='text-muted-foreground'>
                                    <Trans>Wallet</Trans>
                                </span>
                                <span className='text-green-600'>
                                    -{parsePrice(totals?.wallet)}
                                </span>
                            </div>
                        )}
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-muted-foreground'>
                                <Trans>Shipping</Trans>
                            </span>
                            {totals?.shipping > 0 ? (
                                <span>{parsePrice(totals?.shipping)}</span>
                            ) : (
                                <span className='text-green-600'>
                                    <Trans>Free</Trans>
                                </span>
                            )}
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-muted-foreground'>
                                <Trans>Tax</Trans>
                            </p>
                            <p>{parsePrice(totals?.taxes)}</p>
                        </div>
                        <Separator />
                        <div className='flex justify-between font-medium text-lg'>
                            <p>
                                <Trans>Total</Trans>
                            </p>
                            <p>{parsePrice(totals?.total)}</p>
                        </div>
                    </div>

                    <div className='py-4'></div>
                </CardContent>
                <CardFooter>
                    {isCustomer() && <CheckoutPlaceOrderButton />}
                </CardFooter>
            </Card>
        </div>
    );
}
