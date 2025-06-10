import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import useLocaleStore from '../../stores/localeStore';
import UserSideMenu from './UserSideMenu';

export default function LayoutShared() {
    const isMobile = useIsMobile();
    const isRtl = useLocaleStore.use.isRtl();

    return (
        <>
            {isMobile && <UserSideMenu />}

            <Toaster position={isRtl() ? 'top-left' : 'top-right'} richColors />
        </>
    );
}
