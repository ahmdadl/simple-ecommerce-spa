import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/modules/cart/stores/cart-store';
import { Trans } from '@lingui/react/macro';
import CheckoutPaymentMethods from '../CheckoutPaymentMethods';

export default function GuestCheckoutPayments({
    goToNextStep,
    goToPrevStep,
}: {
    goToNextStep: () => void;
    goToPrevStep: () => void;
}) {
    const selectedPaymentMethod = useCartStore.use.selectedPaymentMethod();

    return (
        <Card className='my-3'>
            <CardContent>
                <CheckoutPaymentMethods />
            </CardContent>

            <CardFooter>
                <div className='grid grid-cols-1 md:grid-cols-2 w-full md:space-x-6 space-y-4 text-center md:text-start'>
                    <div>
                        <Button
                            type='button'
                            className='w-full bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            onClick={goToPrevStep}
                        >
                            <Trans>Back to Shipping Address</Trans>
                        </Button>
                    </div>

                    <div>
                        <Button
                            type='button'
                            className='w-full'
                            disabled={!selectedPaymentMethod}
                            onClick={goToNextStep}
                        >
                            <Trans>Review Order</Trans>
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
