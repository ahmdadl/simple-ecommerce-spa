import { Button } from '@/components/ui/button';
import useLocaleStore from '@/modules/core/stores/localeStore';
import { Trans } from '@lingui/react/macro';
import { useLocation } from '@tanstack/react-router';
import { LanguagesIcon } from 'lucide-react';

export default function TopMenuLangSwitch() {
    const otherLocale = useLocaleStore.use.otherLocale();
    const location = useLocation();

    function toggleLocale() {
        const locale = otherLocale();

        useLocaleStore.setState({
            locale,
        });

        window.location.href = `/${locale}${location.href.substring(3)}`;
    }

    return (
        <Button
            variant={'outline'}
            className='flex items-center hover:text-primary'
            asChild
        >
            <Button variant={'link'} onClick={toggleLocale}>
                <div className='relative'>
                    <LanguagesIcon className='h-5 w-5' />
                </div>
                <span className='ms-1'>
                    {otherLocale() === 'ar' ? (
                        <Trans>arLocale</Trans>
                    ) : (
                        <Trans>enLocale</Trans>
                    )}
                </span>
            </Button>
        </Button>
    );
}
