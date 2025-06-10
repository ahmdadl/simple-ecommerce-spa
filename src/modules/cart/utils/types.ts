import { WalletEntity } from '@/modules/my-wallet/utils/types';
import { OrderEntity } from '@/modules/orders/utils/types';
import { UserGender } from '@/modules/profile/utils/types';
import { AddressEntity } from '../../addresses/utils/types';
import { ProductEntity } from '../../shop/utils/types';

export type CartTotalsEntity = {
    original: number;
    discount: number;
    taxes: number;
    products: number;
    items: number;
    subtotal: number;
    coupon: number;
    shipping: number;
    wallet: number;
    total: number;
};

export type UserTotalsEntity = {
    cartItems: number;
    wishlistItems: number;
    compareItems: number;
    orders: number;
    purchased: number;
};

export type UserEntity = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    access_token: string;
    gender?: UserGender;
    totals: UserTotalsEntity;
};

export type CouponEntity = {
    id: string;
    code: string;
    name: string;
    starts_at: string;
    ends_at: string;
    discount_type: 'percentage' | 'fixed';
    value: number;
    max_discount: number | null;
    used_count: number;
    is_active: boolean;
};

export type CartItemEntity = {
    id: string;
    product: ProductEntity;
    quantity: number;
    totals: CartTotalsEntity;
};

export type CartEntity = {
    id: string;
    shipping_address_id: string | null;
    coupon_id: string | null;
    totals: CartTotalsEntity;
    shipping_address?: AddressEntity;
    coupon?: CouponEntity;
    items: CartItemEntity[];
    wallet_amount: number;
};

export type PaymentMethodEntity = {
    code: string;
    name: string;
    image: string;
    require_receipt: boolean;
};

export type CartResponse = {
    cart: CartEntity;
    addresses: AddressEntity[] | null;
    paymentMethods: PaymentMethodEntity[] | null;
    wallet: WalletEntity | null;

    selectedAddress: AddressEntity | null;
    selectedPaymentMethod: string | null;
    receipt: string | null;
};

export type PlaceOrderResponse = {
    record?: OrderEntity;
    message?: string;
    payment_url?: string;
};
