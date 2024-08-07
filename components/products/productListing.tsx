import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ImageSlider from '../ui/layouts/Slider';
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';

export interface Product {
    id: string;
    name: string;
    slug: string;
    label: string;
    imgUrl: string;
}

interface ProductListingProps {
    product: Product | null;
    index: number;
}

const ProductListing = ({
    product,
    index,
}: ProductListingProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);

        return () => clearTimeout(timer);
    }, [index]);

    if (!product || !isVisible) return <ProductPlaceholder />;

    // Use imgUrl for the image
    const validUrls = product.imgUrl ? [product.imgUrl] : [];

    return (
        <Link
            className={cn(
                'invisible h-full w-full cursor-pointer group/main',
                {
                    'visible animate-in fade-in-5': isVisible,
                }
            )}
            href={`/product/${product.slug}`}>
            <div className='flex flex-col w-full'>
                <ImageSlider urls={validUrls} />
                <h3 className='mt-4 font-medium text-sm text-gray-700'>
                    {product.name}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                    {product.label}
                </p>
            </div>
        </Link>
    );
}

const ProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full' />
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
        </div>
    );
}

export default ProductListing;

// Separate function to fetch products
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('/api/products/getProduct');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};