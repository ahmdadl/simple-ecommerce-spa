import { Button } from '@/components/ui/button';
import { parseError } from '@/modules/core/utils/parseError';
import { Trans, useLingui } from '@lingui/react/macro';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForgetPasswordStore } from '../stores/forget-password-store';
import { authApi } from '../utils/auth-api';

export function ResendPasswordButton() {
    const { t } = useLingui();
    const email = useForgetPasswordStore.getState().email;
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(300);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResend = async () => {
        setIsLoading(true);

        await authApi.guest.forgetPassword(email).catch(parseError);

        setCountdown(300);

        setIsLoading(false);
    };

    return (
        <div className='flex flex-col items-center gap-2'>
            <Button
                variant='outline'
                onClick={handleResend}
                disabled={isLoading || countdown > 0}
                className='w-full'
            >
                {isLoading ? (
                    <>
                        <Loader2 className='mr-2 size-4 animate-spin' />
                        <Trans>Sending...</Trans>
                    </>
                ) : countdown > 0 ? (
                    `${t`Resend in`} ${formatTime(countdown)}`
                ) : (
                    t`Resend password reset otp`
                )}
            </Button>
            {email && countdown === 0 && !isLoading && (
                <p className='text-sm text-muted-foreground'>
                    <Trans>
                        Didn't receive an email? Check your spam folder or try
                        again.
                    </Trans>
                </p>
            )}
        </div>
    );
}
