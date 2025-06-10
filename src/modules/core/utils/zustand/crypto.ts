import { env } from '../env';

export class SyncCrypto {
    private static key: string = env.encryptionKey;
    private static isProduction: boolean = !env.isDev;

    private static stringToKey(str: string): number[] {
        return str.split('').map((char) => char.charCodeAt(0));
    }

    static encrypt(data: string): string {
        if (!this.isProduction) return data;

        const keyBytes = this.stringToKey(this.key);
        const dataBytes = data.split('').map((char) => char.charCodeAt(0));

        const encrypted = dataBytes.map(
            (byte, i) => byte ^ keyBytes[i % keyBytes.length]
        );

        return btoa(String.fromCharCode(...encrypted));
    }

    static decrypt(encrypted: string): string {
        if (!this.isProduction) return encrypted;

        try {
            const encryptedBytes = atob(encrypted)
                .split('')
                .map((char) => char.charCodeAt(0));
            const keyBytes = this.stringToKey(this.key);

            const decrypted = encryptedBytes.map(
                (byte, i) => byte ^ keyBytes[i % keyBytes.length]
            );

            return String.fromCharCode(...decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    }
}
