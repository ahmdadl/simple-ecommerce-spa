import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { parsePrice } from '@/modules/orders/utils/methods';
import { Trans } from '@lingui/react/macro';
import { useProductStore } from '../../stores/product-store';
import ProductAddToCart from './ProductAddToCart';
import ProductShare from './ProductShare';

export default function ProductDetails() {
    const product = useProductStore.use.record();

    return (
        <div className='w-full max-w-4xl mx-auto'>
            <div className='space-y-6'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        {product.title}
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        <Trans>SKU: {product.sku}</Trans>
                    </p>
                </div>

                {/* Price Section */}
                <div className='flex items-center gap-2'>
                    {product.is_discounted ? (
                        <>
                            <span className='text-2xl font-bold'>
                                {parsePrice(product.discounted_price)}
                            </span>
                            <span className='text-lg text-muted-foreground line-through'>
                                {parsePrice(product.sale_price)}
                            </span>
                            {product.discounted_percentage > 0 && (
                                <Badge className='ml-2 bg-red-500 hover:bg-red-600'>
                                    <Trans>
                                        {product.discounted_percentage}% OFF
                                    </Trans>
                                </Badge>
                            )}
                        </>
                    ) : (
                        <span className='text-2xl font-bold'>
                            {parsePrice(product.sale_price)}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <div>
                    {!product.has_stock ? (
                        <Badge
                            variant='outline'
                            className='text-red-500 border-red-500'
                        >
                            <Trans>Out of Stock</Trans>
                        </Badge>
                    ) : product.has_stock && product.stock <= 5 ? (
                        <Badge
                            variant='outline'
                            className='text-amber-500 border-amber-500'
                        >
                            <Trans>Low Stock - Only {product.stock} left</Trans>
                        </Badge>
                    ) : (
                        <Badge
                            variant='outline'
                            className='text-green-500 border-green-500'
                        >
                            <Trans>In Stock</Trans>
                        </Badge>
                    )}

                    {product.is_new && (
                        <Badge className='ml-2 bg-emerald-500 hover:bg-emerald-600'>
                            <Trans>New</Trans>
                        </Badge>
                    )}
                </div>

                <Separator />

                {/* Product Description */}
                <div>
                    <h2 className='text-lg font-semibold mb-2'>
                        <Trans>Description</Trans>
                    </h2>
                    <div className='text-sm text-muted-foreground space-y-2'>
                        {product.description
                            .split('\n')
                            .map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                    </div>
                </div>

                <Separator />

                <ProductAddToCart product={product} />

                <ProductShare product={product} />

                <Card className='p-4'>
                    <div className='space-y-3'>
                        <div>
                            <h3 className='text-sm font-medium'>
                                <Trans>Category</Trans>
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                <Link
                                    to={urls.categories.view(product.category)}
                                >
                                    {product.category?.title}
                                </Link>
                            </p>
                        </div>
                        <div>
                            <h3 className='text-sm font-medium'>
                                <Trans>Brand</Trans>
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                <Link to={urls.brands.view(product.brand)}>
                                    {product.brand?.title}
                                </Link>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
