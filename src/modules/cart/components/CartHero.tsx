import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';

export default function CartHero() {
    return (
        <>
            <HeroSection
                title={<Trans>Shopping Cart</Trans>}
                breadcrumbs={[
                    { label: <Trans>Home</Trans>, path: urls.home },
                    { label: <Trans>Cart</Trans>, path: urls.cart },
                ]}
            />
        </>
    );
}
