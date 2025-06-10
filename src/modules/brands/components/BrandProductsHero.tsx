import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { useProductsStore } from '@/modules/shop/stores/products-store';
import { Trans } from '@lingui/react/macro';

export default function BrandProductsHero() {
    const brand = useProductsStore.use.brand();

    if (!brand) return null;

    return (
        <>
            <HeroSection
                title={brand?.title}
                breadcrumbs={[
                    { label: <Trans>Home</Trans>, path: urls.home },
                    {
                        label: <Trans>Brands</Trans>,
                        path: urls.brands.index,
                    },
                    { label: brand.title },
                ]}
            />
        </>
    );
}
