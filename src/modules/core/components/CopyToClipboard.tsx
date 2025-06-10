import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyToClipboardProps {
    copiedText: string; // The string to copy to clipboard
    viewableText: string; // The string to display
}

export default function CopyToClipboard({
    copiedText,
    viewableText,
}: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copiedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>
                {viewableText}
            </span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleCopy}
                            className='h-6 w-6'
                            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                        >
                            {copied ? (
                                <Check className='h-4 w-4 text-green-500' />
                            ) : (
                                <Copy className='h-4 w-4' />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
