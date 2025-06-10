import { create } from 'zustand';
import createZustandSelectors from '../utils/zustand/create-zustand-selectors';

interface NavbarState {
    isSearchOpened: boolean;
    isCartOpened: boolean;
    isWishlistOpened: boolean;
    isUserMenuOpened: boolean;
    isCategoriesOpened: boolean;
}

const NavbarStore = create<NavbarState>(() => ({
    isSearchOpened: false,
    isCartOpened: false,
    isWishlistOpened: false,
    isUserMenuOpened: false,
    isCategoriesOpened: false,
}));

const useNavbarStore = createZustandSelectors(NavbarStore);

export default useNavbarStore;
