
import ProductReel from '@/components/products/Products'
import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper'
import { PRODUCT_CATEGORIES } from '@/config'

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

    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label

    return (
        <MaxWidthWrapper>
            <ProductReel
                title={label ?? 'Products We Used'}
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