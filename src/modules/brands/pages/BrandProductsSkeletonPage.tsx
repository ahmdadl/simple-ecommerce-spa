import ProductsSidebarGridSkeleton from '@/modules/shop/components/Products/ProductsSidebarGridSkeleton';
import BrandProductsHero from '../components/BrandProductsHero';

export default function BrandProductsSkeletonPage() {
    return (
        <>
            <BrandProductsHero />

            <div>
                <ProductsSidebarGridSkeleton />
            </div>
        </>
    );
}
