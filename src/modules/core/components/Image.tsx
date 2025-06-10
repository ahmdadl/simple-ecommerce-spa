import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    placeholderColor?: string;
    blurPlaceholder?: boolean;
    onLoad?: () => void;
    onError?: (error: Event) => void;
}

export default function Image({
    src,
    alt,
    className,
    width,
    height,
    placeholderColor = 'gray-200',
    blurPlaceholder = true,
    onLoad,
    onError,
}: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true);
        onError?.(e.nativeEvent);
    };

    return (
        <div
            className={cn(
                'relative inline-block overflow-hidden w-full',
                className
            )}
            style={{
                width: width && `${width}px`,
                height: height && `${height}px`,
            }}
        >
            {/* Placeholder */}
            {!isLoaded && !hasError && (
                <div
                    className={cn(
                        'absolute inset-0 transition-opacity duration-300',
                        blurPlaceholder ? 'blur-sm' : '',
                        `bg-${placeholderColor}`
                    )}
                    style={{ width: '100%', height: '100%' }}
                />
            )}

            {/* Image */}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading='lazy' // Native lazy loading
                className={cn(
                    'object-cover w-full h-full transition-opacity duration-300',
                    isLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={handleLoad}
                onError={handleError}
            />

            {/* Error Fallback */}
            {hasError && (
                <div
                    className={cn(
                        'absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600',
                        'text-sm'
                    )}
                >
                    <span>Failed to load image</span>
                </div>
            )}
        </div>
    );
}
