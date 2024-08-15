
import { db } from '@/lib/db'



const getProductById = async (productId: string) => {


    try {

        if (!productId) {
            console.log(`No product found with id: ${productId}`);
            return null
        }

        const conversation = await db.product.findUnique({
            where: { id: productId },

        })
        return conversation

    } catch (error: any) {
        console.error(`Error fetching product with id ${productId}:`, error);
        throw error;
    }
}

export default getProductById