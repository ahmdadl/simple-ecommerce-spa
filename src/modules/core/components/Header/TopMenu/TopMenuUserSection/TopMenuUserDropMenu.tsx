import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserStore from '@/modules/core/stores/userStore';
import { urls } from '@/modules/core/utils/urls';
import { userMenuLinks } from '@/modules/profile/utils/flags';
import Link from '../../../LocalizedLink';
import LogOutLink from '../LogOutLink';

export default function TopMenuUserDropMenu() {
    const userName = useUserStore.use.name();
    const userEmail = useUserStore.use.email();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex items-center gap-2'
                    >
                        <User className='h-5 w-5' />
                        <span className='hidden lg:inline'>{userName}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        <div className='font-medium'>{userName}</div>
                        <div className='text-xs text-muted-foreground'>
                            {userEmail}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuLinks
                        .filter(
                            (link) =>
                                link.url !== urls.profile.wishlist &&
                                link.url !== urls.compareList
                        )
                        .map((link) => (
                            <DropdownMenuItem asChild key={link.url}>
                                <Link
                                    to={link.url}
                                    className='flex items-center gap-2 cursor-pointer w-full rtl:flex-row-reverse'
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <LogOutLink className='flex items-center gap-2 cursor-pointer w-full text-destructive' />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
