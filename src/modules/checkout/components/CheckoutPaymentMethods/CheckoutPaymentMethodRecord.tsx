import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cartStore, useCartStore } from '@/modules/cart/stores/cart-store';
import { PaymentMethodEntity } from '@/modules/cart/utils/types';
import FileUploadInput from '@/modules/core/components/FormFileUploadInput';
import Image from '@/modules/core/components/Image';
import { Trans } from '@lingui/react/macro';
import { Check } from 'lucide-react';

export default function CheckoutPaymentMethodRecord({
    method,
}: {
    method: PaymentMethodEntity;
}) {
    const selectedPayment = useCartStore.use.selectedPaymentMethod();

    function selectPaymentMethod(code: string) {
        useCartStore.setState({ selectedPaymentMethod: code });
    }

    return (
        <>
            <div
                key={method.code}
                className={`flex flex-col cursor-pointer gap-3 border rounded-lg p-4 transition-all duration-500 ${
                    selectedPayment === method.code
                        ? 'border-primary'
                        : 'border-border'
                }`}
                onClick={() => selectPaymentMethod(method.code)}
            >
                <div className='w-full flex items-center space-x-3'>
                    <RadioGroupItem
                        value={method.code}
                        id={`payment-${method.code}`}
                    />
                    <div className='flex items-center gap-2'>
                        <div className='max-w-14'>
                            <Image
                                src={method.image}
                                alt={method.name}
                                className='rounded object-contain'
                            />
                        </div>
                        <Label
                            htmlFor={`payment-${method.code}`}
                            className='font-medium'
                        >
                            <Trans>{method.name}</Trans>
                        </Label>
                    </div>
                    {selectedPayment === method.code && (
                        <div className='ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                            <Check className='h-3 w-3' />
                        </div>
                    )}
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        selectedPayment === method.code
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    {method.code === 'instapay' && (
                        <>
                            <FileUploadInput
                                afterUploaded={(receipt) =>
                                    cartStore.setState({
                                        receipt: receipt.id,
                                    })
                                }
                                className='m-0 p-0 border-0'
                                trigger={
                                    <>
                                        <Button asChild>
                                            <span>
                                                <Trans>
                                                    Upload proof of payment
                                                </Trans>
                                            </span>
                                        </Button>
                                    </>
                                }
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
