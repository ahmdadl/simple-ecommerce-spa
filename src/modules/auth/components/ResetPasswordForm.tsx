import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import useUserStore from '@/modules/core/stores/userStore';
import { localizeUrl } from '@/modules/core/utils/methods';
import { parseError } from '@/modules/core/utils/parseError';
import { urls } from '@/modules/core/utils/urls';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useForgetPasswordStore } from '../stores/forget-password-store';
import { authApi } from '../utils/auth-api';
import PasswordInput from './PasswordInput';

const formSchema = z
    .object({
        email: z.string().email({
            message: i18n._(`Please enter a valid email address.`),
        }),
        otp: z.string().length(6, {
            message: i18n._(`Please enter a valid otp code.`),
        }),
        password: z.string().min(8, {
            message: i18n._(`Password must be at least 8 characters.`),
        }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: i18n._(`Passwords do not match.`),
        path: ['confirmPassword'],
    });

export default function ResetPasswordForm() {
    const { t } = useLingui();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: useForgetPasswordStore.getState().email,
            otp: '',
            password: '',
            password_confirmation: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const response = await authApi.guest
            .resetPassword(values)
            .catch((err) => {
                parseError(err, form);
            });

        setIsLoading(false);

        if (!response?.data) return;

        toast.success(t`Password reset successfully`, {
            className: '!bg-green-500 !text-white',
        });

        useUserStore.setState({
            ...response.data.record,
            isLoaded: true,
            role: 'customer',
        });

        navigate({ to: localizeUrl(urls.home) });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Email</Trans>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isLoading}
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='otp'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>OTP Code</Trans>
                            </FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    minLength={6}
                                    {...field}
                                    disabled={isLoading}
                                    pattern={REGEXP_ONLY_DIGITS}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Password</Trans>
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password_confirmation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Confirm Password</Trans>
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : null}
                    <Trans>Reset Password</Trans>
                </Button>
            </form>
        </Form>
    );
}
