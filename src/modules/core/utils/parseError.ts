import { i18n } from '@lingui/core';
import axios, { AxiosError } from 'axios';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface LaravelValidationError {
    [key: string]: string[];
}

interface ErrorResponse {
    message?: string;
    errors?: LaravelValidationError;
}

/**
 * Parses Axios error and handles Laravel validation errors for form
 * @param error AxiosError object from catch block
 * @param form Form instance to set errors on
 * @returns Error message string
 */
export function parseError(
    error: unknown,
    form?: UseFormReturn<any>,
    toastFormErrors: boolean = false
): string {
    if (!axios.isAxiosError(error)) {
        const message = i18n._('An unexpected error occurred');
        toast.error(message, {
            className: '!bg-red-500 !text-white',
        });
        return message;
    }

    const axiosError = error as AxiosError<ErrorResponse>;

    // Handle network errors
    if (!axiosError.response) {
        const message = axiosError.message || i18n._('Network error occurred');
        toast.error(message, {
            className: '!bg-red-500 !text-white',
        });
        return message;
    }

    const { status, data } = axiosError.response;

    // Handle Laravel validation errors (422)
    if (status === 422 && data?.errors) {
        // Set form errors if they exist
        if (form) {
            Object.entries(data.errors).forEach(([field, messages]) => {
                form.setError(field, {
                    type: 'manual',
                    message: messages[0],
                });
            });
        }

        if (toastFormErrors) {
            let message = '';
            Object.entries(data.errors).forEach(([field, messages]) => {
                message += `${field} ${messages[0]}\n`;
            });
            toast.error(message);
        }
        return data.message || i18n._('Validation failed');
    }

    // Handle other errors
    const message = data?.message || i18n._('Request failed');
    toast.error(message, {
        className: '!bg-red-500 !text-white',
    });
    return message;
}
