import { cn } from '@/lib/utils';
import {
    AlertCircle,
    FileWarning,
    FileX,
    ServerCrash,
    Wifi,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ErrorType } from './BaseErrorPage';

interface ErrorIllustrationProps {
    type: ErrorType;
    className?: string;
}

export function ErrorIllustration({ type, className }: ErrorIllustrationProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Start animation after component mount
        setAnimate(true);

        // Restart animation periodically
        const interval = setInterval(() => {
            setAnimate(false);
            setTimeout(() => setAnimate(true), 50);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const iconMap = {
        '404': FileX,
        '500': ServerCrash,
        offline: Wifi,
        forbidden: FileWarning,
        generic: AlertCircle,
    };

    const IconComponent = iconMap[type];

    return (
        <div
            className={cn(
                'relative flex items-center justify-center w-32 h-32 rounded-full',
                'bg-muted text-primary',
                animate && 'animate-in zoom-in-50 duration-500',
                className
            )}
        >
            <IconComponent
                className={cn(
                    'w-16 h-16',
                    animate &&
                        'animate-in slide-in-from-bottom-4 duration-700 delay-300'
                )}
            />
            <div
                className={cn(
                    'absolute w-full h-full rounded-full border-4 border-primary/20',
                    'opacity-0',
                    animate && 'animate-in fade-in duration-700 delay-700'
                )}
            />
            <div
                className={cn(
                    'absolute w-16 h-16 rounded-full bg-primary/5',
                    'opacity-0',
                    animate &&
                        'animate-in fade-in zoom-in duration-1000 delay-500'
                )}
            />
        </div>
    );
}
