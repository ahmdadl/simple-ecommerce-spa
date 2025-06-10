import { Button } from '@/components/ui/button'; // shadcn button
import { Card, CardContent } from '@/components/ui/card'; // shadcn card
import { cn } from '@/lib/utils'; // shadcn utility for classnames
import { Trans, useLingui } from '@lingui/react/macro';
import { File } from 'lucide-react';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { coreApi } from '../../utils/core-api';
import loadingToast from '../../utils/methods';
import { UploadEntity } from '../../utils/types';

interface FileUploadInputProps {
    afterUploaded: (uploadedFile: UploadEntity, file: File) => void;
    className?: string;
    trigger?: React.ReactNode;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
    afterUploaded,
    className,
    trigger,
}) => {
    const { t } = useLingui();
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
    ];

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (!allowedTypes.includes(file.type)) {
                toast.error(t`Only images and PDFs are allowed`);
                return;
            }

            // Create preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreview(e.target?.result as string);
                    setFileType('image');
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                setPreview(null);
                setFileType('pdf');
            }

            // Simulate upload (in real app, this would be an API call)
            loadingToast(async () => {
                const uploadedFile = await coreApi.upload(file);
                if (uploadedFile) {
                    afterUploaded(uploadedFile, file);
                }
            });
        },
        [afterUploaded]
    );

    return (
        <Card
            className={cn(
                'w-full max-w-md bg-transparent shadow-none',
                className
            )}
        >
            <CardContent className='px-0 border-0'>
                <div className='flex flex-col items-start gap-3'>
                    <input
                        type='file'
                        accept='image/jpeg,image/png,image/gif,application/pdf'
                        onChange={handleFileChange}
                        className='hidden'
                        id='file-upload'
                    />
                    <label htmlFor='file-upload'>
                        {trigger ? (
                            trigger
                        ) : (
                            <Button asChild>
                                <span>Choose File</span>
                            </Button>
                        )}
                    </label>

                    {preview && fileType === 'image' && (
                        <div className='mt-4 max-w-36'>
                            <img
                                src={preview}
                                alt='Preview'
                                className='max-w-full h-auto object-cover rounded-md'
                            />
                        </div>
                    )}

                    {fileType === 'pdf' && (
                        <div className='mt-4 flex flex-col items-center'>
                            <File className='w-16 h-16 text-red-500' />
                            <span className='mt-2 text-sm text-muted-foreground'>
                                <Trans>PDF File</Trans>
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default FileUploadInput;
