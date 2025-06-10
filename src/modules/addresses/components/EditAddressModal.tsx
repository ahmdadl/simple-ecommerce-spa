import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans, useLingui } from '@lingui/react/macro';
import { DialogDescription } from '@radix-ui/react-dialog';
import { AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAddressesStore } from '../stores/addresses-store';
import { addressApi } from '../utils/addresses-api';
import AddressForm from './AddressForm';
import { AddressFormData } from './AddressForm/AddressForm';

export default function EditAddressModal() {
    const { t } = useLingui();
    const isOpen = useAddressesStore.use.editModalIsOpen();
    const closeModal = useAddressesStore.use.closeEditModal();
    const [isLoading, setIsLoading] = useState(false);

    function onClose() {
        closeModal();
    }

    async function createAddress(values: AddressFormData) {
        if (isLoading) return;

        setIsLoading(true);

        const response = (await addressApi
            .update(
                useAddressesStore.getState().currentAddress?.id ?? '',
                values
            )
            .catch((err) => parseError(err))) as AxiosResponse;

        setIsLoading(false);

        if (!response?.data?.record) return;

        const updatedList = useAddressesStore.getState().list.map((address) => {
            if (address.id === response.data.record.id) {
                return response.data.record;
            }
            return address;
        });

        useAddressesStore.setState({
            list: [...updatedList],
            editModalIsOpen: false,
            currentAddress: undefined,
        });

        toast.success(t`Address updated successfully`, {
            className: '!bg-green-500 !text-white',
        });
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpened) => !isOpened && onClose()}
        >
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>
                        <Trans>Edit Address</Trans>
                    </DialogTitle>
                </DialogHeader>

                <AddressForm onSave={createAddress} />

                <DialogDescription className='p-0 m-0 h-0'>
                    <span className='sr-only'>
                        <Trans>Edit Address Form</Trans>
                    </span>
                </DialogDescription>
                <DialogFooter>
                    <Button type='button' variant='outline' onClick={onClose}>
                        <Trans>Cancel</Trans>
                    </Button>
                    <Button type='submit' form='address-form'>
                        {isLoading && <Loader2 className='mr-2 h-4 w-4' />}
                        <Trans>Update</Trans>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
