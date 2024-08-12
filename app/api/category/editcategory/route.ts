import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if (req.method == 'PATCH') {
        try {

            const { categoryId, category, categoryImg } = await req.json();

            const categoryCheck = await db.category.findUnique(
                {
                    where: {
                        id: categoryId
                    }
                }
            )
            if (!categoryCheck) {
                return new NextResponse("Category not found", { status: 401 });
            }
            const updatedCategory = await db.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    name: category,
                    image: categoryImg,
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {
            console.log(error)
            return new NextResponse("Error updating category", { status: 500 });
        }



    }
}