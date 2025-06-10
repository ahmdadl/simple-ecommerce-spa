import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import * as React from 'react';

export type PaymentStatusModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description: string;
    buttonText?: string;
    type?: 'success' | 'error' | 'warning';
    onButtonClick?: () => void;
    autoClose?: number; // time in milliseconds
    showIcon?: boolean;
};

const iconVariants = cva(
    'w-16 h-16 mb-4 mx-auto animate-in fade-in-0 zoom-in-95 duration-300',
    {
        variants: {
            type: {
                success: 'text-emerald-500',
                error: 'text-red-500',
                warning: 'text-amber-500',
            },
        },
        defaultVariants: {
            type: 'success',
        },
    }
);

const titleVariants = cva('text-2xl font-semibold text-center mt-2', {
    variants: {
        type: {
            success: 'text-emerald-700 dark:text-emerald-300',
            error: 'text-red-700 dark:text-red-300',
            warning: 'text-amber-700 dark:text-amber-300',
        },
    },
    defaultVariants: {
        type: 'success',
    },
});

const descriptionVariants = cva('text-center text-muted-foreground mt-2', {
    variants: {
        type: {
            success: '',
            error: '',
            warning: '',
        },
    },
    defaultVariants: {
        type: 'success',
    },
});

const buttonVariants = cva('w-full sm:w-auto min-w-[120px] font-medium', {
    variants: {
        type: {
            success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
            error: 'bg-red-500 hover:bg-red-600 text-white',
            warning: 'bg-amber-500 hover:bg-amber-600 text-white',
        },
    },
    defaultVariants: {
        type: 'success',
    },
});

const contentVariants = cva('sm:max-w-[425px] overflow-hidden', {
    variants: {
        type: {
            success: 'border-emerald-200 dark:border-emerald-800',
            error: 'border-red-200 dark:border-red-800',
            warning: 'border-amber-200 dark:border-amber-800',
        },
    },
    defaultVariants: {
        type: 'success',
    },
});

export function PaymentStatusModal({
    open,
    setOpen,
    title,
    description,
    buttonText = 'Continue',
    type = 'success',
    onButtonClick,
    autoClose,
    showIcon = true,
}: PaymentStatusModalProps) {
    React.useEffect(() => {
        if (autoClose && open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [open, setOpen, autoClose]);

    const icons = {
        success: (
            <CheckCircle2
                className={cn(iconVariants({ type }), 'animate-success-check')}
            />
        ),
        error: <AlertCircle className={iconVariants({ type })} />,
        warning: <AlertTriangle className={iconVariants({ type })} />,
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent
                className={cn(
                    contentVariants({ type }),
                    'flex flex-col items-center p-6 gap-4',
                    'animate-in fade-in-0 zoom-in-95 duration-300'
                )}
            >
                {showIcon && icons[type]}
                <AlertDialogHeader className='w-full'>
                    <AlertDialogTitle className={titleVariants({ type })}>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription
                        className={descriptionVariants({ type })}
                    >
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full sm:w-auto flex justify-center mt-4'>
                    <AlertDialogAction
                        onClick={onButtonClick}
                        className={buttonVariants({ type })}
                    >
                        {buttonText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
