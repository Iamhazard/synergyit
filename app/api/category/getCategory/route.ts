import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {

    if (req.method == "GET") {
        try {
            const newAllCategoey = await db.category.findMany()
            return new Response(JSON.stringify(newAllCategoey), { status: 201 });

        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ message: "Error" }), { status: 500 });

        }


    }
}