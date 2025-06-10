import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import PasswordInput from '@/modules/auth/components/PasswordInput';
import { parseError } from '@/modules/core/utils/parseError';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { profileApi } from '../utils/profile-api';

const formSchema = z
    .object({
        old_password: z.string().min(8, {
            message: i18n._(`Password must be at least 8 characters.`),
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

export default function ChangePasswordPage() {
    const { t } = useLingui();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            old_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const response = await profileApi
            .changePassword(values)
            .catch((err) => {
                parseError(err, form);
            });

        setIsLoading(false);

        if (!response || response.status !== 204) return;

        toast.success(t`Password changed successfully`, {
            className: '!bg-green-500 !text-white',
        });

        form.reset();
    }

    return (
        <div className='p-4 w-full xl:w-1/2 mx-auto'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='old_password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Trans>Current Password</Trans>
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        {...field}
                                        disabled={isLoading}
                                        dir='ltr'
                                    />
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
                                        dir='ltr'
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
                                        dir='ltr'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' className='' disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        <Trans>Change Password</Trans>
                    </Button>
                </form>
            </Form>
        </div>
    );
}
