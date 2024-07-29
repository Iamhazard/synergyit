'use client'

import Link from 'next/link'
import ProductListing from './productListing'
import { TQueryValidator } from '@/lib/validators'
import { GiCctvCamera } from 'react-icons/gi'
import { FireExtinguisherIcon, LaptopIcon } from 'lucide-react'
import { IoAccessibility } from 'react-icons/io5'

interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TQueryValidator
}

const FALLBACK_LIMIT = 4

export interface Product {
    id: string;
    name: string;
    category: string;
    icon: React.ComponentType;
    label?: string;
    url?: string;
    description?: string;
}


const Products: Product[] = [
    {
        id: "123",
        name: "CCTV",
        category: "aa",
        icon: GiCctvCamera,
        label: "ss",
        url: "/images/cc.jpg",
        description:
            "Get your CCTV for Comapny which can provide the best solution for discouraging the theft and unwanted activity in sensitive areas."

    },
    {
        id: "124",
        name: "Computers / Laptops",
        category: "aa",
        icon: LaptopIcon,
        url: "/images/cc.jpg",
        description:
            "Every assets on Our platform is verified by our team to ensure quality standard.Not happy ? We offer a 30-day refund guarantee period.",
    },
    {
        id: "125",
        name: "Access Control",
        category: "aa",
        icon: IoAccessibility,
        url: "/images/cc.jpg",
        description:
            "We provide our customers Maintenance Scheme with Annual this scheme customers can use their hassle free environment.",
    },
    {
        id: "126",
        name: "Fire Extinguisher",
        url: "/images/cc.jpg",
        category: "aa",
        icon: FireExtinguisherIcon,
        description:
            "We provide our customers Maintenance Scheme with Annual this scheme customers can use their hassle free environment.",
    },
];


const ProductReel = (props: ProductReelProps) => {
    const { title, subtitle, href, query } = props

    // const { data: queryResults, isLoading } =
    //     trpc.getInfiniteProducts.useInfiniteQuery(
    //         {
    //             limit: query.limit ?? FALLBACK_LIMIT,
    //             query,
    //         },
    //         {
    //             getNextPageParam: (lastPage: { nextPage: any }) => lastPage.nextPage,
    //         }
    //     )

    // const products = queryResults?.pages.flatMap(
    //     (page: { items: any }) => page.items
    // )

    // let map: (Product | null)[] = []
    // if (products && products.length) {
    //     map = products
    // } else if (isLoading) {
    //     map = new Array<null>(
    //         query.limit ?? FALLBACK_LIMIT
    //     ).fill(null)
    // }

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
                        className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
                        View all Products{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                ) : null}
            </div>

            <div className='relative'>
                <div className='mt-6 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {Products.map((product, i) => (
                            <ProductListing
                                key={`product-${i}`}
                                product={product}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductReel