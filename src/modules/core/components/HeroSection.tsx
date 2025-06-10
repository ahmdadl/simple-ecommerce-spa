// src/components/HeroSection.tsx
import { cn } from '@/lib/utils'; // shadcn utility for className merging
import Link from '@/modules/core/components/LocalizedLink';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface Breadcrumb {
    label: string | React.ReactNode;
    path?: string; // Optional path for links
}

interface HeroSectionProps {
    title: string | React.ReactNode;
    breadcrumbs: Breadcrumb[];
}

export default function HeroSection({ title, breadcrumbs }: HeroSectionProps) {
    const defaultBackgroundImage =
        'https://picsum.photos/seed/01jrkff9ks7hz5jtfz55v3tw5p/1200/100?blur=2';

    return (
        <section
            className='py-4 border-b bg-background'
            style={{
                backgroundImage: `url(${defaultBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='container mx-auto px-4'>
                {/* Overlay to ensure text readability */}
                <div className='bg-background/80 backdrop-blur-sm p-4 rounded-md w-fit min-w-3/4 md:min-w-1/3'>
                    {/* Title */}
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        {title}
                    </h1>

                    {/* Breadcrumbs */}
                    {breadcrumbs.length > 0 && (
                        <nav className='mt-2 flex items-center gap-1 text-sm text-muted-foreground'>
                            {breadcrumbs.map((crumb, index) => (
                                <div
                                    key={crumb.path ?? '' + crumb.label}
                                    className='flex items-center'
                                >
                                    {crumb.path ? (
                                        <Link
                                            to={crumb.path}
                                            className={cn(
                                                'hover:text-foreground transition-colors',
                                                index ===
                                                    breadcrumbs.length - 1 &&
                                                    'text-foreground'
                                            )}
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className={cn(
                                                index ===
                                                    breadcrumbs.length - 1 &&
                                                    'text-foreground'
                                            )}
                                        >
                                            {crumb.label}
                                        </span>
                                    )}
                                    {index < breadcrumbs.length - 1 && (
                                        <ChevronRight className='h-4 w-4 mx-1' />
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </section>
    );
}
