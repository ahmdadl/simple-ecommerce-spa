import { useCartStore } from '@/modules/cart/stores/cart-store';
import { userStore } from '@/modules/core/stores/userStore';
import CheckoutPaymentStatusModal from '../components/CheckoutPaymentStatusModal';
import CheckoutPage from './CheckoutPage';
import EmptyCheckoutPage from './EmptyCheckoutPage';
import GuestCheckoutPage from './GuestCheckoutPage';

export default function BaseCheckoutPage() {
    const { isCustomer } = userStore.getState();
    const cart = useCartStore.use.cart();

    let CheckoutComponent = CheckoutPage;
    if (!isCustomer()) {
        CheckoutComponent = GuestCheckoutPage;
    }

    if (!cart?.id || !cart?.items.length) {
        CheckoutComponent = EmptyCheckoutPage;
    }

    return (
        <>
            <CheckoutComponent />

            <CheckoutPaymentStatusModal />
        </>
    );
}
