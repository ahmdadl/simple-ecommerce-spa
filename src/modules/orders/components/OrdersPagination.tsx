import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { useOrdersStore } from '../stores/orders-store';
import { ordersApi } from '../utils/orders-api';

export default function OrdersPagination() {
    const { paginationInfo } = useOrdersStore.getState();
    const [isLoading, setIsLoading] = useState(0);

    async function handlePageChange(page: number) {
        if (isLoading) return;

        setIsLoading(page);

        await ordersApi.loadOrders(page).catch(parseError);

        setIsLoading(0);
    }

    return (
        <div className='flex flex-col h-full min-h-full'>
            <div className='flex items-center justify-between space-x-2 py-4'>
                <div className='text-sm text-muted-foreground'>
                    {paginationInfo.from ? (
                        <Trans>
                            Showing {paginationInfo.from} to {paginationInfo.to}{' '}
                            of {paginationInfo.total} orders
                        </Trans>
                    ) : (
                        <Trans>'No orders found</Trans>
                    )}
                </div>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handlePageChange(1)}
                        disabled={
                            paginationInfo.current_page === 1 || isLoading !== 0
                        }
                    >
                        {isLoading === 1 ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            <ChevronsLeft className='h-4 w-4' />
                        )}
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            handlePageChange(paginationInfo.current_page - 1)
                        }
                        disabled={
                            paginationInfo.current_page === 1 || isLoading !== 0
                        }
                    >
                        {isLoading === paginationInfo.current_page - 1 &&
                        isLoading !== 0 ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            <ChevronLeft className='h-4 w-4' />
                        )}
                    </Button>
                    <div className='text-sm font-medium'>
                        <Trans>
                            Page {paginationInfo.current_page} of{' '}
                            {paginationInfo.last_page}
                        </Trans>
                    </div>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            handlePageChange(paginationInfo.current_page + 1)
                        }
                        disabled={
                            !paginationInfo.has_more_pages || isLoading !== 0
                        }
                    >
                        {isLoading === paginationInfo.current_page + 1 ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            <ChevronRight className='h-4 w-4' />
                        )}
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            handlePageChange(paginationInfo.last_page)
                        }
                        disabled={
                            !paginationInfo.has_more_pages || isLoading !== 0
                        }
                    >
                        {isLoading === paginationInfo.last_page ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            <ChevronsRight className='h-4 w-4' />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
