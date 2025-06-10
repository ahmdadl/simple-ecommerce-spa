import ProductsSidebarGrid from '@/modules/shop/components/Products/ProductsSidebarGrid';
import { useAllowedSidebarFilters } from '@/modules/shop/stores/allowed-sidebar-filters';
import { brandRoute } from '@/routes/$locale/_catalog/brands/$slug';
import BrandPageView from '../components/BrandPageView';
import BrandProductsHero from '../components/BrandProductsHero';

export default function BrandProductsPage() {
    useAllowedSidebarFilters.getState().enableForBrand();

    return (
        <>
            <BrandProductsHero />

            <div className='brand-products-page'>
                <ProductsSidebarGrid route={brandRoute} />
            </div>

            <BrandPageView />
        </>
    );
}
