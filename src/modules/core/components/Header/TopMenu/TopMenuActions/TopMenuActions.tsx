import { Button } from '@/components/ui/button';
import useNavbarStore from '@/modules/core/stores/navbar-store';
import { Search } from 'lucide-react';
import TopMenuCartButton from './TopMenuCartButton';

export default function TopMenuActions() {
    return (
        <div className='hidden md:flex items-center space-x-4'>
            {/* Search Icon - Mobile */}
            <Button
                variant='outline'
                className='xl:hidden flex p-2 hover:text-primary'
                onClick={() =>
                    useNavbarStore.setState({ isSearchOpened: true })
                }
                aria-label='Search'
            >
                <Search className='h-5 w-5' />
            </Button>

            <TopMenuCartButton />
        </div>
    );
}
