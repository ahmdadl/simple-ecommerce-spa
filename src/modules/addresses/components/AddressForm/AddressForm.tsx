import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'; // shadcn form components
import { Input } from '@/components/ui/input';
import { userStore } from '@/modules/core/stores/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, useLingui } from '@lingui/react/macro';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { addressesStore } from '../../stores/addresses-store';

const addressSchema = z.object({
    title: z.string().min(1, i18n._('Address title is required')),
    first_name: z.string().min(1, i18n._('First name is required')),
    last_name: z.string().min(1, i18n._('Last name is required')),
    address: z.string().min(1, i18n._('Detailed address is required')),
    phone: z.string().min(1, i18n._('Phone number is required')),
    email: z.string().email(i18n._('Please enter a valid email')),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressForm({
    onSave,
    isLoading,
    setFormInstance,
}: {
    onSave: SubmitHandler<AddressFormData>;
    isLoading?: boolean;
    setFormInstance?: (form: any) => void;
}) {
    const address = addressesStore((state) => state.currentAddress);

    const { t } = useLingui();
    const user = userStore.getState();

    const [firstName, lastName] = user.name.split(' ');

    const defaultAddressValues: AddressFormData = {
        title: address?.title || '',
        first_name: address?.first_name || firstName,
        last_name: address?.last_name || lastName,
        address: address?.address || '',
        phone: address?.phone || user.phone || '',
        email: address?.email || user.email || '',
    };
    const form = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: defaultAddressValues,
    });

    useEffect(() => {
        if (setFormInstance) {
            setFormInstance(form);
        }
    }, [form, setFormInstance]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className='space-y-4'
                id='address-form'
                noValidate
            >
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='first_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Trans>First Name</Trans>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} required />
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
                                    <Trans>Last Name</Trans>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Address Title</Trans>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={t`e.g. Home, Work`}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Trans>Email Address</Trans>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} required dir='ltr' />
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
                                    <Input {...field} required dir='ltr' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Trans>Detailed Address</Trans>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
