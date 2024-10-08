
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface IParams {
    userId?: string;
}
export const DELETE = async (req: NextRequest, { params }: { params: IParams }) => {
    const { userId } = params;
    if (req.method === "GET") {
        try {
            const currentUser = await db.user.findUnique({
                where: {
                    id: userId
                },

            });
            if (!currentUser) {
                return new Response("User not found", { status: 404 });
            }

            const deleteUser = await db.category.delete({
                where: { id: userId }
            })
            return new Response(JSON.stringify(deleteUser), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }

}