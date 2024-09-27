import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {

    if (req.method == "GET") {
        try {
            const newAllCategoey = await db.product.findMany()
            return new Response(JSON.stringify(newAllCategoey), { status: 201 });

        } catch (error) {
            console.log(error)
            return new NextResponse("Internal Server Error", { status: 500 });

        }


    }
}