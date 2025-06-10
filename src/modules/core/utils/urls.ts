export const urls = {
    home: '/',
    auth: {
        login: '/login',
        register: '/register',
        forgetPassword: '/forget-password',
        resetPassword: '/reset-password',
        logout: '/logout',
    },
    shop: '/shop',
    products: {
        view: (product: any) => '/products/' + product.slug,
    },
    categories: {
        index: '/categories',
        view: (category: any) => '/categories/' + category.slug,
    },
    brands: {
        index: '/brands',
        view: (brand: any) => '/brands/' + brand.slug,
    },
    profile: {
        index: '/profile',
        changePassword: '/profile/change-password',
        addresses: '/profile/addresses',
        orders: {
            view: (order: any) => '/profile/orders/' + order.id,
        },
    },
    cart: '/cart',
    checkout: '/checkout',
};
