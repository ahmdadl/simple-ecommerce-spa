import { CachedDataType, SettingsCachedEntity } from './types';

interface CustomWindow extends Window {
    CACHED_DATA?: CachedDataType;
}
const customWindow = window as CustomWindow;

export const cachedData: CachedDataType = customWindow.CACHED_DATA || {
    categories: [],
    brands: [],
    settings: {} as SettingsCachedEntity,
    pageMetas: [],
};
