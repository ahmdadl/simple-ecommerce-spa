import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/react/macro';
import { PlusCircle } from 'lucide-react';
import AddressCard from '../components/AddressCard';
import AddressDeleteAlert from '../components/AddressDeleteAlert';
import CreateAddressModal from '../components/CreateAddressModal';
import EditAddressModal from '../components/EditAddressModal';
import { useAddressesStore } from '../stores/addresses-store';

export default function AddressesPage() {
    const addresses = useAddressesStore.use.list();

    return (
        <>
            <div className='2xl:max-w-5xl mx-auto py-6 px-4 md:px-6'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>
                        <Trans>My Addresses</Trans>
                    </h1>
                    <Button
                        onClick={() =>
                            useAddressesStore.getState().openCreateModal()
                        }
                    >
                        <PlusCircle className='mr-2 h-4 w-4' />
                        <Trans>Add New Address</Trans>
                    </Button>
                </div>

                {!addresses?.length ? (
                    <div className='text-center py-12 flex flex-col items-center justify-center'>
                        <svg
                            className='mx-auto h-24 w-24 text-muted-foreground mb-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' // Box-like base
                            />
                            <circle cx='12' cy='7' r='4' />{' '}
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M9 10h6'
                            />
                        </svg>
                        <h3 className='text-lg font-medium'>
                            <Trans>No addresses found</Trans>
                        </h3>
                        <p className='text-muted-foreground mt-2'>
                            <Trans>Add a new address to get started</Trans>
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {addresses.map((address) => (
                            <AddressCard key={address.id} address={address} />
                        ))}
                    </div>
                )}
            </div>

            <CreateAddressModal />
            <EditAddressModal />
            <AddressDeleteAlert />
        </>
    );
}
