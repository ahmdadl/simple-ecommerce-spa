import { StateStorage } from 'zustand/middleware';
import { SyncCrypto } from './crypto';

export const secureStorage: StateStorage = {
    getItem: (name: string): string | null => {
        const value = localStorage.getItem(name);
        if (!value) return null;
        return SyncCrypto.decrypt(value);
    },

    setItem: (name: string, value: string): void => {
        const encryptedValue = SyncCrypto.encrypt(value);
        localStorage.setItem(name, encryptedValue);
    },

    removeItem: (name: string): void => {
        localStorage.removeItem(name);
    },
};
