import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ImageSlider from '../ui/layouts/Slider';
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';

export interface Category {
    id: string;
    name: string;
    slug: string;
    label: string;
    image: string;
    value: string;
    description: string;
}

interface ProductListingProps {
    product: Category | null;
    index: number;

}

const CategoryListing = ({
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

    if (!product || !isVisible) return <CategoryPlaceholder />;

    // Use imgUrl for the image
    const validUrls = product.image ? [product.image] : [];

    return (
        <Link
            className={cn(
                'invisible h-full w-full cursor-pointer group/main',
                {
                    'visible animate-in fade-in-5': isVisible,
                }
            )}
            href={`/product/${product.id}`}>
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

const CategoryPlaceholder = () => {
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

export default CategoryListing;

// Separate function to fetch products
export const fetchProducts = async (): Promise<Category[]> => {
    try {
        const response = await axios.get('/api/category/getCategory');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};