import Image from '@/modules/core/components/Image';
import { useState } from 'react';
import { useProductStore } from '../stores/product-store';

export default function ProductImages() {
    const product = useProductStore.use.record();
    const [activeImage, setActiveImage] = useState(0);

    return (
        <>
            <div className='space-y-4'>
                <div className='overflow-hidden'>
                    <Image
                        src={product.images[activeImage]}
                        alt={product.title}
                        height={400}
                        className='h-full w-full max-w-full object-cover rounded-lg'
                    />
                </div>
                <div className='flex space-x-2'>
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`relative h-20 w-20 overflow-hidden rounded-md border cursor-pointer ${
                                activeImage === index
                                    ? 'ring-2 ring-primary'
                                    : ''
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${product.title} - Image ${index + 1}`}
                                width={80}
                                height={80}
                                className='h-full w-full object-cover'
                            />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
