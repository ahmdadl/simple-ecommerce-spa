import { OrderPaymentStatus, OrderStatus } from './types';

export const getOrderStatusColor = (status: OrderStatus | string) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
        case 'Processing':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
        case 'Completed':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
};

export const getOrderPaymentStatusColor = (
    status: OrderPaymentStatus | string
) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
        case 'Paid':
            return 'bg-green-100 text-green-800 hover:bg-green-100';
        case 'Failed':
            return 'bg-red-100 text-red-800 hover:bg-red-100';
        case 'Refunded':
            return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
};

export function parsePrice(price: number) {
    return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
    }).format(price);
}
