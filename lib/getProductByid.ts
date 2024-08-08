
import { db } from '@/lib/db'



const getProductById = async (productId: string) => {
    try {
        const product = await db.product.findUnique({
            where: { id: productId },

        })
        return product

    } catch (error: any) {
        return null

    }
}

export default getProductById