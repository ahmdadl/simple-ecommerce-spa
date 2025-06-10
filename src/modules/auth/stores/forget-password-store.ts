import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';

interface ForgetPasswordState {
    email: string;
}

const forgetPasswordStore = create<ForgetPasswordState>(() => ({
    email: '',
}));

export const useForgetPasswordStore =
    createZustandSelectors(forgetPasswordStore);
