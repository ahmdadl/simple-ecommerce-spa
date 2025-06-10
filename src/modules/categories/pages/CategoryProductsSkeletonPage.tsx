import ProductsSidebarGridSkeleton from '@/modules/shop/components/Products/ProductsSidebarGridSkeleton';
import CategoryProductsHero from '../components/CategoryProductsHero';

export default function CategoryProductsSkeletonPage() {
    return (
        <>
            <CategoryProductsHero />

            <div>
                <ProductsSidebarGridSkeleton />
            </div>
        </>
    );
}
