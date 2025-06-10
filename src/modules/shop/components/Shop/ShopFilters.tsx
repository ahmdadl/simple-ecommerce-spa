import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Trans } from '@lingui/react/macro';
import { DollarSign, List } from 'lucide-react';
import { useAllowedSidebarFilters } from '../../stores/allowed-sidebar-filters';
import { BrandFilters } from '../Filters/BrandFilters';
import { CategoryFilters } from '../Filters/CategoryFilters';
import { PriceRangeFilter } from '../Filters/PriceRangeFilter';
import TagFilters from '../Filters/TagFilters';

export function ShopFilters() {
    const allowedFilters = useAllowedSidebarFilters.use.list();

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <Accordion
                    type='multiple'
                    className='w-full'
                    defaultValue={allowedFilters}
                >
                    {allowedFilters.includes('category') && (
                        <AccordionItem value='category'>
                            <AccordionTrigger className='text-base'>
                                <List />
                                <Trans>Category</Trans>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarGroupLabel className='h-auto w-full'>
                                    <CategoryFilters />
                                </SidebarGroupLabel>
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {allowedFilters.includes('brand') && (
                        <AccordionItem value='brand'>
                            <AccordionTrigger className='text-base'>
                                <List />
                                <Trans>Brand</Trans>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarGroupLabel className='h-auto w-full'>
                                    <BrandFilters />
                                </SidebarGroupLabel>
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {allowedFilters.includes('price') && (
                        <AccordionItem value='price'>
                            <AccordionTrigger className='text-base'>
                                <DollarSign />
                                <Trans>Price</Trans>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarGroupLabel className='h-auto w-full'>
                                    <PriceRangeFilter />
                                </SidebarGroupLabel>
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {allowedFilters.includes('tags') && (
                        <AccordionItem value='tags'>
                            <AccordionTrigger className='text-base'>
                                <List />
                                <Trans>Tag</Trans>
                            </AccordionTrigger>
                            <AccordionContent>
                                <SidebarGroupLabel className='h-auto w-full'>
                                    <TagFilters />
                                </SidebarGroupLabel>
                            </AccordionContent>
                        </AccordionItem>
                    )}
                </Accordion>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
