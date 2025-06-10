import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cartApi } from '@/modules/cart/utils/cart-api';
import { CartItemEntity } from '@/modules/cart/utils/types';
import loadingToast from '@/modules/core/utils/methods';

interface CartItemQuantityProps {
    item: CartItemEntity;
    initialQuantity?: number;
    min?: number;
    max?: number;
    onChange?: (quantity: number) => Promise<any>;
    onRemove?: () => void;
    disabled?: boolean;
}

export default function CartItemQuantity({
    item,
    initialQuantity = item.quantity,
    min = 1,
    max = item.product.stock,
    onChange,
    onRemove,
}: CartItemQuantityProps) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [loading, setLoading] = useState<
        '' | 'increment' | 'decrement' | 'remove'
    >('');

    const disabled = loading?.length > 1;

    async function increment() {
        if (quantity < max) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);

            setLoading('increment');

            loadingToast(cartApi.update(item.id, newQuantity), {
                onFinally: async () => {
                    await onChange?.(newQuantity);

                    setLoading('');
                },
            });
        }
    }

    async function decrement() {
        if (quantity > min) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setLoading('decrement');

            loadingToast(cartApi.update(item.id, newQuantity), {
                onFinally: async () => {
                    await onChange?.(newQuantity);

                    setLoading('');
                },
            });
        }
    }

    async function handleRemove() {
        setLoading('remove');

        loadingToast(cartApi.remove(item.id), {
            onFinally: async () => {
                await onRemove?.();

                setLoading('');
            },
        });
    }

    return (
        <div className='flex items-center' dir='ltr'>
            {quantity > min ? (
                <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-e-none'
                    onClick={decrement}
                    disabled={disabled}
                    aria-label='Decrease quantity'
                >
                    {loading === 'decrement' ? (
                        <Loader2 className='h-3 w-3 animate-spin' />
                    ) : (
                        <Minus className='h-3 w-3' />
                    )}
                </Button>
            ) : (
                <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-e-none'
                    onClick={handleRemove}
                    disabled={disabled}
                    aria-label='Remove item'
                >
                    {loading === 'remove' ? (
                        <Loader2 className='h-3 w-3 animate-spin' />
                    ) : (
                        <Trash2 className='h-3 w-3 text-red-600' />
                    )}
                </Button>
            )}
            <Input
                type='number'
                min={min}
                max={max}
                className='h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                value={quantity}
                // onChange={handleInputChange}
                disabled={disabled}
                aria-label='Quantity'
                readOnly
            />
            <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 rounded-s-none'
                onClick={increment}
                disabled={disabled || quantity >= max}
                aria-label='Increase quantity'
            >
                {loading === 'increment' ? (
                    <Loader2 className='h-3 w-3 animate-spin' />
                ) : (
                    <Plus className='h-3 w-3' />
                )}
            </Button>
        </div>
    );
}
