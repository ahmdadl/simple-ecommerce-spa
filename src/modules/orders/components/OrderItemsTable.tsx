import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trans } from '@lingui/react/macro';
import { parsePrice } from '../utils/methods';
import { OrderEntity } from '../utils/types';

export default function OrderItemsTable({ order }: { order: OrderEntity }) {
    const isMobile = useIsMobile();

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg sm:text-xl'>
                    <Trans>Order Items</Trans>
                </CardTitle>
                <CardDescription className='text-sm'>
                    <Trans>Order Items</Trans> ({order.items?.length ?? 0})
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isMobile && (
                    <div className='block sm:hidden space-y-4'>
                        {Boolean(order.items?.length) &&
                            order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className='border rounded-lg p-4 flex flex-col gap-3'
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0'>
                                            <img
                                                src={
                                                    item.product.images[0] ||
                                                    '/placeholder.svg?height=64&width=64'
                                                }
                                                alt={item.product.title}
                                                className='object-cover w-full h-full'
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <div className='font-medium text-sm'>
                                                {item.product.title}
                                            </div>
                                            <div className='text-xs text-muted-foreground'>
                                                <Trans>
                                                    SKU: {item.product.sku}
                                                </Trans>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 text-sm'>
                                        <div>
                                            <span className='text-muted-foreground'>
                                                <Trans>Price</Trans>:
                                            </span>{' '}
                                            {parsePrice(item.product.price)}
                                        </div>
                                        <div className='text-right'>
                                            <span className='text-muted-foreground'>
                                                <Trans>Qty</Trans>:
                                            </span>{' '}
                                            {item.quantity}
                                        </div>
                                        <div className='font-medium'>
                                            <span className='text-muted-foreground'>
                                                <Trans>Total</Trans>:
                                            </span>{' '}
                                            {parsePrice(item.totals.total)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {!isMobile && (
                    <div className='hidden sm:block overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[100px]'>
                                        <Trans>Image</Trans>
                                    </TableHead>
                                    <TableHead>
                                        <Trans>Product</Trans>
                                    </TableHead>
                                    <TableHead className='text-right'>
                                        <Trans>Price</Trans>
                                    </TableHead>
                                    <TableHead className='text-right'>
                                        <Trans>Qty</Trans>
                                    </TableHead>
                                    <TableHead className='text-right'>
                                        <Trans>Total</Trans>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Boolean(order.items?.length) &&
                                    order.items?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className='relative h-16 w-16 overflow-hidden rounded-md'>
                                                    <img
                                                        src={
                                                            item.product
                                                                .images[0] ||
                                                            '/placeholder.svg?height=64&width=64'
                                                        }
                                                        alt={item.product.title}
                                                        className='object-cover w-full h-full'
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='font-medium text-sm'>
                                                    {item.product.title}
                                                </div>
                                                <div className='text-xs text-muted-foreground'>
                                                    <Trans>
                                                        SKU: {item.product.sku}
                                                    </Trans>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right text-sm'>
                                                {parsePrice(item.product.price)}
                                            </TableCell>
                                            <TableCell className='text-right text-sm'>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell className='text-right font-medium text-sm'>
                                                {parsePrice(item.totals.total)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
