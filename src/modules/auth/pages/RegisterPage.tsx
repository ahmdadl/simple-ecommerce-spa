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
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold'>
                        <Trans>Register</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>
                            Enter your details below to create your account
                        </Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-muted-foreground'>
                        <Trans>Already have an account?</Trans>{' '}
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
