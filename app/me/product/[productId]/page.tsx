

import ProductReel from '@/components/products/Products'
import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper'
import ImageSlider from '@/components/ui/layouts/Slider'
import { db } from '@/lib/db'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProductProp {
    id: string;
    name: string;
    slug: string;
    label: string;
    categoryId: string;
    description: string;
    imgUrl: string | string[];
}
interface PageProps {
    params: {
        productId: string
    }
}



const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
]

const ProdutDetailsPage = async ({ params }: PageProps) => {

    const { productId } = params

    const products = await db.product.findUnique({
        where: { id: productId },

    })



    if (!products) return notFound()

    const validUrls = Array.isArray(products.imgUrl) ? products.imgUrl : [products.imgUrl]

    const label = products.label || 'Category'


    return (
        <MaxWidthWrapper className='bg-white'>
            <div className='bg-white'>
                <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                    {/* Product Details */}
                    <div className='lg:max-w-lg lg:self-end'>
                        <ol className='flex items-center space-x-2'>
                            {BREADCRUMBS.map((breadcrumb, i) => (
                                <li key={breadcrumb.href}>
                                    <div className='flex items-center text-sm'>
                                        <Link
                                            href={breadcrumb.href}
                                            className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                                            {breadcrumb.name}
                                        </Link>
                                        {i !== BREADCRUMBS.length - 1 ? (
                                            <svg
                                                viewBox='0 0 20 20'
                                                fill='currentColor'
                                                aria-hidden='true'
                                                className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                                <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                            </svg>
                                        ) : null}
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className='mt-4'>
                            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                {products.name}
                            </h1>
                        </div>

                        <section className='mt-4'>


                            <div className='mt-4 space-y-6'>
                                <ul className='list-disc list-inside text-base text-muted-foreground'>
                                    {products.description.split('\n').map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className='mt-6 flex items-center'>
                                <Check
                                    aria-hidden='true'
                                    className='h-5 w-5 flex-shrink-0 text-green-500'
                                />
                                <p className='ml-2 text-sm text-muted-foreground'>
                                    Instant Setup To your Location.
                                    Send us enquires about the Products.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Product images */}
                    <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
                        <div className='aspect-square rounded-lg'>
                            <ImageSlider urls={validUrls} />
                        </div>
                    </div>

                    {/* add to cart part */}
                    <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
                        <div>
                            {/* <div className='mt-10'>
                            
                            </div> */}
                            <div className='mt-6 text-center'>
                                <div className='group inline-flex text-sm text-medium'>
                                    <Shield
                                        aria-hidden='true'
                                        className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductReel
                href='/products'
                query={{ category: products.categoryId, limit: 4 }}
                title={`Similar ${label}`}
                subtitle={`Browse similar high-quality ${label} just like '${products.name}'`}
            />
        </MaxWidthWrapper>
    )
}

export default ProdutDetailsPage