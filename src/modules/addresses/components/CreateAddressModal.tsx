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

export default function CreateAddressModal() {
    const { t } = useLingui();
    const isOpen = useAddressesStore.use.createModalIsOpen();
    const [isLoading, setIsLoading] = useState(false);

    function onClose() {
        useAddressesStore.setState({ createModalIsOpen: false });
    }

    async function createAddress(values: AddressFormData) {
        if (isLoading) return;

        setIsLoading(true);

        const response = (await addressApi.create(values).catch((err) => {
            setIsLoading(false);
            parseError(err);
        })) as AxiosResponse;

        setIsLoading(false);

        if (!response?.data?.record) return;

        useAddressesStore.setState({
            list: [response.data.record, ...useAddressesStore.getState().list],
            createModalIsOpen: false,
        });

        toast.success(t`Address created successfully`, {
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
                    <Button type='button' variant='outline' onClick={onClose}>
                        <Trans>Cancel</Trans>
                    </Button>
                    <Button type='submit' form='address-form'>
                        {isLoading && <Loader2 className='mr-2 h-4 w-4' />}
                        <Trans>Create</Trans>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
