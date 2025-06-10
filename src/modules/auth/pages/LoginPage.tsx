import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from '@core/components/LocalizedLink';
import { Trans } from '@lingui/react/macro';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold'>
                        <Trans>Login</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>
                            Enter your email and password to access your account
                        </Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-muted-foreground'>
                        <Trans>Don&apos;t have an account?</Trans>{' '}
                        <Link
                            to='/register'
                            className='text-primary font-medium hover:underline'
                        >
                            <Trans>Sign up</Trans>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
