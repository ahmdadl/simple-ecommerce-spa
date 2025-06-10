import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trans } from '@lingui/react/macro';
import { PlusCircle } from 'lucide-react';

export default function AddressesSkeletonPage() {
    return (
        <>
            <div className='container mx-auto py-6 px-4 md:px-6'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>
                        <Trans>My Addresses</Trans>
                    </h1>
                    <Button>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        <Skeleton className='h-4 w-20' />
                    </Button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className='h-full flex flex-col'>
                            <CardHeader>
                                <Skeleton className='h-6 w-1/3' />{' '}
                                {/* CardTitle placeholder */}
                            </CardHeader>
                            <CardContent className='flex-grow'>
                                <div className='space-y-2'>
                                    <Skeleton className='h-5 w-1/2' />{' '}
                                    {/* Name */}
                                    <Skeleton className='h-4 w-3/4' />{' '}
                                    {/* Address */}
                                    <Skeleton className='h-4 w-2/3' />{' '}
                                    {/* City, Government */}
                                    <Skeleton className='h-4 w-1/4' />{' '}
                                    {/* Phone */}
                                </div>
                            </CardContent>
                            <CardFooter className='flex justify-end gap-2 border-t pt-4'>
                                <Skeleton className='h-8 w-20' />{' '}
                                {/* Edit button */}
                                <Skeleton className='h-8 w-20' />{' '}
                                {/* Delete button */}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
