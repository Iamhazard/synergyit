'use client'

import Link from 'next/link'
import { Category, fetchProducts } from './CategoryListing'
import { TQueryValidator } from '@/lib/validators'
import { useEffect, useState } from 'react'
import CategoryListing from './CategoryListing'
interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const CategoryReel = (props: ProductReelProps) => {
    const [products, setProducts] = useState<Category[]>([]);
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

    console.log(products)

    let displayProducts = products;
    if (query.limit) {
        displayProducts = products.slice(0, query.limit);
    }

    return (
        <section className='py-3'>
            <div className='md:flex md:items-center md:justify-between mb-4'>
                <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0 '>
                    {title ? (
                        <div className='rounded-xl sm:mt-10 px-8 py-2 mt-10 flex'>
                            <h1 className="heading">
                                {title}
                            </h1>

                        </div>


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
                        View all category{' '}
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
                                <CategoryListing
                                    key={`placeholder-${i}`}
                                    product={null}
                                    index={i}
                                />
                            ))
                        ) : (
                            displayProducts.map((product, i) => (
                                <CategoryListing
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

export default CategoryReel