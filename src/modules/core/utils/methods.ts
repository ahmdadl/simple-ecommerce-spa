import { BrandEntity } from '@/modules/brands/utils/types';
import { CategoryEntity } from '@/modules/categories/utils/types';
import { ProductEntity } from '@/modules/shop/utils/types';
import { TagEntity } from '@/modules/tags/utils/types';
import { i18n } from '@lingui/core';
import { toast } from 'sonner';
import { localeStore } from '../stores/localeStore';

interface LoadingToastOptions {
    loadingMessage?: string;
    successMessage?: string | ((data: any) => string);
    errorMessage?: string;
    toastOptions?: any;
    onFinally?: () => void | Promise<void>;
    onSuccess?: () => void | Promise<void>;
}

export default async function loadingToast<T>(
    promise: Promise<T> | (() => Promise<T>),
    options: LoadingToastOptions = {}
) {
    const {
        loadingMessage = i18n._('Please Wait...'),
        successMessage = i18n._('Done'),
        errorMessage = i18n._('Something went wrong'),
        onFinally = () => {},
        toastOptions = {},
    } = options;

    return toast.promise<T>(promise, {
        loading: loadingMessage,
        success: (data) => {
            options.onSuccess?.();

            return typeof successMessage === 'function'
                ? successMessage(data)
                : successMessage;
        },
        error: errorMessage,
        finally: async () => {
            await Promise.resolve(onFinally());
        },
        ...toastOptions,
    });
}

export function isValidResponse(response: any) {
    return typeof response === 'object' && typeof response?.data === 'object';
}

export function getCurrentLocaleKey() {
    return localeStore.getState().localeKey();
}

export function valueOr(value: any, defaultValue: any) {
    if (typeof value === 'undefined') return defaultValue ?? '';

    if (value === null) return defaultValue ?? '';

    if (value === '') {
        return defaultValue === '' ? '' : defaultValue;
    }

    return String(value);
}

export function getCatalogMetaData(
    record: ProductEntity | CategoryEntity | BrandEntity | TagEntity
) {
    let meta: any[] = [
        {
            title: record?.title || record?.name,
        },
    ];
    let links: any[] = [];

    return {
        meta,
        links,
    };
}

export function getPageMetaData(pageUrl: string) {
    let meta: any[] = [
        {
            title: pageUrl,
        },
    ];
    let links: any[] = [];

    return {
        meta,
        links,
    };
}

export function localizeUrl(url: string) {
    return '/' + getCurrentLocaleKey() + url;
}
