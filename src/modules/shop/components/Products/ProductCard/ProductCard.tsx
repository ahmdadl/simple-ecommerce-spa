import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { parsePrice } from '@/modules/orders/utils/methods';
import { Trans } from '@lingui/react/macro';
import { ProductEntity } from '../../../utils/types';
import ProductAddToCartButton from './ProductAddToCartButton';
import ProductWishlistToggleButton from './ProductWishlistToggleButton';

export default function ProductCard({ product }: { product: ProductEntity }) {
    return (
        <Card className='overflow-hidden h-full flex flex-col gap-2 pb-6 pt-0'>
            <div className='relative'>
                <Link to={urls.products.view(product)}>
                    <div className='h-48 overflow-hidden'>
                        <img
                            src={product.images[0] || ''}
                            alt={product.title}
                            width={250}
                            height={150}
                            className='object-cover w-full h-full transition-transform hover:scale-120 duration-500'
                        />
                    </div>
                </Link>

                {/* Badges container */}
                <div className='absolute top-2 left-2 flex flex-col gap-1'>
                    {product.is_new && (
                        <Badge className='bg-primary text-primary-foreground'>
                            <Trans>New</Trans>
                        </Badge>
                    )}

                    {product.is_discounted && (
                        <Badge variant='destructive'>
                            -{product.discounted_percentage}%
                        </Badge>
                    )}

                    {product.stock < 7 && (
                        <Badge className='bg-primary text-primary-foreground'>
                            <Trans>Limited Stock</Trans>
                        </Badge>
                    )}
                </div>

                <ProductWishlistToggleButton product={product} />
            </div>

            <CardContent className='flex-grow'>
                <p className='text-sm text-muted-foreground'>
                    {product.brand && (
                        <Link to={urls.brands.view(product.brand)}>
                            {product.brand.title}
                        </Link>
                    )}

                    {product.category && (
                        <Link to={urls.categories.view(product.category)}>
                            {product.category.title}
                        </Link>
                    )}
                </p>

                <h3 className='font-medium mt-1 line-clamp-2 min-h-[2.5rem]'>
                    <Link to={urls.products.view(product)}>
                        {product.title}
                    </Link>
                </h3>

                <div className='mt-2 flex items-center gap-2'>
                    {product.is_discounted ? (
                        <>
                            <span className='font-bold'>
                                {parsePrice(product.discounted_price)}
                            </span>
                            <span className='text-muted-foreground line-through text-sm'>
                                {parsePrice(product.price)}
                            </span>
                        </>
                    ) : (
                        <span className='font-bold'>
                            {parsePrice(product.sale_price)}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className='pt-0'>
                <ProductAddToCartButton product={product} />
            </CardFooter>
        </Card>
    );
}
