import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trans } from '@lingui/react/macro';
import { useEffect, useState } from 'react';

export default function OrdersFilters() {
    const [idFilter, setIdFilter] = useState('');

    useEffect(() => {
        if (!idFilter) {
            return;
        }

        applyFilters();
    }, [idFilter]);

    async function clearFilters() {
        setIdFilter('');
        // loadingToast(ordersApi.loadOrders(1));
    }

    async function applyFilters() {
        // loadingToast(ordersApi.loadOrders(1, idFilter));
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='relative w-full md:w-64'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search by Order ID...'
                        value={idFilter}
                        onChange={(e) => setIdFilter(e.target.value)}
                        className='pl-8'
                    />
                </div>
                {idFilter?.length > 0 && (
                    <Button variant='outline' size='sm' onClick={clearFilters}>
                        <Trans>Clear</Trans>
                    </Button>
                )}
            </div>
        </div>
    );
}
