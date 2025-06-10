import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';

export default function BrandsHero() {
    return (
        <HeroSection
            title={<Trans>Brands</Trans>}
            breadcrumbs={[
                {
                    label: <Trans>Home</Trans>,
                    path: urls.home,
                },
                {
                    label: <Trans>Brands</Trans>,
                },
            ]}
        />
    );
}
