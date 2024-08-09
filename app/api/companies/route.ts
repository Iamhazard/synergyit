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
            if (!urls || typeof urls !== 'object' || !urls.thumbnailUrl || !urls.url) {
                return new NextResponse("Invalid URLs data", { status: 400 });
            }

            const newBrand = await db.companies.create({
                data: {
                    name,
                    thumbnailUrl: urls.thumbnailUrl,
                    imageUrl: urls.url,


                }
            })
            return new Response(JSON.stringify(newBrand), { status: 201 });

        } catch (error) {
            console.log(error)
            return new NextResponse("Internal Server Error", { status: 500 });

        }


    }
}