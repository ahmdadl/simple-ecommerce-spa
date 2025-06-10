import { Button } from '@/components/ui/button';
import { localizeUrl } from '@/modules/core/utils/methods';
import { urls } from '@/modules/core/utils/urls';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useRouter } from '@tanstack/react-router';
import {
    AlertCircle,
    ArrowLeft,
    FileWarning,
    FileX,
    Home,
    RefreshCw,
    ServerCrash,
    Wifi,
} from 'lucide-react';
import { ErrorIllustration } from './ErrorIllustration';

export type ErrorType = '404' | '500' | 'offline' | 'forbidden' | 'generic';

interface ErrorPageProps {
    type?: ErrorType;
    title?: string;
    description?: string;
}

export function BaseErrorPage({
    type = 'generic',
    title: customTitle,
    description: customDescription,
}: ErrorPageProps) {
    const { t } = useLingui();
    const navigate = useNavigate();
    const { history } = useRouter();

    function goHome() {
        navigate({
            to: localizeUrl(urls.home),
        });
    }

    const errorConfig = {
        '404': {
            icon: FileX,
            title: t`Page not found`,
            description: t`Sorry, we couldn't find the page you're looking for.`,
            primaryAction: {
                label: t`Go back home`,
                icon: Home,
                action: () => goHome(),
            },
            secondaryAction: {
                label: t`Go back`,
                icon: ArrowLeft,
                action: () => history.go(-1),
            },
        },
        '500': {
            icon: ServerCrash,
            title: t`Something went wrong`,
            description: t`Sorry, we encountered an error processing your request. Our team has been notified.`,
            primaryAction: {
                label: t`Try again`,
                icon: RefreshCw,
                action: () => window.location.reload(),
            },
            secondaryAction: {
                label: t`Go back home`,
                icon: Home,
                action: () => goHome(),
            },
        },
        offline: {
            icon: Wifi,
            title: t`You are offline`,
            description: t`Please check your internet connection and try again.`,
            primaryAction: {
                label: t`Try again`,
                icon: RefreshCw,
                action: () => window.location.reload(),
            },
        },
        forbidden: {
            icon: FileWarning,
            title: t`Access denied`,
            description: t`Sorry, you don't have permission to access this page.`,
            primaryAction: {
                label: t`Go back home`,
                icon: Home,
                action: () => goHome(),
            },
            secondaryAction: {
                label: t`Go back`,
                icon: ArrowLeft,
                action: () => history.go(-1),
            },
        },
        generic: {
            icon: AlertCircle,
            title: t`Something went wrong`,
            description: t`An unexpected error occurred. Please try again later.`,
            primaryAction: {
                label: t`Try again`,
                icon: RefreshCw,
                action: () => window.location.reload(),
            },
            secondaryAction: {
                label: t`Go back home`,
                icon: Home,
                action: () => goHome(),
            },
        },
    };

    const config = errorConfig[type] as (typeof errorConfig)['generic'];
    const title = customTitle || config.title;
    const description = customDescription || config.description;
    // const Icon = config.icon;

    return (
        <div className=' flex flex-col items-center justify-center px-6 pt-6 pb-16 mx-auto sm:pt-8 sm:pb-24 2xl:max-w-4xl'>
            <div className='flex flex-col items-center text-center'>
                <ErrorIllustration type={type} />
                <h1 className='mt-8 text-3xl font-bold tracking-tight sm:text-5xl'>
                    {title}
                </h1>
                <p className='mt-4 text-base text-muted-foreground max-w-md mx-auto'>
                    {description}
                </p>
                <div className='mt-10 flex flex-col sm:flex-row gap-4'>
                    <Button
                        onClick={config.primaryAction.action}
                        className='flex items-center gap-2 min-w-36'
                    >
                        <config.primaryAction.icon className='h-4 w-4' />
                        {config.primaryAction.label}
                    </Button>
                    {config.secondaryAction && (
                        <Button
                            variant='outline'
                            onClick={config.secondaryAction.action}
                            className='flex items-center gap-2 min-w-36'
                        >
                            <config.secondaryAction.icon className='h-4 w-4' />
                            {config.secondaryAction.label}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
