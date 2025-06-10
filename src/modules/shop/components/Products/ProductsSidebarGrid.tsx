import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { ProductPagination } from '../Shop/ShopPagination';
import ShopSortMenu from '../Shop/ShopSortMenu';
import { ProductGrid } from './ProductGrid';

export default function ProductsSidebarGrid({ route }: any) {
    return (
        <SidebarProvider>
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
                    <div className='flex items-center gap-2 px-3 w-full'>
                        <SidebarTrigger />
                        <Separator
                            orientation='vertical'
                            className='mr-2 h-4'
                        />
                        <div className='flex justify-between w-full flex-row gap-4'>
                            <div className=''></div>
                            <div className='w-fit'>
                                <ShopSortMenu />
                            </div>
                        </div>
                    </div>
                </header>
                <div className='flex flex-col gap-4'>
                    <ProductGrid />

                    <ProductPagination />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
