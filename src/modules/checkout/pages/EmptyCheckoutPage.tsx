import { Button } from '@/components/ui/button';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function EmptyCheckoutPage() {
    return (
        <div className='flex flex-col items-center justify-center py-16 px-4 md:py-24'>
            <div className='relative mb-8 p-4 bg-gray-50 rounded-full'>
                <ShoppingBag
                    className='w-12 h-12 text-gray-400'
                    strokeWidth={1.5}
                />
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-3 text-center'>
                <Trans>Your cart is empty</Trans>
            </h1>

            <p className='text-gray-500 mb-8 max-w-md text-center'>
                <Trans>
                    Looks like you haven't added anything to your cart yet.
                    Continue shopping to find something you'll love.
                </Trans>
            </p>

            <Button asChild>
                <Link to={urls.shop}>
                    <ArrowLeft className='w-4 h-4 mr-2' />
                    <Trans>Continue Shopping</Trans>
                </Link>
            </Button>
        </div>
    );
}
