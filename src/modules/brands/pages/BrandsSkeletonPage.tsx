import BrandsHero from '../components/BrandsHero';

export function BrandsSkeletonPage() {
    const skeletonItems = Array.from({ length: 8 });

    return (
        <>
            <BrandsHero />

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6'>
                {skeletonItems.map((_, index) => (
                    <div key={index} className='group block'>
                        <div className='overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md'>
                            <div className='flex h-24 items-center justify-center mb-4'>
                                <div className='w-20 h-20 bg-gray-200 animate-pulse rounded' />
                            </div>
                            <div className='h-6 w-3/4 bg-gray-200 animate-pulse mb-2' />
                            <div className='space-y-2'>
                                <div className='h-4 w-full bg-gray-200 animate-pulse' />
                                <div className='h-4 w-5/6 bg-gray-200 animate-pulse' />
                                <div className='h-4 w-2/3 bg-gray-200 animate-pulse' />
                            </div>
                            <div className='mt-4 flex items-center'>
                                <div className='h-4 w-1/3 bg-gray-200 animate-pulse' />
                                <div className='ml-1 h-4 w-4 bg-gray-200 animate-pulse rounded-full' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
