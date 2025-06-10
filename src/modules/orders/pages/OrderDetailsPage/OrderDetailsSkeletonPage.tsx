import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function OrderDetailsSkeletonPage() {
    return (
        <div className='container mx-auto px-4 py-8'>
            {/* Header */}
            <div className='mb-6 flex items-center'>
                <Skeleton className='h-10 w-10 mr-4' /> {/* Back button */}
                <div className='space-y-2'>
                    <Skeleton className='h-8 w-64' /> {/* Order # title */}
                    <Skeleton className='h-4 w-40' /> {/* Placed on date */}
                </div>
            </div>

            {/* Main Grid */}
            <div className='grid gap-6 md:grid-cols-3'>
                {/* Order Summary & Items (2 columns) */}
                <div className='md:col-span-2 space-y-6'>
                    {/* Order Summary */}
                    <div className='rounded-md border'>
                        <div className='p-6 flex flex-row items-center justify-between'>
                            <div className='space-y-2'>
                                <Skeleton className='h-6 w-32' /> {/* Title */}
                                <Skeleton className='h-4 w-48' />{' '}
                                {/* Description */}
                            </div>
                            <Skeleton className='h-6 w-20' />{' '}
                            {/* Status Badge */}
                        </div>
                        <div className='p-6 pt-0'>
                            <div className='grid gap-4 md:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Skeleton className='h-4 w-24' />{' '}
                                    {/* Label */}
                                    <Skeleton className='h-5 w-32' />{' '}
                                    {/* Value */}
                                </div>
                                <div className='space-y-2'>
                                    <Skeleton className='h-4 w-24' />{' '}
                                    {/* Label */}
                                    <Skeleton className='h-5 w-32' />{' '}
                                    {/* Value */}
                                </div>
                                <div className='space-y-2'>
                                    <Skeleton className='h-4 w-24' />{' '}
                                    {/* Label */}
                                    <Skeleton className='h-6 w-20' />{' '}
                                    {/* Badge */}
                                </div>
                                <div className='space-y-2'>
                                    <Skeleton className='h-4 w-24' />{' '}
                                    {/* Label */}
                                    <Skeleton className='h-5 w-32' />{' '}
                                    {/* Value */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className='rounded-md border'>
                        <div className='p-6'>
                            <Skeleton className='h-6 w-32' /> {/* Title */}
                            <Skeleton className='h-4 w-20 mt-2' />{' '}
                            {/* Description */}
                        </div>
                        <div className='px-6 pb-6'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px]'>
                                            <Skeleton className='h-4 w-16' />
                                        </TableHead>
                                        <TableHead>
                                            <Skeleton className='h-4 w-24' />
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            <Skeleton className='h-4 w-16' />
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            <Skeleton className='h-4 w-16' />
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            <Skeleton className='h-4 w-16' />
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array(2)
                                        .fill(0)
                                        .map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton className='h-16 w-16 rounded-md' />{' '}
                                                    {/* Image */}
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className='h-5 w-48' />{' '}
                                                    {/* Product title */}
                                                    <Skeleton className='h-4 w-32 mt-1' />{' '}
                                                    {/* SKU */}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <Skeleton className='h-5 w-20' />
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <Skeleton className='h-5 w-12' />
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <Skeleton className='h-5 w-20' />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Totals, Shipping, Help (1 column) */}
                <div className='space-y-6'>
                    {/* Order Totals */}
                    <div className='rounded-md border'>
                        <div className='p-6'>
                            <Skeleton className='h-6 w-32' /> {/* Title */}
                        </div>
                        <div className='p-6 pt-0 space-y-2'>
                            <div className='flex justify-between'>
                                <Skeleton className='h-5 w-20' />
                                <Skeleton className='h-5 w-16' />
                            </div>
                            <div className='flex justify-between'>
                                <Skeleton className='h-5 w-20' />
                                <Skeleton className='h-5 w-16' />
                            </div>
                            <Separator className='my-2' />
                            <div className='flex justify-between'>
                                <Skeleton className='h-5 w-20' />
                                <Skeleton className='h-5 w-16' />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className='rounded-md border'>
                        <div className='p-6 flex flex-row items-center justify-between'>
                            <div className='space-y-2'>
                                <Skeleton className='h-6 w-32' /> {/* Title */}
                                <Skeleton className='h-4 w-48' />{' '}
                                {/* Description */}
                            </div>
                            <Skeleton className='h-5 w-5' /> {/* MapPin */}
                        </div>
                        <div className='p-6 pt-0 space-y-2'>
                            <Skeleton className='h-5 w-32' /> {/* Name */}
                            <Skeleton className='h-5 w-48' /> {/* Address */}
                            <Skeleton className='h-5 w-24' /> {/* City */}
                            <Skeleton className='h-5 w-36' /> {/* Phone */}
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className='rounded-md border'>
                        <div className='p-6'>
                            <Skeleton className='h-6 w-32' /> {/* Title */}
                        </div>
                        <div className='p-6 pt-0'>
                            <Skeleton className='h-4 w-full' />{' '}
                            {/* Description */}
                            <Skeleton className='h-4 w-3/4 mt-1' />
                        </div>
                        <div className='p-6 pt-0'>
                            <Skeleton className='h-10 w-full' /> {/* Button */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
