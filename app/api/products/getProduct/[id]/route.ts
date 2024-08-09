
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface IParams {
    ProductId?: string;
}
export const GET = async (req: NextRequest, { params }: { params: IParams }) => {
    const { ProductId } = params;
    if (req.method === "GET") {
        try {
            const Product = await db.product.findUnique({
                where: {
                    id: ProductId
                },

            });
            if (!Product) {
                return new Response("Product not found", { status: 404 });
            }
            return new Response(JSON.stringify(Product), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Internal Server Error", { status: 500 });
        }
    } else if (req.method == 'DELETE') {

        const deleteCategory = await db.category.delete({
            where: { id: ProductId }
        })
        return new Response(JSON.stringify(deleteCategory), { status: 200 });

    }

}