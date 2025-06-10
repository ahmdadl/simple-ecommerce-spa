import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCardSkeleton from '@/modules/shop/components/Products/ProductCard/ProductCardSkeleton';
import { Trans } from '@lingui/react/macro';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';

export default function HomeSkeletonPage() {
    return (
        <div className='flex flex-col gap-6'>
            <section className='py-12 px-4 md:px-6 lg:px-8'>
                <div className='container mx-auto'>
                    <h2 className='text-3xl font-bold tracking-tight mb-8'>
                        <Trans>Shop by Category</Trans>
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                        {Array.from({ length: 5 }).map((_, cInd) => (
                            <Card
                                className='overflow-hidden h-full transition-all hover:shadow-md block hover:scale-110 duration-300 shadow-lg'
                                key={cInd}
                            >
                                <CardContent className='p-4 flex flex-col items-center text-center'>
                                    <div className='rounded-full overflow-hidden bg-muted mb-4'>
                                        <Skeleton className='h-24 w-24' />
                                    </div>
                                    <h3 className='font-medium text-lg'>
                                        <Skeleton className='h-4 w-3/4' />
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        <Skeleton className='h-4 w-3/4' />
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className='py-12 px-4 md:px-6 lg:px-8 bg-muted/30'>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-3xl font-bold tracking-tight'>
                            <Trans>Featured Brands</Trans>
                        </h2>
                        <div className='flex gap-2'>
                            <Button variant='outline' size='icon' disabled>
                                <ChevronLeft className='h-4 w-4' />
                                <span className='sr-only'>
                                    <Trans>Scroll left</Trans>
                                </span>
                            </Button>
                            <Button variant='outline' size='icon' disabled>
                                <ChevronRight className='h-4 w-4' />
                                <span className='sr-only'>
                                    <Trans>Scroll right</Trans>
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div
                        className='flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x'
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {Array.from({ length: 7 }).map((_, bInd) => (
                            <Card
                                key={bInd}
                                className='min-w-1/5 snap-start hover:shadow-md shadow-lg hover:scale-110 duration-300 transition-all'
                            >
                                <CardContent className='p-6 flex flex-col items-center text-center'>
                                    <div className='w-[200px] h-[100px] flex items-center justify-center mb-4 '>
                                        <Skeleton className='h-full w-full rounded' />
                                    </div>
                                    <h3 className='font-medium text-lg'>
                                        <Skeleton className='h-4 w-3/4' />
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        <Skeleton className='h-4 w-3/4' />
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className='py-12 px-4 md:px-6 lg:px-8'>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-3xl font-bold tracking-tight'>
                            <Trans>Best Sellers</Trans>
                        </h2>
                        <Button variant={'default'} color='primary' disabled>
                            <List className='size-4' />
                            <Trans>View all</Trans>
                        </Button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {Array.from({ length: 8 }).map((_, pInd) => (
                            <ProductCardSkeleton key={pInd} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
