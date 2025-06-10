import { Skeleton } from '@/components/ui/skeleton';
import useUserStore from '@/modules/core/stores/userStore';
import TopMenuUserContent from './TopMenuUserContent';

export default function TopMenuUserSection() {
    const isLoaded = useUserStore.use.isLoaded();

    return (
        <>
            {!isLoaded && (
                <div className='flex items-center space-x-2'>
                    <Skeleton className='h-12 w-12 rounded-full bg-accent-foreground/50' />
                    <div className='space-y-2 hidden lg:flex flex-col'>
                        <Skeleton className='h-4 w-20 bg-accent-foreground/50' />
                        <Skeleton className='h-4 w-40 bg-accent-foreground/50' />
                    </div>
                </div>
            )}

            {isLoaded && <TopMenuUserContent />}
        </>
    );
}
