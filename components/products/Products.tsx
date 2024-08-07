'use client'

import Link from 'next/link'
import ProductListing, { Product, fetchProducts } from './productListing'
import { TQueryValidator } from '@/lib/validators'
import { useEffect, useState } from 'react'

interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { title, subtitle, href, query } = props

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
            setIsLoading(false);
        };

        loadProducts();
    }, []);

    let displayProducts = products;
    if (query.limit) {
        displayProducts = products.slice(0, query.limit);
    }

    return (
        <section className='py-12'>
            <div className='md:flex md:items-center md:justify-between mb-4'>
                <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                    {title ? (
                        <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                            {title}
                        </h1>
                    ) : null}
                    {subtitle ? (
                        <p className='mt-2 text-sm text-muted-foreground'>
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {href ? (
                    <Link
                        href={href}
                        className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'
                    >
                        View all Products{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                ) : null}
            </div>

            <div className='relative'>
                <div className='mt-6 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {isLoading ? (
                            // Display loading placeholders
                            Array(FALLBACK_LIMIT).fill(null).map((_, i) => (
                                <ProductListing
                                    key={`placeholder-${i}`}
                                    product={null}
                                    index={i}
                                />
                            ))
                        ) : (
                            displayProducts.map((product, i) => (
                                <ProductListing
                                    key={`product-${product.id}`}
                                    product={product}
                                    index={i}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductReel