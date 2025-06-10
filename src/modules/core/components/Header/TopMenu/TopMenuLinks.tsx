import { urls } from '@/modules/core/utils/urls';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';

export default function TopMenuLinks() {
    return (
        <nav className='hidden md:flex space-x-4'>
            <Link to={urls.shop} className='px-3 py-2 hover:text-primary'>
                <Trans>Shop</Trans>
            </Link>
            <Link
                to={urls.brands.index}
                className='px-3 py-2 hover:text-primary'
            >
                <Trans>Brands</Trans>
            </Link>
            <Link
                to={urls.categories.index}
                className='px-3 py-2 hover:text-primary'
            >
                <Trans>Categories</Trans>
            </Link>
        </nav>
    );
}
