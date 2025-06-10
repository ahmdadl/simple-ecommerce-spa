import { User } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import LogOutLink from '@/modules/core/components/Header/TopMenu/LogOutLink';
import Link from '@/modules/core/components/LocalizedLink';
import useUserStore from '@/modules/core/stores/userStore';
import { useMatches } from '@tanstack/react-router';
import { profileNavLinks } from '../../utils/flags';

export function ProfileSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const user = useUserStore.getState();
    const matches = useMatches();
    const activeRoute = matches[matches.length - 1];

    return (
        <Sidebar {...props} collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild>
                            <div>
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                    <User className='size-4' />
                                </div>
                                <div className='flex flex-col gap-0.5 leading-none'>
                                    <span className='font-semibold'>
                                        {user.name}
                                    </span>
                                    <p className='text-sm text-muted-foreground'>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <nav className='flex flex-col gap-1 p-2'>
                    {profileNavLinks
                        .filter((link) => !link.hidden)
                        .map((link) => (
                            <SidebarMenuButton
                                asChild
                                className={cn(
                                    'data-[slot=sidebar-menu-button]:!p-1.5',
                                    activeRoute.routeId === link.route &&
                                        'bg-primary hover:bg-primary text-white hover:text-white'
                                )}
                                key={link.route}
                            >
                                <Link to={link.path}>
                                    {link.icon}
                                    {link.name}
                                </Link>
                            </SidebarMenuButton>
                        ))}
                </nav>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant='ghost'
                    className='w-full justify-start gap-2'
                    asChild
                >
                    <LogOutLink />
                </Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
