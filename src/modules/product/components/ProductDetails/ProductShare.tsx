import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductEntity } from '@/modules/shop/utils/types';
import { Trans } from '@lingui/react/macro';
import { Check, Share } from 'lucide-react';
import { useState } from 'react';

export default function ProductShare({ product }: { product: ProductEntity }) {
    const [copied, setCopied] = useState(false);

    const currentUrl = encodeURIComponent(window.location.href);
    const productName = encodeURIComponent(product.title);

    // Social media share URLs
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${productName}`,
        twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${productName}`,
        whatsapp: `https://api.whatsapp.com/send?text=${productName}%20${currentUrl}`,
    };

    async function copyUrl() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    }

    return (
        <div>
            <p className='text-sm font-medium mb-2'>
                <Trans>Share this product</Trans>
            </p>
            <div className='flex gap-2'>
                <Button
                    variant='outline'
                    size='sm'
                    className='h-8 w-8 p-0'
                    asChild
                >
                    <a
                        href={shareLinks.facebook}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <svg
                            className='h-4 w-4'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                        >
                            <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
                        </svg>
                        <span className='sr-only'>Facebook</span>
                    </a>
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    className='h-8 w-8 p-0'
                    asChild
                >
                    <a
                        href={shareLinks.twitter}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <svg
                            className='h-4 w-4'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                        >
                            <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                        </svg>
                        <span className='sr-only'>Twitter</span>
                    </a>
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    className='h-8 w-8 p-0'
                    asChild
                >
                    <a
                        href={shareLinks.whatsapp}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-whatsapp'
                            viewBox='0 0 16 16'
                        >
                            <path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232' />
                        </svg>

                        <span className='sr-only'>Whatsapp</span>
                    </a>
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                                className='h-8 w-8 p-0'
                                onClick={copyUrl}
                            >
                                {copied ? (
                                    <Check className='h-4 w-4' />
                                ) : (
                                    <Share className='h-4 w-4' />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {copied ? (
                                <Trans>Copied</Trans>
                            ) : (
                                <Trans>Copy URL</Trans>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
