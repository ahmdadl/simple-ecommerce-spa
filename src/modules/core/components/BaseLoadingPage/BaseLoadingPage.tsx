import { Loader2 } from 'lucide-react';

export default function BaseLoadingPage({
    message = 'Loading...',
    fullScreen = true,
    overlay = false,
}) {
    const baseClasses = `
    flex flex-col items-center justify-center
    ${fullScreen ? 'min-h-screen' : 'min-h-[400px]'}
    ${overlay ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'bg-white'}
  `;

    return (
        <div className={baseClasses} role='status' aria-live='polite'>
            <div className='relative'>
                {/* Background circles for visual interest */}
                <div className='absolute -inset-10 flex items-center justify-center'>
                    <div className='h-32 w-32 rounded-full bg-blue-100 animate-pulse opacity-70'></div>
                </div>
                <div className='absolute -inset-16 flex items-center justify-center'>
                    <div className='h-48 w-48 rounded-full bg-blue-50 animate-pulse opacity-50 delay-150'></div>
                </div>

                {/* Main loading spinner */}
                <div className='relative flex flex-col items-center justify-center z-10'>
                    <div className='bg-white rounded-full p-4 shadow-lg'>
                        <Loader2
                            size={24}
                            className={`animate-spin text-primary`}
                            aria-hidden='true'
                        />
                    </div>

                    {/* Pulse ring */}
                    <div
                        className='absolute inset-0 animate-ping bg-primary/5 rounded-full opacity-25'
                        style={{ animationDuration: '2s' }}
                    ></div>
                </div>
            </div>

            {/* Loading dots */}
            <div className='flex space-x-2 mt-2'>
                <div
                    className='w-2 h-2 rounded-full bg-blue-600 animate-bounce'
                    style={{ animationDelay: '0ms' }}
                ></div>
                <div
                    className='w-2 h-2 rounded-full bg-blue-600 animate-bounce'
                    style={{ animationDelay: '150ms' }}
                ></div>
                <div
                    className='w-2 h-2 rounded-full bg-blue-600 animate-bounce'
                    style={{ animationDelay: '300ms' }}
                ></div>
            </div>

            <p className='sr-only'>{message}</p>
        </div>
    );
}
