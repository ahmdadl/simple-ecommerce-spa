import { CategoryCachedEntity } from '@/modules/categories/utils/types';
import { BrandCachedEntity } from '@/modules/shop/utils/types';
import { AxiosResponse } from 'axios';

export type PaginationInfoEntity = {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
    has_more_pages: boolean;
};

// Define generic types for flexibility
export type ApiResponseData<T = any> = T;

// Base response structure (now directly includes success, message, data)
export interface ApiResponse<T = any> extends AxiosResponse {
    success: boolean;
    message: string | null;
    data: ApiResponseData<T>;
}

// Success response with data
export interface SuccessResponse<T = any> extends ApiResponse<T> {
    success: true;
    data: T;
}

// Error response
export interface ErrorResponse extends ApiResponse<never> {
    success: false;
    errors?: Record<string, string[] | string>;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T> {
    success: true;
    records: T[];
    paginationInfo: PaginationInfoEntity;
}

// No content response
export interface NoContentResponse extends ApiResponse<never> {
    success: true;
    data: never;
}

// Validation error response
export interface ValidationErrorResponse extends ErrorResponse {
    errors: Record<string, string[] | string>;
}

// Specific error responses
export interface NotFoundResponse extends ErrorResponse {}
export interface UnauthorizedResponse extends ErrorResponse {}
export interface ForbiddenResponse extends ErrorResponse {}
export interface ServerErrorResponse extends ErrorResponse {}

// Record response
export interface RecordResponse<T> extends SuccessResponse<{ record: T }> {}

// Records response
export interface RecordsResponse<T> extends SuccessResponse<{ records: T[] }> {}

// Union type for all possible responses
export type ApiResponseType<T = any> =
    | SuccessResponse<T>
    | ErrorResponse
    | PaginatedResponse<T>
    | NoContentResponse
    | ValidationErrorResponse
    | NotFoundResponse
    | UnauthorizedResponse
    | ForbiddenResponse
    | ServerErrorResponse
    | RecordResponse<T>
    | RecordsResponse<T>;

// Type guard functions (updated to work with flattened structure)
export const isSuccessResponse = <T>(
    response: ApiResponseType<T>
): response is SuccessResponse<T> => response.success === true;

export const isErrorResponse = <T>(
    response: ApiResponseType<T>
): response is ErrorResponse => response.success === false;

export const isPaginatedResponse = <T>(
    response: ApiResponseType<T>
): response is PaginatedResponse<T> =>
    response.success === true &&
    'records' in response &&
    'paginationInfo' in response;

export const isValidationErrorResponse = <T>(
    response: ApiResponseType<T>
): response is ValidationErrorResponse =>
    response.success === false && 'errors' in response;

export type UploadEntity = {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
};

export type LocalizedEntity = {
    en: string;
    ar: string;
};

export type LocalizedEntityIndex = 'en' | 'ar';

export type CachedDataType = {
    categories: CategoryCachedEntity[];
    brands: BrandCachedEntity[];
    settings: SettingsCachedEntity;
    pageMetas: {
        page_url: string;
        title: LocalizedEntity;
        description: LocalizedEntity;
        image: string;
        keywords: string;
    }[];
};

export type SettingsEntity = {
    general: {
        name: string;
        description: string;
        maintenanceMode: boolean;
    };
    contact: {
        email: string;
        phoneNumbers: string[];
        address: string;
        googleMapUrl: string;
    };
    social: {
        facebook: string;
        twitter: string;
        instagram: string;
        youtube: string;
        linkedin: string;
    };
    top_header: {
        image: string;
        body: string;
        end_time: string;
        is_active: boolean;
    };
};

export type SettingsCachedEntity = SettingsEntity & {
    general: {
        name: LocalizedEntity;
        description: LocalizedEntity;
    };
    contact: {
        address: LocalizedEntity;
    };
    top_header: {
        body: LocalizedEntity;
    };
};

export enum ViewableType {
    PRODUCT = 'product',
    CATEGORY = 'category',
    BRAND = 'brand',
    TAG = 'tag',
}
