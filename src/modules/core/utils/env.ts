export const env = {
    environment: import.meta.env.VITE_ENVIRONMENT,
    isDev: import.meta.env.VITE_ENVIRONMENT === 'development',
    apiUrl: import.meta.env.VITE_API_URL,
    appName: import.meta.env.VITE_APP_NAME,
    appCode: import.meta.env.VITE_APP_CODE,
    encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY,
    supportedLocales: import.meta.env.VITE_SUPPORTED_LOCALES,
};
