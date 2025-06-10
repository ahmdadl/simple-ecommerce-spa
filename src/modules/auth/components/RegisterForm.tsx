import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userStore } from '@/modules/core/stores/userStore';
import { parseError } from '@/modules/core/utils/parseError';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { authApi } from '../utils/auth-api';
import PasswordInput from './PasswordInput';

const formSchema = z
    .object({
        first_name: z.string().min(2, {
            message: i18n._('First name must be at least 2 characters.'),
        }),
        last_name: z.string().min(2, {
            message: i18n._(`Last name must be at least 2 characters.`),
        }),
        email: z.string().email({
            message: i18n._(`Please enter a valid email address.`),
        }),
        phone: z.string().regex(/^(?:010|011|012)\d{8}$/, {
            message: 'Invalid phone number format. (010-011-012)00000000',
        }),
        password: z.string().min(8, {
            message: i18n._(`Password must be at least 8 characters.`),
        }),
        password_confirmation: z.string(),
        terms: z.boolean().refine((val) => val === true, {
            message: i18n._(`You must agree to the terms and conditions.`),
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: i18n._(`Passwords do not match.`),
        path: ['confirmPassword'],
    });

export default function RegisterForm() {
    const { t } = useLingui();
    const { history } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            terms: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const response = await authApi.guest.register(values).catch((err) => {
            parseError(err, form);
        });

        setIsLoading(false);

        if (typeof response === 'string' || !response) return;

        userStore.setState({
            ...response.data.record,
            isLoaded: true,
            role: 'customer',
        });

        setTimeout(() => history.go(-1), 500);

        toast.success(t`Registered successfully`, {
            className: '!bg-green-500 !text-white',
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='first_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Trans>First name</Trans>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t`First name`}
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
                        name='last_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Trans>Last name</Trans>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t`Last name`}
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                                    dir='ltr'
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
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Phone Number</Trans>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={'(010-011-012)000000000'}
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
                <FormField
                    control={form.control}
                    name='terms'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none flex flex-col'>
                                <FormLabel>
                                    <Trans>
                                        I agree to the terms and conditions
                                    </Trans>
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : null}
                    <Trans>Create account</Trans>
                </Button>
            </form>
        </Form>
    );
}
