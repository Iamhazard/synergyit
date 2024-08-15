'use client'
import CategoryReel from '@/components/category/Category'
import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper'
import { PRODUCT_CATEGORIES } from '@/config'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Param = string | string[] | undefined

interface ProductsPageProps {
    searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
    return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({
    searchParams,
}: ProductsPageProps) => {
    const router = useRouter()
    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)
    const [products, setProducts] = useState<ProductsPageProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label

    return (
        <MaxWidthWrapper>
            <CategoryReel
                title={label ?? 'Our Category'}
                query={{
                    category,
                    limit: 40,
                    sort:
                        sort === 'desc' || sort === 'asc'
                            ? sort
                            : undefined,
                }}
            />
        </MaxWidthWrapper>
    )
}

export default ProductsPage