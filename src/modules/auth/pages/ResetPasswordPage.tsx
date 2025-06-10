import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Trans } from '@lingui/react/macro';
import { ResendPasswordButton } from '../components/ResendPasswordButtonProps';
import ResetPasswordForm from '../components/ResetPasswordForm';

export default function ResetPasswordPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold'>
                        <Trans>Reset Password</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>
                            Enter the otp you received and your new password
                        </Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm />
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <ResendPasswordButton />
                </CardFooter>
            </Card>
        </div>
    );
}
