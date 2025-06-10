import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Trans } from '@lingui/react/macro';
import { ArrowUpDown, Menu } from 'lucide-react';
import ProductCardSkeleton from './ProductCard/ProductCardSkeleton';

export default function ProductsSidebarGridSkeleton() {
    return (
        <>
            <div className='shop-page'>
                <SidebarProvider>
                    <div className='w-64 border-r p-4 space-y-4'>
                        <Skeleton className='h-8 w-3/4' />{' '}
                        <Skeleton className='h-6 w-full' />{' '}
                        <Skeleton className='h-6 w-4/5' />
                        <Skeleton className='h-6 w-full' />{' '}
                        <Skeleton className='h-6 w-4/5' />
                    </div>

                    <SidebarInset>
                        {/* Header */}
                        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
                            <div className='flex items-center gap-2 px-3 w-full'>
                                <Button variant='ghost' size='icon' asChild>
                                    <SidebarTrigger>
                                        <Menu className='h-5 w-5' />
                                    </SidebarTrigger>
                                </Button>
                                <Separator
                                    orientation='vertical'
                                    className='mr-2 h-4'
                                />
                                <div className='flex justify-between w-full flex-row gap-4'>
                                    {/* ActiveFilters */}
                                    <div className='flex gap-2 items-center'>
                                        <Skeleton className='h-6 w-24' />
                                        <Skeleton className='h-6 w-20' />
                                    </div>
                                    {/* Sort Dropdown */}
                                    <div className='w-fit'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='ml-auto flex'
                                                >
                                                    <ArrowUpDown className='mr-2 h-4 w-4' />
                                                    <Trans>Sort</Trans>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem>
                                                    <Skeleton className='h-4 w-20' />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Skeleton className='h-4 w-20' />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Skeleton className='h-4 w-20' />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Skeleton className='h-4 w-20' />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* ProductGrid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
                            {Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className='space-y-2'>
                                    <ProductCardSkeleton />
                                </div>
                            ))}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </>
    );
}
