import { CartTotalsEntity } from '@/modules/cart/utils/types';

// Order item
export type OrderItemEntity = {
    id: string;
    order_id: string;
    quantity: number;
    totals: CartTotalsEntity;
    created_at: string;
    product: OrderItemProductEntity;
};

export type OrderItemProductEntity = {
    id: string;
    order_item_id: string;
    product_id: string;
    category_id: string;
    brand_id: string;
    title: string;
    category_title: string;
    brand_title: string;
    images: string[];
    sku: string;
    price: number;
};

// Address details
export type AddressEntity = {
    id: string;
    address_id: string;
    user_id: string;
    government_id: string;
    city_id: string;
    city_title: string;
    shipping_fees: number;
    name: string;
    title: string;
    address: string;
    phone: string;
    created_at: string;
    updated_at: string;
};

// Payment attempt
export type PaymentAttemptEntity = {
    id: string;
    order_id: string;
    payment_method: string; // e.g., "cod" (Cash on Delivery)
    status: string; // e.g., "pending"
    payment_details: null | Record<string, any>; // Flexible for future details
    created_at: string;
    updated_at: string;
};

// Main order record
export type OrderEntity = {
    id: string;
    user_id: string;
    shipping_address_id: string;
    status: OrderStatus;
    payment_status: OrderPaymentStatus;
    payment_method: string;
    totals: CartTotalsEntity;
    created_at: string;
    items?: OrderItemEntity[];
    shippingAddress?: AddressEntity;
    coupon?: null | Record<string, any>;
    paymentAttempts?: PaymentAttemptEntity[];
};

export enum OrderPaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}
