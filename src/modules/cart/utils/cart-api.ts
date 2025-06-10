import http from '@/modules/core/utils/http';
import { parseError } from '@/modules/core/utils/parseError';
import { SuccessResponse } from '@/modules/core/utils/types';
import { cartStore } from '../stores/cart-store';
import { CartResponse, PlaceOrderResponse } from './types';

export const cartApi = {
    load: async (params: any = {}) => {
        const response = (await http
            .get('/cart', { params })
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            cart: response.data.cart,
            addresses: response.data.addresses,
            paymentMethods: response.data.paymentMethods,
            selectedAddress: response.data.cart.shipping_address,
            wallet: response.data.wallet,
        });

        return response.data;
    },

    setAddress: async (addressId: string) => {
        const response = (await http
            .patch(`/cart/address/${addressId}`)
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    removeAddress: async () => {
        const response = (await http
            .delete('/cart/address')
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    applyCoupon: async (couponCode: string) => {
        const response = (await http
            .patch(`/cart/coupon/${couponCode}`)
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    removeCoupon: async () => {
        const response = (await http
            .delete('/cart/coupon')
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    add: async (productId: string, quantity?: number) => {
        const response = (await http
            .post(`/cart/${productId}`, {
                quantity: quantity || 1,
            })
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    updateByProduct: async (productId: string, quantity: number) => {
        const response = (await http
            .patch(`/cart/${productId}/by-product`, { quantity })
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    update: async (cartItemId: string, quantity: number) => {
        const response = (await http
            .patch(`/cart/${cartItemId}`, { quantity })
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    removeByProduct: async (productId: string) => {
        const response = (await http
            .delete(`/cart/${productId}/by-product`)
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    remove: async (cartItemId: string) => {
        const response = (await http
            .delete(`/cart/${cartItemId}`)
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    reset: async () => {
        const response = (await http
            .delete('/cart')
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response?.data) return;

        cartStore.setState({
            ...response.data,
        });

        return response.data;
    },

    createAddress: async (values: any) => {
        const response = (await http
            .post('/cart/address?with[]=addresses', values)
            .catch(parseError)) as SuccessResponse<CartResponse>;

        if (!response) return;

        cartStore.setState({
            ...response.data,
            selectedAddress: response.data.cart?.shipping_address,
        });

        return response.data;
    },

    placeOrder: async (values: any) => {
        const response = (await http
            .post('/orders', values)
            .catch((err) =>
                parseError(err, undefined, true)
            )) as SuccessResponse<PlaceOrderResponse>;

        if (!response?.data) return;

        return response.data;
    },

    placeGuestOrder: async (values: any) => {
        const response = (await http
            .post('/orders/guests', values)
            .catch((err) =>
                parseError(err, undefined, true)
            )) as SuccessResponse<PlaceOrderResponse>;

        if (typeof response !== 'object' || !response?.data) return;

        return response.data;
    },

    applyWallet: async (amount: number) => {
        const response = (await http
            .patch('/cart/wallet', {
                amount: amount,
            })
            .catch((err) =>
                parseError(err, undefined, true)
            )) as SuccessResponse<any>;

        if (typeof response !== 'object' || !response?.data) return;

        return response.data;
    },

    removeWallet: async () => {
        const response = (await http
            .delete('/cart/wallet')
            .catch((err) =>
                parseError(err, undefined, true)
            )) as SuccessResponse<any>;

        if (typeof response !== 'object' || !response?.data) return;

        return response.data;
    },
};
