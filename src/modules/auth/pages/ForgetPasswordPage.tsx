import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { urls } from '@/modules/core/utils/urls';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';
import ForgetPasswordForm from '../components/ForgetPasswordForm';

export default function ForgetPasswordPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold'>
                        <Trans>Forget Password</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>
                            Enter your email address and we'll send an otp to
                            reset your password
                        </Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgetPasswordForm />
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-muted-foreground'>
                        <Trans>Back to</Trans>{' '}
                        <Link
                            to={urls.auth.login}
                            className='text-primary font-medium hover:underline'
                        >
                            <Trans>log in</Trans>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
