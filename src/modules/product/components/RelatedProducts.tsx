import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/modules/shop/components/Products/ProductCard';
import { useProductsStore } from '@/modules/shop/stores/products-store';
import { Trans } from '@lingui/react/macro';

export default function RelatedProducts() {
    const relatedProducts = useProductsStore.use.records();

    return (
        <>
            <div className='mt-16'>
                <h2 className='mb-6 text-2xl font-bold'>
                    <Trans>You might also like</Trans>
                </h2>
                <Carousel className='w-full'>
                    <CarouselContent>
                        {relatedProducts.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className='md:basis-1/3 lg:basis-1/4'
                            >
                                <ProductCard product={item} key={item.id} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-2' />
                    <CarouselNext className='right-2' />
                </Carousel>
            </div>
        </>
    );
}
