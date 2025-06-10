import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartSkeletonPage() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
                <div className='flex items-center justify-end'>
                    <div className='mb-4'>
                        <Skeleton className='h-10 w-32' />
                    </div>
                </div>
                <div className='space-y-4 py-4 px-6 lg:px-0'>
                    {[...Array(3)].map((_, index) => (
                        <div
                            className='flex flex-col gap-3 lg:flex-row justify-between shadow border border-gray-300 rounded-lg lg:items-center p-3 xl:p-5'
                            key={index}
                        >
                            <div className='w-[60%] xl:w-[65%] 2xl:w-[80%] flex gap-3'>
                                <Skeleton className='max-w-36 h-36 rounded-md' />
                                <div className='flex flex-col gap-3 w-full'>
                                    <Skeleton className='h-6 w-3/4' />
                                    <Skeleton className='h-4 w-1/4' />
                                    <div className='flex gap-4 items-center'>
                                        <Skeleton className='h-5 w-16' />
                                        <Skeleton className='h-5 w-16' />
                                        <Skeleton className='h-6 w-12 rounded-full' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between items-center lg:w-[40%]'>
                                <Skeleton className='h-10 w-24' />
                                <Skeleton className='h-5 w-5' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='lg:col-span-1 relative pe-3'>
                <div className='sticky top-4'>
                    <Card className='w-full'>
                        <CardHeader>
                            <Skeleton className='h-6 w-1/3' />
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between text-sm'
                                    >
                                        <Skeleton className='h-4 w-1/3' />
                                        <Skeleton className='h-4 w-1/4' />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className='h-px w-full' />
                            <div className='flex items-center justify-between'>
                                <Skeleton className='h-5 w-1/4' />
                                <Skeleton className='h-6 w-1/3' />
                            </div>
                            <Skeleton className='h-10 w-full' />
                        </CardContent>
                        <CardContent>
                            <Skeleton className='h-10 w-full' />
                        </CardContent>
                    </Card>
                </div>
                <div className='mt-4'>
                    <Card>
                        <CardContent className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Skeleton className='h-5 w-5' />
                                <Skeleton className='h-4 w-3/4' />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
