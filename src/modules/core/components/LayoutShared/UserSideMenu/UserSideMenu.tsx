import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import useLocaleStore from '@/modules/core/stores/localeStore';
import useNavbarStore from '@/modules/core/stores/navbar-store';
import useUserStore from '@/modules/core/stores/userStore';
import { Trans } from '@lingui/react/macro';
import { X } from 'lucide-react';
import LogOutLink from '../../Header/TopMenu/LogOutLink';
import UserSideMenuContent from './UserSideMenuContent';

export default function UserSideMenu() {
    const isOpened = useNavbarStore.use.isUserMenuOpened();
    const isRtl = useLocaleStore.getState().isRtl;
    useUserStore.use.role();
    const isCustomer = useUserStore.use.isCustomer();

    return (
        <Sheet
            open={isOpened}
            onOpenChange={(opened: boolean) =>
                useNavbarStore.setState({ isUserMenuOpened: opened })
            }
        >
            <SheetContent
                side={isRtl() ? 'left' : 'right'}
                className='flex w-full flex-col sm:max-w-md 2xl:max-w-lg'
            >
                <SheetHeader className='pb-4'>
                    <SheetTitle>
                        <Trans>User Account</Trans>
                    </SheetTitle>
                    <SheetDescription>
                        <Trans>Manage your account and preferences</Trans>
                    </SheetDescription>
                </SheetHeader>

                <div className='px-4'>
                    <UserSideMenuContent />
                </div>

                <SheetFooter>
                    <div className='flex flex-row justify-between items-center gap-4'>
                        {isCustomer() && (
                            <SheetClose asChild>
                                <Button variant='destructive' asChild>
                                    <LogOutLink className='flex items-center gap-2 cursor-pointer text-destructive' />
                                </Button>
                            </SheetClose>
                        )}

                        <SheetClose asChild>
                            <Button variant='secondary'>
                                <X className='h-4 w-4 me-2' />
                                <Trans>Close</Trans>
                            </Button>
                        </SheetClose>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
