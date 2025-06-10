import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLingui } from '@lingui/react/macro';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function PasswordInput(props: any) {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLingui();

    return (
        <div className='relative'>
            <Input type={showPassword ? 'text' : 'password'} {...props} />
            <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                ) : (
                    <Eye className='h-4 w-4' />
                )}
                <span className='sr-only'>
                    {showPassword ? t`Hide password` : t`Show password`}
                </span>
            </Button>
        </div>
    );
}
