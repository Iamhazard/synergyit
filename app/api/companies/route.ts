import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if (req.method == "POST") {
        try {

            const { userId, name, nameImgUrl, imageUrl
            } = await req.json()

            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            if (!name) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            const newCategory = await db.companies.create({
                data: {
                    name,
                    nameImgUrl,
                    imageUrl,


                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });

        } catch (error) {
            console.log(error)

        }


    }
}