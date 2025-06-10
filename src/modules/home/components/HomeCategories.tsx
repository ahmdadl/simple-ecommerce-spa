import { Card, CardContent } from '@/components/ui/card';
import { cachedData } from '@/modules/core/utils/cached-data';
import { getCurrentLocaleKey } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';

export default function HomeCategories() {
    const categories = cachedData.categories.filter((c) => c.id);

    return (
        <section className='py-12 px-4 md:px-6 lg:px-8'>
            <div className='container mx-auto'>
                <h2 className='text-3xl font-bold tracking-tight mb-8'>
                    <Trans>Shop by Category</Trans>
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={urls.categories.view(category)}
                            className='block hover:scale-110 transition-all duration-300 shadow-lg'
                        >
                            <Card className='overflow-hidden h-full transition-all hover:shadow-md'>
                                <CardContent className='p-4 flex flex-col items-center text-center'>
                                    <div className='rounded-full overflow-hidden bg-muted mb-4'>
                                        <img
                                            src={category.image}
                                            alt={
                                                category.title[
                                                    getCurrentLocaleKey()
                                                ]
                                            }
                                            width={150}
                                            height={150}
                                            className='object-cover'
                                        />
                                    </div>
                                    <h3 className='font-medium text-lg'>
                                        {category.title[getCurrentLocaleKey()]}
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        <Trans>
                                            {category.products_count} products
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
