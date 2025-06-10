import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CategoriesHeader from '../components/CategoriesHeader';

export function CategorySkeletonPage() {
    const skeletonItems = Array.from({ length: 8 });

    return (
        <>
            <CategoriesHeader />

            <div className='grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {skeletonItems.map((_, index) => (
                    <div
                        key={index}
                        className='group transition-transform hover:scale-[1.02]'
                    >
                        <Card className='h-full overflow-hidden py-0'>
                            <div className='relative aspect-[4/3] w-full overflow-hidden'>
                                <div className='w-full h-full bg-gray-200 animate-pulse' />
                            </div>
                            <CardContent className='p-4'>
                                <div className='h-6 w-3/4 bg-gray-200 animate-pulse mb-2' />
                                <div className='h-4 w-full bg-gray-200 animate-pulse' />
                            </CardContent>
                            <CardFooter className='border-t p-4 pt-3'>
                                <div className='h-4 w-1/4 bg-gray-200 animate-pulse' />
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
