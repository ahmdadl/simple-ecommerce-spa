import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { useProductsStore } from '@/modules/shop/stores/products-store';
import { Trans } from '@lingui/react/macro';

export default function CategoryProductsHero() {
    const category = useProductsStore.use.category();

    return (
        <>
            <HeroSection
                title={category?.title}
                breadcrumbs={[
                    { label: <Trans>Home</Trans>, path: urls.home },
                    {
                        label: <Trans>Categories</Trans>,
                        path: urls.categories.index,
                    },
                    { label: category?.title },
                ]}
            />
        </>
    );
}
