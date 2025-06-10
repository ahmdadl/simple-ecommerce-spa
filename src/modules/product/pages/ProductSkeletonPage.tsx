import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductHero from '../components/ProductHero';

export default function ProductSkeletonPage() {
    return (
        <>
            <ProductHero />

            <div className='px-4 py-8'>
                {/* Product Section */}
                <div className='grid gap-8 md:grid-cols-2'>
                    {/* Product Images */}
                    <div className='space-y-4'>
                        <Skeleton className='h-[600px] w-full rounded-lg' />
                        <div className='flex space-x-2'>
                            {[...Array(4)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className='h-20 w-20 rounded-md'
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className='space-y-6'>
                        <div>
                            <Skeleton className='h-9 w-3/4' />
                            <div className='mt-2 flex items-center gap-2'>
                                <Skeleton className='h-8 w-24' />
                                <Skeleton className='h-6 w-20' />
                                <Skeleton className='h-6 w-16 rounded-md' />
                            </div>
                            <Skeleton className='mt-1 h-5 w-32' />
                        </div>

                        <Skeleton className='h-20 w-full' />

                        {/* Quantity */}
                        <div>
                            <Skeleton className='mb-3 h-5 w-24' />
                            <div className='flex items-center'>
                                <Button variant='outline' size='icon' disabled>
                                    <div className='h-4 w-4' />
                                </Button>
                                <Skeleton className='mx-4 h-6 w-8' />
                                <Button variant='outline' size='icon' disabled>
                                    <div className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Skeleton className='h-12 w-full rounded-md' />

                        {/* Product Information Tabs */}
                        <Tabs defaultValue='details' className='mt-8'>
                            <TabsList className='grid w-full grid-cols-3'>
                                <TabsTrigger value='details'>
                                    <Skeleton className='h-5 w-16' />
                                </TabsTrigger>
                                <TabsTrigger value='specifications'>
                                    <Skeleton className='h-5 w-24' />
                                </TabsTrigger>
                                <TabsTrigger value='shipping'>
                                    <Skeleton className='h-5 w-20' />
                                </TabsTrigger>
                            </TabsList>
                            <div className='mt-4'>
                                <Skeleton className='h-24 w-full' />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
