import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust import
import { CreditCard, Home } from 'lucide-react';
import CheckoutHero from '../components/CheckoutHero';

export default function CheckoutSkeletonPage() {
    return (
        <>
            <CheckoutHero />

            <div className='py-7 px-5'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Section: Shipping Addresses and Payment Methods */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Shipping Addresses Card */}
                        <Card>
                            <CardHeader className='flex flex-row items-center'>
                                <CardTitle className='flex items-center gap-2'>
                                    <Home className='h-5 w-5' />
                                    <Skeleton className='h-6 w-32' />{' '}
                                    {/* Placeholder for "Shipping Address" */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-4'>
                                    {/* Placeholder for address options */}
                                    {Array(2)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className='flex items-start space-x-3 border rounded-lg p-4 border-border'
                                            >
                                                <Skeleton className='h-4 w-4 mt-1 rounded-full' />{' '}
                                                {/* Radio button */}
                                                <div className='flex-1 space-y-2'>
                                                    <Skeleton className='h-5 w-24' />{' '}
                                                    {/* Name */}
                                                    <Skeleton className='h-4 w-40' />{' '}
                                                    {/* Address */}
                                                    <Skeleton className='h-4 w-32' />{' '}
                                                    {/* City, State, Zip */}
                                                    <Skeleton className='h-4 w-28' />{' '}
                                                    {/* Country */}
                                                </div>
                                                <Skeleton className='h-5 w-5 rounded-full' />{' '}
                                                {/* Check icon */}
                                            </div>
                                        ))}
                                </div>
                                <Skeleton className='h-9 w-40 mt-4' />{' '}
                                {/* Add New Address button */}
                            </CardContent>
                        </Card>

                        {/* Payment Methods Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <CreditCard className='h-5 w-5' />
                                    <Skeleton className='h-6 w-32' />{' '}
                                    {/* Placeholder for "Payment Method" */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-4'>
                                    {/* Placeholder for payment options */}
                                    {Array(3)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className='flex items-center space-x-3 border rounded-lg p-4 border-border'
                                            >
                                                <Skeleton className='h-4 w-4 rounded-full' />{' '}
                                                {/* Radio button */}
                                                <div className='flex items-center gap-2'>
                                                    <Skeleton className='h-5 w-5' />{' '}
                                                    {/* Icon */}
                                                    <Skeleton className='h-4 w-20' />{' '}
                                                    {/* Title */}
                                                </div>
                                                <Skeleton className='ml-auto h-5 w-5 rounded-full' />{' '}
                                                {/* Check icon */}
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Section: Order Summary */}
                    <div className='lg:col-span-1'>
                        <Card className='sticky top-5'>
                            <CardHeader>
                                <CardTitle>
                                    <Skeleton className='h-6 w-28' />{' '}
                                    {/* Placeholder for "Order Summary" */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {/* Cart Items */}
                                <div className='space-y-4'>
                                    {Array(3)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div key={i} className='flex gap-4'>
                                                <Skeleton className='h-16 w-16 rounded-md' />{' '}
                                                {/* Image */}
                                                <div className='flex-1 space-y-2'>
                                                    <Skeleton className='h-5 w-32' />{' '}
                                                    {/* Name */}
                                                    <Skeleton className='h-4 w-20' />{' '}
                                                    {/* Quantity */}
                                                </div>
                                                <Skeleton className='h-5 w-16' />{' '}
                                                {/* Price */}
                                            </div>
                                        ))}
                                </div>

                                <Separator />

                                {/* Order Totals */}
                                <div className='space-y-2'>
                                    <div className='flex justify-between'>
                                        <Skeleton className='h-4 w-16' />{' '}
                                        {/* Subtotal label */}
                                        <Skeleton className='h-4 w-12' />{' '}
                                        {/* Subtotal value */}
                                    </div>
                                    <div className='flex justify-between'>
                                        <Skeleton className='h-4 w-16' />{' '}
                                        {/* Shipping label */}
                                        <Skeleton className='h-4 w-12' />{' '}
                                        {/* Shipping value */}
                                    </div>
                                    <div className='flex justify-between'>
                                        <Skeleton className='h-4 w-16' />{' '}
                                        {/* Tax label */}
                                        <Skeleton className='h-4 w-12' />{' '}
                                        {/* Tax value */}
                                    </div>
                                    <Separator />
                                    <div className='flex justify-between'>
                                        <Skeleton className='h-6 w-16' />{' '}
                                        {/* Total label */}
                                        <Skeleton className='h-6 w-16' />{' '}
                                        {/* Total value */}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Skeleton className='h-10 w-full rounded-md' />{' '}
                                {/* Place Order button */}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
