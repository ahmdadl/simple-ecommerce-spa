import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import loadingToast from '@/modules/core/utils/methods';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans } from '@lingui/react/macro';
import { ArrowUpDown, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useFiltersStore } from '../../stores/filters-store';
import { shopApi } from '../../utils/shopApi';

export default function ShopSortMenu() {
    const sortBy = useFiltersStore.use.sortBy();
    const setSortBy = useFiltersStore.use.setSortBy();
    const [isLoading, setIsLoading] = useState(false);

    const sortOptions = [
        {
            label: <Trans>Price: Low to High</Trans>,
            value: 'lowest_price',
        },
        {
            label: <Trans>Price: High to Low</Trans>,
            value: 'highest_price',
        },
        {
            label: <Trans>Newest First</Trans>,
            value: 'latest',
        },
        {
            label: <Trans>Oldest First</Trans>,
            value: 'oldest',
        },
    ];
    const activeSortBy = sortOptions.find((o) => o.value === sortBy);

    async function handleSort(sortBy: string) {
        if (isLoading || sortBy === activeSortBy?.value) return;

        setSortBy(sortBy);

        setIsLoading(true);

        loadingToast(shopApi.loadProducts().catch(parseError), {
            onFinally: () => {
                setIsLoading(false);
            },
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='outline'
                        size='sm'
                        className='mx-auto flex'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className='me-2 h-4 w-4 animate-spin' />
                        ) : (
                            <ArrowUpDown className='me-2 h-4 w-4' />
                        )}
                        <Trans>
                            Sort{activeSortBy && <>: {activeSortBy.label}</>}
                        </Trans>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                    {sortOptions.map((o) => (
                        <DropdownMenuItem
                            key={o.value}
                            onClick={() => handleSort(o.value)}
                        >
                            {o.value === sortBy && <Check className='me-2' />}
                            {o.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
