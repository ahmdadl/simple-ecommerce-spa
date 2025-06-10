import { Input } from '@/components/ui/input';
import useNavbarStore from '@/modules/core/stores/navbar-store';
import { useLingui } from '@lingui/react/macro';
import { Search } from 'lucide-react';

export default function TopMenuSearch() {
    const { t } = useLingui();

    return (
        <div
            className='hidden xl:flex flex-1 max-w-md mx-4 cursor-pointer'
            onClick={() => useNavbarStore.setState({ isSearchOpened: true })}
        >
            <div className='relative w-full'>
                <Input
                    type='search'
                    placeholder={t`Search ...`}
                    className='w-full'
                    readOnly
                />
                <div className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
                    <Search className='h-4 w-4 text-muted-foreground' />
                </div>
            </div>
        </div>
    );
}
