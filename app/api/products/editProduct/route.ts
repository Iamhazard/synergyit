import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if (req.method == 'PATCH') {
        try {

            const { productId, category } = await req.json();

            const categoryCheck = await db.category.findUnique(
                {
                    where: {
                        id: productId
                    }
                }
            )
            if (!categoryCheck) {
                return new NextResponse("Category not found", { status: 401 });
            }
            const updatedCategory = await db.category.update({
                where: {
                    id: productId
                },
                data: {
                    name: category
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {

        }



    }
}