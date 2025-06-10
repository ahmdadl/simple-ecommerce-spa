import { Button } from '@/components/ui/button';
import { urls } from '@/modules/core/utils/urls';
import ProductCard from '@/modules/shop/components/Products/ProductCard';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';
import { List } from 'lucide-react';
import { useHomeStore } from '../stores/home-store';

export default function HomeBestSellers() {
    const products = useHomeStore.use.bestSellers();

    return (
        <section className='py-12 px-4 md:px-6 lg:px-8'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold tracking-tight'>
                        <Trans>Best Sellers</Trans>
                    </h2>
                    <Button variant={'default'} color='primary' asChild>
                        <Link
                            to={urls.shop}
                            className='text-primary hover:underline'
                        >
                            <List className='size-4' />
                            <Trans>View all</Trans>
                        </Link>
                    </Button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {Boolean(products?.length) &&
                        products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                </div>
            </div>
        </section>
    );
}
