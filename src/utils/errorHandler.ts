/**
 * Centralized Error Handler for API calls
 * This provides consistent error handling across all stores
 */

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

/**
 * Extracts error message from API response
 * @param error - The error object from axios
 * @param lang - Current language ('ar' or 'en')
 * @returns Formatted error message
 */
export const handleApiError = (error: any, lang: string = 'ar'): string => {
    // Try to get server error message
    const serverMessage =
        error?.response?.data?.message ??
        error?.response?.data?.errors ??
        error?.message;

    // If it's an object (multiple errors), join them
    if (typeof serverMessage === 'object' && serverMessage !== null) {
        const errorValues = Object.values(serverMessage).flat();
        return errorValues.join(' - ');
    }

    // Return server message if string
    if (typeof serverMessage === 'string') {
        return serverMessage;
    }

    // Default fallback message
    return lang === 'ar'
        ? 'حدث خطأ غير متوقع'
        : 'An unexpected error occurred';
};

/**
 * Extracts detailed error info from API response
 * @param error - The error object from axios
 * @returns ApiError object with structured error info
 */
export const parseApiError = (error: any): ApiError => {
    return {
        message: error?.response?.data?.message ?? error?.message ?? 'Unknown error',
        errors: error?.response?.data?.errors ?? undefined,
        statusCode: error?.response?.status ?? undefined,
    };
};

/**
 * Checks if error is a network error
 * @param error - The error object from axios
 * @returns boolean
 */
export const isNetworkError = (error: any): boolean => {
    return !error.response && error.request;
};

/**
 * Checks if error is an authentication error (401)
 * @param error - The error object from axios
 * @returns boolean
 */
export const isAuthError = (error: any): boolean => {
    return error?.response?.status === 401;
};
