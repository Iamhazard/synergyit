import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if (req.method == 'PATCH') {
        try {

            const { companiesId, companies } = await req.json();

            const categoryCheck = await db.category.findUnique(
                {
                    where: {
                        id: companiesId
                    }
                }
            )
            if (!categoryCheck) {
                return new NextResponse("Category not found", { status: 401 });
            }
            const updatedCategory = await db.category.update({
                where: {
                    id: companies
                },
                data: {
                    name: companies
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {

        }



    }
}