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
import { userStore } from '@/modules/core/stores/userStore';
import { parseError } from '@/modules/core/utils/parseError';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { profileApi } from '../utils/profile-api';

const formSchema = z.object({
    name: z.string().min(2, {
        message: i18n._('Name must be at least 2 characters.'),
    }),
    email: z.string().email({
        message: i18n._(`Please enter a valid email address.`),
    }),
    phone: z.string().regex(/^(?:010|011|012)\d{8}$/, {
        message: 'Invalid phone number format. (010-011-012)00000000',
    }),
});

export default function ProfilePage() {
    const user = userStore.getState();
    const { t } = useLingui();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const response = await profileApi.update(values).catch((err) => {
            parseError(err, form);
        });

        setIsLoading(false);

        if (!response) return;

        userStore.setState({ ...response.data.record, role: 'customer' });

        toast.success(t`Profile updated successfully`, {
            className: '!bg-green-500 !text-white',
        });
    }

    return (
        <div className='p-4'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-12'
                >
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Trans>Name</Trans>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t`Name`}
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
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                                            placeholder={
                                                '(010-011-012)000000000'
                                            }
                                            {...field}
                                            disabled={isLoading}
                                            dir='ltr'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        <Trans>Save</Trans>
                    </Button>
                </form>
            </Form>
        </div>
    );
}
