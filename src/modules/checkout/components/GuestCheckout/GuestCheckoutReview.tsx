import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { cartStore } from '@/modules/cart/stores/cart-store';
import Image from '@/modules/core/components/Image';
import { Trans } from '@lingui/react/macro';
import { Edit } from 'lucide-react';
import { GuestCheckoutStep } from '../../utils/types';
import GuestCheckoutPlaceOrderButton from './GuestCheckoutPlaceOrderButton';

export default function GuestCheckoutReview({
    setCurrentStep,
}: {
    setCurrentStep: any;
}) {
    const address = cartStore.getState().selectedAddress;
    const paymentMethod = cartStore
        .getState()
        .paymentMethods?.find(
            (method) =>
                method.code === cartStore.getState().selectedPaymentMethod
        );

    console.log(address, paymentMethod);

    return (
        <Card className='my-3'>
            <CardHeader>
                <h2 className='text-xl font-semibold'>
                    <Trans>Review Order</Trans>
                </h2>
            </CardHeader>

            <CardContent>
                <div className='flex flex-col gap-3'>
                    <div className='bg-white rounded-lg shadow-sm p-6 mb-8 transition-all'>
                        <div className='space-y-6'>
                            <div>
                                <h3 className='text-base font-medium text-gray-900 mb-2'>
                                    <Trans>Shipping Address</Trans>
                                </h3>

                                {address && (
                                    <>
                                        <div className='flex flex-row items-center justify-start gap-8 mb-3'>
                                            <p>{address.title}</p>

                                            <Button
                                                variant={'link'}
                                                className='text-sm font-medium'
                                                onClick={() =>
                                                    setCurrentStep(
                                                        GuestCheckoutStep.SHIPPING
                                                    )
                                                }
                                            >
                                                <Edit className='mr-2 h-4 w-4' />
                                                <Trans>Edit</Trans>
                                            </Button>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className='font-medium'>
                                                {address.first_name}{' '}
                                                {address.last_name}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {address.address}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {address.city.title},{' '}
                                                {address.government.title}
                                            </p>
                                            <p className='text-sm'>
                                                {address.phone}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div>
                                <h3 className='text-base font-medium mb-2'>
                                    <Trans>Payment Method</Trans>
                                </h3>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src={paymentMethod?.image ?? ''}
                                        alt={paymentMethod?.name ?? ''}
                                        width={32}
                                        height={32}
                                    />
                                    <p>{paymentMethod?.name}</p>

                                    <Button
                                        variant={'link'}
                                        className='text-sm font-medium'
                                        onClick={() =>
                                            setCurrentStep(
                                                GuestCheckoutStep.PAYMENT
                                            )
                                        }
                                    >
                                        <Edit className='mr-2 h-4 w-4' />
                                        <Trans>Edit</Trans>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <GuestCheckoutPlaceOrderButton />
            </CardFooter>
        </Card>
    );
}
