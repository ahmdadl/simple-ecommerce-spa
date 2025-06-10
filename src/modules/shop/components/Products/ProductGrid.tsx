import { useProductsStore } from '../../stores/products-store';
import ProductCard from './ProductCard';

export function ProductGrid() {
    const products = useProductsStore.use.records();

    return (
        <div className='space-y-4 py-3 px-3'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
}
