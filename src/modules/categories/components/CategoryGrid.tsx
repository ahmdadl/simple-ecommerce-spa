import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from '@/modules/core/components/Image';
import { urls } from '@/modules/core/utils/urls';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';
import { useCategoriesStore } from '../stores/categories-store';

export function CategoryGrid() {
    const categories = useCategoriesStore.use.records();

    return (
        <div className='grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 lg:px-6 2xl:px-8'>
            {Boolean(categories?.length) &&
                categories.map((category) => (
                    <Link
                        key={category.id}
                        to={urls.categories.view(category)}
                        className='group transition-transform hover:scale-[1.02]'
                    >
                        <Card className='h-full overflow-hidden py-0'>
                            <div className='relative w-full overflow-hidden'>
                                <Image
                                    src={category.image ?? ''}
                                    alt={category.title}
                                    className='object-cover transition-transform group-hover:scale-115 w-full max-w-full duration-500 ease-in-out'
                                />
                            </div>
                            <CardContent className='p-4'>
                                <h3 className='text-xl font-semibold'>
                                    {category.title}
                                </h3>
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    {category.description}
                                </p>
                            </CardContent>
                            <CardFooter className='border-t p-4 pt-3'>
                                <p className='text-sm text-muted-foreground'>
                                    {category.products_count}{' '}
                                    <Trans>products</Trans>
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
        </div>
    );
}
