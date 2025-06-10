import { LogIn, User, User2 } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetClose } from '@/components/ui/sheet';
import useUserStore from '@/modules/core/stores/userStore';
import { urls } from '@/modules/core/utils/urls';
import { userMenuLinks } from '@/modules/profile/utils/flags';
import { Trans } from '@lingui/react/macro';
import Link from '../../LocalizedLink';

export default function UserSideMenuContent() {
    const userName = useUserStore.use.name();
    const userEmail = useUserStore.use.email();
    const user = useUserStore.getState();

    return (
        <>
            <div className='py-4'>
                {user.isCustomer() ? (
                    <div className='flex items-center space-x-4'>
                        <Avatar>
                            <User2 />
                            <AvatarFallback>
                                {userName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className='space-y-1'>
                            <h3 className='font-medium'>{userName}</h3>
                            <p className='text-sm text-muted-foreground'>
                                {userEmail}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col space-y-2'>
                        <SheetClose asChild>
                            <Button className='w-full' asChild>
                                <Link to={urls.auth.login}>
                                    <LogIn className='mr-2 h-4 w-4' />
                                    <Trans>Login</Trans>
                                </Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button
                                variant='outline'
                                className='w-full'
                                asChild
                            >
                                <Link to={urls.auth.register}>
                                    <User className='mr-2 h-4 w-4' />
                                    <Trans>Register</Trans>
                                </Link>
                            </Button>
                        </SheetClose>
                    </div>
                )}
            </div>

            <Separator />

            <div className='py-4'>
                <nav className='space-y-3'>
                    {userMenuLinks.map((link) => (
                        <SheetClose asChild>
                            <Link
                                key={link.url}
                                to={link.url}
                                className='flex items-center py-2 hover:underline text-lg'
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        </SheetClose>
                    ))}
                </nav>
            </div>
        </>
    );
}
