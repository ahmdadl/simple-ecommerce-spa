import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Outlet } from '@tanstack/react-router';
import ProfileHeroSection from './ProfileHeroSection';
import { ProfileSidebar } from './ProfileSidebar';

export default function ProfileLayout() {
    return (
        <div className='profile-page'>
            <ProfileHeroSection />

            <SidebarProvider>
                <ProfileSidebar />
                <SidebarInset>
                    <SidebarTrigger />
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
