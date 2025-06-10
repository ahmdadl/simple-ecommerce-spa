import { Button } from '@/components/ui/button';
import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHomeStore } from '../stores/home-store';
import { BannerActionType, BannerEntity } from '../utils/types';

export default function HomeBanners() {
    const banners = useHomeStore.use.banners();

    const [currentBanner, setCurrentBanner] = useState(0);

    const nextBanner = () => {
        setCurrentBanner((prev) =>
            prev === banners.length - 1 ? 0 : prev + 1
        );
    };

    const prevBanner = () => {
        setCurrentBanner((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextBanner();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const bannerAction = (banner: BannerEntity) => {
        if (banner.action === BannerActionType.MEDIA) {
            return (
                <Button
                    size='lg'
                    className='bg-primary hover:bg-primary/90'
                    asChild
                >
                    <Link to={urls.home}>
                        <Trans>Shop Now</Trans>
                    </Link>
                </Button>
            );
        }

        const temp = {
            [BannerActionType.CATEGORY]: {
                url: urls.categories.view(banner.category ?? { slug: '' }),
                label: <Trans>View Category</Trans>,
            },
            [BannerActionType.PRODUCT]: {
                url: urls.products.view(banner.product ?? { slug: '' }),
                label: <Trans>View Product</Trans>,
            },
            [BannerActionType.BRAND]: {
                url: urls.brands.view(banner.brand ?? { slug: '' }),
                label: <Trans>View Brand</Trans>,
            },
        };

        return (
            <Button
                size='lg'
                className='bg-primary hover:bg-primary/90'
                asChild
            >
                <Link to={temp[banner.action].url}>
                    {temp[banner.action].label}
                </Link>
            </Button>
        );
    };

    const banner = banners[currentBanner];

    if (!banner) return null;

    return (
        <section className='relative w-full h-[600px] overflow-hidden'>
            <div className='absolute inset-0 '>
                <img
                    src={banner.media}
                    alt={banner.title}
                    className='w-full object-cover'
                />
            </div>
            {/* <div
                className='absolute inset-0 bg-cover bg-center transition-opacity duration-500'
                style={{ backgroundImage: `url(${banner.media})` }}
            /> */}
            <div className='absolute inset-0 bg-black/40' />
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center text-white px-4 max-w-4xl'>
                    <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                        {banner.title}
                    </h1>
                    <p className='text-xl md:text-2xl mb-8'>
                        {banner.subtitle}
                    </p>
                    {bannerAction(banner)}
                </div>
            </div>
            <Button
                variant='ghost'
                size='icon'
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-12 w-12 rounded-full'
                onClick={prevBanner}
            >
                <ChevronLeft className='h-8 w-8' />
                <span className='sr-only'>Previous banner</span>
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 h-12 w-12 rounded-full'
                onClick={nextBanner}
            >
                <ChevronRight className='h-8 w-8' />
                <span className='sr-only'>Next banner</span>
            </Button>
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentBanner ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentBanner(index)}
                    />
                ))}
            </div>
        </section>
    );
}
