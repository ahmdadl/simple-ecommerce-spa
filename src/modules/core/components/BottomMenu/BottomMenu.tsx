import { Button } from '@/components/ui/button';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';
import { Home, LayoutGrid, Search, User } from 'lucide-react';
import useNavbarStore from '../../stores/navbar-store';
import { urls } from '../../utils/urls';
import BMenuCart from './BMenuCart';

export default function BottomMenu() {
    const isLoggedIn = true;

    return (
        <div className='fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden print:hidden'>
            <div className='flex items-center align-center justify-between px-3'>
                <Button
                    variant='ghost'
                    className='flex flex-col items-center justify-center'
                    asChild
                >
                    <Link to={urls.shop} className='px-6'>
                        <Home className='h-5 w-5' />
                        <span className='text-xs'>
                            <Trans>Shop</Trans>
                        </span>
                    </Link>
                </Button>

                <Button
                    variant='ghost'
                    className='flex flex-col items-center justify-center h-full'
                    asChild
                >
                    <Link to={urls.categories.index}>
                        <LayoutGrid className='h-5 w-5' />
                        <span className='text-xs'>
                            <Trans>Categories</Trans>
                        </span>
                    </Link>
                </Button>

                <Button
                    variant='ghost'
                    className='flex flex-col items-center justify-center h-full'
                    onClick={() => {
                        useNavbarStore.setState({ isSearchOpened: true });
                    }}
                >
                    <Search className='h-5 w-5' />
                    <span className='text-xs'>
                        <Trans>search</Trans>
                    </span>
                </Button>

                <BMenuCart />

                <Button
                    variant='ghost'
                    className='flex flex-col items-center justify-center h-full'
                    onClick={() =>
                        useNavbarStore.setState({ isUserMenuOpened: true })
                    }
                >
                    <User className='h-5 w-5' />
                    <span className='text-xs'>
                        {isLoggedIn ? (
                            <Trans>Profile</Trans>
                        ) : (
                            <Trans>Login</Trans>
                        )}
                    </span>
                </Button>
            </div>
        </div>
    );
}
