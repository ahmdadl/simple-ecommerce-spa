import ProductsSidebarGrid from '@/modules/shop/components/Products/ProductsSidebarGrid';
import { useAllowedSidebarFilters } from '@/modules/shop/stores/allowed-sidebar-filters';
import { categoryRoute } from '@/routes/$locale/_catalog/categories/$slug';
import CategoryPageView from '../components/CategoryPageView';
import CategoryProductsHero from '../components/CategoryProductsHero';

export default function CategoryProductsPage() {
    useAllowedSidebarFilters.getState().enableForCategory();

    return (
        <>
            <CategoryProductsHero />

            <div className='category-products-page'>
                <ProductsSidebarGrid route={categoryRoute} />
            </div>

            <CategoryPageView />
        </>
    );
}
