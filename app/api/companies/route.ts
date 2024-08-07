import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if (req.method == "POST") {
        try {

            const { name, urls
            } = await req.json()



            if (!name) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            const newCategory = await db.companies.create({
                data: {
                    name,
                    thumbnailUrl: urls.thumbnailUrl,
                    imageUrl: urls.url,


                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });

        } catch (error) {
            console.log(error)

        }


    }
}