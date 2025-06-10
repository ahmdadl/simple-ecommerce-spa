import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AddressForm from '@/modules/addresses/components/AddressForm';
import { AddressFormData } from '@/modules/addresses/components/AddressForm/AddressForm';
import { cartApi } from '@/modules/cart/utils/cart-api';
import { Trans, useLingui } from '@lingui/react/macro';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CheckoutAddAddress() {
    const { t } = useLingui();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function onClose() {
        setIsOpen(false);
    }

    async function createAddress(values: AddressFormData) {
        if (isLoading) return;

        setIsLoading(true);

        const data = await cartApi.createAddress(values);

        setIsLoading(false);

        if (!data?.cart) return;

        toast.success(t`Address created successfully`, {
            className: '!bg-green-500 !text-white',
        });

        setIsOpen(false);
    }

    return (
        <>
            <Button
                variant='outline'
                className='mt-4 flex items-center gap-1'
                onClick={() => setIsOpen(true)}
            >
                <Plus className='h-4 w-4' />
                <Trans>Add New Address</Trans>
            </Button>

            <Dialog
                open={isOpen}
                onOpenChange={(isOpened) => !isOpened && onClose()}
            >
                <DialogContent className='sm:max-w-[500px]'>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans>Add New Address</Trans>
                        </DialogTitle>
                    </DialogHeader>

                    <AddressForm onSave={createAddress} />

                    <DialogDescription className='p-0 m-0 h-0'>
                        <span className='sr-only'>
                            <Trans>Address Form</Trans>
                        </span>
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onClose}
                        >
                            <Trans>Cancel</Trans>
                        </Button>
                        <Button type='submit' form='address-form'>
                            {isLoading && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            <Trans>Create</Trans>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
