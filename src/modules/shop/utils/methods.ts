import { PaginationInfoEntity } from '@/modules/core/utils/types';
import { filtersStore } from '../stores/filters-store';
import { FilterState } from './types';

const getSearchParams = (state: FilterState): Record<string, string> => {
    if (!state.filters) return {};

    const params: Record<string, string> = {};
    if (state.selectedCategories.length > 0) {
        params.categories = state.selectedCategories.join(',');
    }
    if (state.selectedBrands.length > 0) {
        params.brands = state.selectedBrands.join(',');
    }
    const minPrice = Number.parseFloat(state.filters.price_range.min);
    const maxPrice = Number.parseFloat(state.filters.price_range.max);
    if (
        state.currentPriceRange[0] > minPrice ||
        state.currentPriceRange[1] < maxPrice
    ) {
        params.price = `${state.currentPriceRange[0]}-${state.currentPriceRange[1]}`;
    }

    if (state.currentPage > 1) {
        params.page = String(state.currentPage);
    }

    if (state.sortBy) {
        params.sortBy = state.sortBy;
    }

    if (state.selectedTags.length > 0) {
        params.tags = state.selectedTags.join(',');
    }
    return params;
};

export const getFilterSearchParams = () =>
    getSearchParams(filtersStore.getState());

export function getPageNumbers(paginationInfo: PaginationInfoEntity) {
    const { current_page, last_page } = paginationInfo;

    // For small number of pages, show all
    if (last_page <= 7) {
        return Array.from({ length: last_page }, (_, i) => i + 1);
    }

    // For larger number of pages, show a range around current page
    const pages = [1]; // Always include first page

    // Calculate range around current page
    let rangeStart = Math.max(2, current_page - 1);
    let rangeEnd = Math.min(last_page - 1, current_page + 1);

    // Adjust range to always show 3 pages if possible
    if (current_page <= 3) {
        rangeEnd = Math.min(4, last_page - 1);
    } else if (current_page >= last_page - 2) {
        rangeStart = Math.max(2, last_page - 3);
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
        pages.push(-1); // -1 represents ellipsis
    }

    // Add range
    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < last_page - 1) {
        pages.push(-2); // -2 represents ellipsis (using different value to avoid React key conflicts)
    }

    // Always include last page
    if (last_page > 1) {
        pages.push(last_page);
    }

    return pages;
}
