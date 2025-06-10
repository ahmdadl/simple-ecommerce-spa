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
import { localizeUrl } from '@/modules/core/utils/methods';
import { parseError } from '@/modules/core/utils/parseError';
import { urls } from '@/modules/core/utils/urls';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useForgetPasswordStore } from '../stores/forget-password-store';
import { authApi } from '../utils/auth-api';

const formSchema = z.object({
    email: z.string().email({
        message: i18n._(`Please enter a valid email address.`),
    }),
});

export default function ForgetPasswordForm() {
    const { t } = useLingui();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        useForgetPasswordStore.setState({ email: '' });
        setIsLoading(true);

        const response = await authApi.guest
            .forgetPassword(values.email)
            .catch((err) => {
                parseError(err, form);
            });

        setIsLoading(false);

        if (response?.status === 204) {
            toast.success(t`OTP sent successfully`, {
                className: '!bg-green-500 !text-white',
            });

            useForgetPasswordStore.setState({ email: values.email });

            navigate({ to: localizeUrl(urls.auth.resetPassword) });
        }
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
                                    placeholder={`email@example.com`}
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
                    <Trans>Send OTP Code</Trans>
                </Button>
            </form>
        </Form>
    );
}
