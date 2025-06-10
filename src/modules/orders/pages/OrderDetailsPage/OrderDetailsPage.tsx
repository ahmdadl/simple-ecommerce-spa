import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import OrderItemsTable from '../../components/OrderItemsTable';
import { useOrdersStore } from '../../stores/orders-store';
import { parsePrice } from '../../utils/methods';

export default function OrderDetailsPage() {
    const order = useOrdersStore.use.currentOrder();

    if (!order) return null;

    // Format the date
    const orderDate = new Date(order.created_at);
    const formattedDate = format(orderDate, 'dd MMMM yyyy');

    return (
        <div className='mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 2xl:max-w-7xl'>
            <div className='mb-6 flex flex-col items-start sm:flex-row sm:items-center gap-4'>
                <Link to={urls.profile.index}>
                    <Button variant='outline' size='icon'>
                        <ArrowLeft className='h-4 w-4 rtl:rotate-180' />
                        <span className='sr-only'>
                            <Trans>Back to orders</Trans>
                        </span>
                    </Button>
                </Link>
                <div>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold max-w-full break-words'>
                        <Trans>Order #{order.id}</Trans>
                    </h1>
                    <p className='text-sm sm:text-base text-muted-foreground'>
                        <Trans>
                            Placed on <span dir='ltr'>{formattedDate}</span>
                        </Trans>
                    </p>
                </div>
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
                {/* Order Summary */}
                <div className='md:col-span-2 space-y-6'>
                    {/* Order Items */}
                    <OrderItemsTable order={order} />
                </div>

                {/* Order Totals and Shipping */}
                <div className='space-y-6'>
                    {/* Order Totals */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg sm:text-xl'>
                                <Trans>Order Total</Trans>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-2 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>
                                        <Trans>Subtotal</Trans>
                                    </span>
                                    <span>
                                        {parsePrice(order.totals.subtotal)}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>
                                        <Trans>Taxes</Trans>
                                    </span>
                                    <span>
                                        {parsePrice(order.totals.taxes)}
                                    </span>
                                </div>
                                {order.totals.discount > 0 && (
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>
                                            <Trans>Discount</Trans>
                                        </span>
                                        <span className='text-green-600'>
                                            -{parsePrice(order.totals.discount)}
                                        </span>
                                    </div>
                                )}
                                {order.totals.shipping > 0 && (
                                    <div className='flex justify-between'>
                                        <span className='text-muted-foreground'>
                                            <Trans>Shipping</Trans>
                                        </span>
                                        <span>
                                            {parsePrice(order.totals.shipping)}
                                        </span>
                                    </div>
                                )}
                                <Separator className='my-2' />
                                <div className='flex justify-between font-medium'>
                                    <span>
                                        <Trans>Total</Trans>
                                    </span>
                                    <span>
                                        {parsePrice(order.totals.total)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
