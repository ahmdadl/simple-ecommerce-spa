import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

export default function ProductCardSkeleton() {
    return (
        <Card className='overflow-hidden h-full flex flex-col gap-2 pb-6 pt-0'>
            <div className='relative'>
                {/* Skeleton for Product Image */}
                <Skeleton className='h-48 w-full' />

                {/* Skeleton for Badges */}
                <div className='absolute top-2 left-2 flex flex-col gap-1'>
                    <Skeleton className='h-5 w-12' /> {/* New badge */}
                    <Skeleton className='h-5 w-10' /> {/* Discount badge */}
                </div>

                {/* Skeleton for Wishlist Button */}
                <Button
                    variant='outline'
                    size='icon'
                    className='absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm'
                    disabled
                >
                    <Heart className='h-4 w-4' />
                    <span className='sr-only'>Add to wishlist</span>
                </Button>
            </div>

            <CardContent className='flex-grow'>
                {/* Skeleton for Product Category */}
                <Skeleton className='h-4 w-1/3 mt-2' />
                {/* Skeleton for Product Name */}
                <Skeleton className='h-5 w-3/4 mt-2' />
                <Skeleton className='h-5 w-2/3 mt-1' />{' '}
                {/* Two lines for line-clamp-2 */}
                {/* Skeleton for Product Price */}
                <div className='mt-2 flex items-center gap-2'>
                    <Skeleton className='h-6 w-16' /> {/* Price */}
                    <Skeleton className='h-4 w-12' /> {/* Discounted price */}
                </div>
            </CardContent>

            <CardFooter className='pt-0'>
                {/* Skeleton for Add to Cart Button */}
                <Skeleton className='h-10 w-full' />
            </CardFooter>
        </Card>
    );
}
