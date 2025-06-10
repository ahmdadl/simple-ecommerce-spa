import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';

export default function ShopHero() {
    return (
        <HeroSection
            title={<Trans>Shop</Trans>}
            breadcrumbs={[
                { label: <Trans>Home</Trans>, path: urls.home },
                { label: <Trans>Shop</Trans>, path: urls.shop },
            ]}
        />
    );
}
