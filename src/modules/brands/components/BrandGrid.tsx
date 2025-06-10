import Link from '@/modules/core/components/LocalizedLink';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { ChevronRight } from 'lucide-react';
import { useBrandsStore } from '../stores/brands-store';

export default function BrandGrid() {
    const brands = useBrandsStore.use.records();

    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6'>
            {Boolean(brands?.length) &&
                brands.map((brand) => (
                    <Link
                        key={brand.id}
                        to={urls.brands.view(brand)}
                        className='group block'
                    >
                        <div className='overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md'>
                            <div className='flex h-24 items-center justify-center mb-4'>
                                <img
                                    src={brand.image ?? ''}
                                    alt={`${brand.title} logo`}
                                    className='max-h-full max-w-full object-contain rounded'
                                />
                            </div>
                            <h3 className='text-xl font-semibold'>
                                {brand.title}
                            </h3>
                            <p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
                                {brand.description}
                            </p>
                            <div className='mt-4 flex items-center text-sm font-medium text-primary'>
                                <Trans>
                                    View Products ({brand.products_count})
                                </Trans>
                                <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
