import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';

export default function CategoriesHeader() {
    return (
        <>
            <HeroSection
                title={<Trans>Categories</Trans>}
                breadcrumbs={[
                    {
                        label: <Trans>Home</Trans>,
                        path: urls.home,
                    },
                    {
                        label: <Trans>Categories</Trans>,
                    },
                ]}
            />

            <p className='my-4 text-center w-full text-muted-foreground'>
                <Trans>Browse all product categories in our store</Trans>
            </p>
        </>
    );
}
