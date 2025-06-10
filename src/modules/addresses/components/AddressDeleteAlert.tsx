import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { addressesStore, useAddressesStore } from '../stores/addresses-store';
import { addressApi } from '../utils/addresses-api';
import { AddressEntity } from '../utils/types';

export default function AddressDeleteAlert() {
    const { t } = useLingui();
    const isOpen = useAddressesStore.use.deleteModalIsOpen();
    const closeModal = useAddressesStore.use.closeDeleteModal();
    const address = addressesStore((state) => state.currentAddress);

    const [isLoading, setIsLoading] = useState(false);

    async function destroy(address: AddressEntity) {
        if (isLoading) return;

        setIsLoading(true);

        const response = await addressApi.delete(address.id).catch((err) => {
            parseError(err);
        });

        setIsLoading(false);

        if (!response || response.status !== 204) return;

        addressesStore.setState({
            list: addressesStore
                .getState()
                .list.filter((item) => item.id !== address.id),
            currentAddress: undefined,
            deleteModalIsOpen: false,
        });

        toast.success(t`Address deleted successfully`, {
            className: '!bg-green-500 !text-white',
        });
    }

    if (!address) return null;

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(isOpened) => (isOpened ? null : closeModal)}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Trans>Are you absolutely sure?</Trans>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <Trans>Delete {address?.title} address?</Trans>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeModal}>
                        <Trans>Cancel</Trans>
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => destroy(address)}
                        className='bg-red-600 text-white'
                    >
                        {isLoading && (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        <Trans>Delete</Trans>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
