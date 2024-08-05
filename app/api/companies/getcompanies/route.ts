import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {

    if (req.method == "GET") {
        try {



            const allComapnies = await db.companies.findMany()
            return new Response(JSON.stringify(allComapnies), { status: 201 });

        } catch (error) {
            console.log(error)

        }


    }
}