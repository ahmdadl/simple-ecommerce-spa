import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { AddressEntity, CityEntity, GovernmentEntity } from '../utils/types';

type AddressesState = {
    list: AddressEntity[];
    currentAddress?: AddressEntity;
    createModalIsOpen: boolean;
    editModalIsOpen: boolean;
    deleteModalIsOpen: boolean;

    governments: GovernmentEntity[];
    cities: CityEntity[];

    openCreateModal: () => void;
    closeCreateModal: () => void;
    openEditModal: (address: AddressEntity) => void;
    closeEditModal: () => void;
    openDeleteModal: (address: AddressEntity) => void;
    closeDeleteModal: () => void;
};

export const addressesStore = create<AddressesState>((set) => ({
    list: [],
    currentAddress: undefined,
    createModalIsOpen: false,
    editModalIsOpen: false,
    deleteModalIsOpen: false,

    governments: [],
    cities: [],

    openCreateModal: () => set({ createModalIsOpen: true }),
    closeCreateModal: () => set({ createModalIsOpen: false }),

    openEditModal: (address: AddressEntity) =>
        set({ currentAddress: address, editModalIsOpen: true }),
    closeEditModal: () =>
        set({ currentAddress: undefined, editModalIsOpen: false }),

    openDeleteModal: (address: AddressEntity) =>
        set({ currentAddress: address, deleteModalIsOpen: true }),
    closeDeleteModal: () =>
        set({ currentAddress: undefined, deleteModalIsOpen: false }),
}));

export const useAddressesStore = createZustandSelectors(addressesStore);
