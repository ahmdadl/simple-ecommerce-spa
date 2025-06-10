import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from '@/modules/core/components/LocalizedLink';
import { cachedData } from '@/modules/core/utils/cached-data';
import { getCurrentLocaleKey } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function HomeBrands() {
    const brands = cachedData.brands.filter((b) => b.is_main);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className='py-12 px-4 md:px-6 lg:px-8 bg-muted/30'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold tracking-tight'>
                        <Trans>Featured Brands</Trans>
                    </h2>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={scrollLeft}
                        >
                            <ChevronLeft className='h-4 w-4' />
                            <span className='sr-only'>
                                <Trans>Scroll left</Trans>
                            </span>
                        </Button>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={scrollRight}
                        >
                            <ChevronRight className='h-4 w-4' />
                            <span className='sr-only'>
                                <Trans>Scroll right</Trans>
                            </span>
                        </Button>
                    </div>
                </div>
                <div
                    ref={scrollContainerRef}
                    className='flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {brands.map((brand) => (
                        <Link key={brand.id} to={urls.brands.view(brand)}>
                            <Card
                                key={brand.id}
                                className='min-w-1/5 snap-start hover:shadow-md shadow-lg hover:scale-110 duration-300 transition-all'
                            >
                                <CardContent className='p-6 flex flex-col items-center text-center'>
                                    <div className='w-[200px] h-[100px] flex items-center justify-center mb-4 '>
                                        <img
                                            src={brand.image ?? ''}
                                            alt={
                                                brand.title[
                                                    getCurrentLocaleKey()
                                                ]
                                            }
                                            width={220}
                                            height={100}
                                            className='object-cover max-h-full rounded'
                                        />
                                    </div>
                                    <h3 className='font-medium text-lg'>
                                        {brand.title[getCurrentLocaleKey()]}
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        <Trans>
                                            {brand.products_count} products
                                        </Trans>
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
