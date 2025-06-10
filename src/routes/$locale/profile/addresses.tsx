import AddressesPage from '@/modules/addresses/pages/AddressesPage';
import AddressesSkeletonPage from '@/modules/addresses/pages/AddressesSkeletonPage';
import { addressesStore } from '@/modules/addresses/stores/addresses-store';
import { addressApi } from '@/modules/addresses/utils/addresses-api';
import { getPageMetaData } from '@/modules/core/utils/methods';
import { parseError } from '@/modules/core/utils/parseError';
import { createFileRoute } from '@tanstack/react-router';
import { AxiosResponse } from 'axios';

export const Route = createFileRoute('/$locale/profile/addresses')({
    head: () => ({
        ...getPageMetaData('addresses'),
    }),

    component: AddressesPage,
    loader: async () => {
        const response = (await addressApi
            .getAll(true, true)
            .catch(parseError)) as AxiosResponse;

        if (!response?.data?.addresses) return;

        const data = response.data;

        addressesStore.setState({
            list: data.addresses,
            governments: data.governments,
            cities: data.cities,
        });
    },
    pendingComponent: AddressesSkeletonPage,
});
