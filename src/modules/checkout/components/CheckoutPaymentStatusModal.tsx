import { PaymentStatusModal } from '@/components/ui/payment-status-modal';
import { localizeUrl } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import {
    paymentStatusModalStore,
    usePaymentStatusModalStore,
} from '../stores/payment-status-modal-store';

export default function CheckoutPaymentStatusModal() {
    const { t } = useLingui();
    const navigate = useNavigate();
    const isOpened = usePaymentStatusModalStore.use.isOpened();
    const { type, description } = paymentStatusModalStore.getState();

    const titles = {
        success: t`Payment Successful!`,
        error: t`Payment Failed!`,
        warning: t`Payment Warning!`,
    };

    const descriptions = {
        success: t`Your payment has been processed successfully. A receipt has been sent to your email.`,
        error: t`Your payment has failed. Please try again.`,
        warning: t`Your payment has failed. Please try again.`,
    };

    const buttonTexts = {
        success: t`Continue Shopping`,
        error: t`Try Again`,
        warning: t`Try Again`,
    };

    function setShowSuccess(value: boolean) {
        usePaymentStatusModalStore.setState({ isOpened: value });
    }

    function onButtonClick() {
        setShowSuccess(false);

        if (type === 'success') {
            navigate({
                to: localizeUrl(urls.shop),
            });
        }
    }

    return (
        <PaymentStatusModal
            open={isOpened}
            setOpen={setShowSuccess}
            title={titles[type]}
            description={description ?? descriptions[type]}
            buttonText={buttonTexts[type]}
            type={type}
            onButtonClick={onButtonClick}
        />
    );
}
