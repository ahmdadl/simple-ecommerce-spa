import { ChevronsLeftIcon, ChevronsRightIcon, Loader2 } from 'lucide-react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import loadingToast from '@/modules/core/utils/methods';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { filtersStore } from '../../stores/filters-store';
import { useProductsStore } from '../../stores/products-store';
import { getPageNumbers } from '../../utils/methods';
import { shopApi } from '../../utils/shopApi';

export function ProductPagination() {
    const paginationInfo = useProductsStore.use.paginationInfo();
    const [isLoading, setIsLoading] = useState(false);

    const pageNumbers = getPageNumbers(paginationInfo);

    async function handlePageChange(page: number) {
        if (isLoading) return;

        filtersStore.getState().setPage(page);

        setIsLoading(true);

        loadingToast(shopApi.loadProducts().catch(parseError), {
            onFinally: () => {
                setIsLoading(false);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            },
        });
    }

    return (
        <Pagination className='py-4'>
            <PaginationContent className='flex flex-wrap justify-center gap-1 sm:gap-0'>
                <PaginationItem>
                    <PaginationLink
                        aria-label='Go to previous page'
                        size='default'
                        className={cn(
                            'gap-1 px-2.5 sm:pl-2.5',
                            paginationInfo.current_page <= 1
                                ? 'pointer-events-none opacity-50'
                                : ''
                        )}
                        onClick={(e) => {
                            if (paginationInfo.current_page > 1) {
                                e.preventDefault();
                                handlePageChange(
                                    paginationInfo.current_page - 1
                                );
                            }
                        }}
                        aria-disabled={paginationInfo.current_page <= 1}
                    >
                        {isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            <ChevronsLeftIcon className='rtl:rotate-180' />
                        )}
                        <span className='hidden sm:block'>
                            <Trans>Previous</Trans>
                        </span>
                    </PaginationLink>
                </PaginationItem>

                {/* Desktop view - show all calculated page numbers */}
                <div className='hidden sm:flex'>
                    {pageNumbers.map((pageNumber, index) => {
                        // Render ellipsis
                        if (pageNumber < 0) {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        // Render page number
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    // href={createPageUrl(pageNumber)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(pageNumber);
                                    }}
                                    isActive={
                                        pageNumber ===
                                        paginationInfo.current_page
                                    }
                                >
                                    {isLoading ? (
                                        <Loader2 className='animate-spin' />
                                    ) : (
                                        pageNumber
                                    )}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </div>

                {/* Mobile view - simplified pagination */}
                <div className='flex sm:hidden items-center'>
                    {/* <PaginationItem>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='h-9 w-9'
                            disabled={paginationInfo.current_page <= 1}
                            onClick={() =>
                                handlePageChange(
                                    paginationInfo.current_page - 1
                                )
                            }
                        >
                            {isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                <ChevronLeft className='h-4 w-4' />
                            )}
                            <span className='sr-only'>
                                <Trans>Previous page</Trans>
                            </span>
                        </Button>
                    </PaginationItem> */}

                    <span className='px-4 text-sm'>
                        <Trans>
                            Page {paginationInfo.current_page} of{' '}
                            {paginationInfo.last_page}
                        </Trans>
                    </span>

                    {/* <PaginationItem>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='h-9 w-9'
                            disabled={
                                paginationInfo.current_page >=
                                paginationInfo.last_page
                            }
                            onClick={() =>
                                handlePageChange(
                                    paginationInfo.current_page + 1
                                )
                            }
                        >
                            {isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                <ChevronRight className='h-4 w-4' />
                            )}
                            <span className='sr-only'>
                                <Trans>Next page</Trans>
                            </span>
                        </Button>
                    </PaginationItem> */}
                </div>

                <PaginationItem>
                    <PaginationLink
                        aria-label='Go to next page'
                        size='default'
                        className={cn(
                            'gap-1 px-2.5 sm:pr-2.5',
                            !paginationInfo.has_more_pages
                                ? 'pointer-events-none opacity-50'
                                : ''
                        )}
                        onClick={(e) => {
                            if (
                                paginationInfo.current_page <
                                paginationInfo.last_page
                            ) {
                                e.preventDefault();
                                handlePageChange(
                                    paginationInfo.current_page + 1
                                );
                            }
                        }}
                        aria-disabled={!paginationInfo.has_more_pages}
                    >
                        <span className='hidden sm:block'>
                            <Trans>Next</Trans>
                        </span>
                        {isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            <ChevronsRightIcon className='rtl:rotate-180' />
                        )}
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
