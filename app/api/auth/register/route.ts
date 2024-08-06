import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    if (req.method === "POST") {
        try {

            const { email, password, name, role, code, urls } = await req.json();

            if (!name || !email || !password || !role || !code) {
                return new NextResponse("Missing required fields", { status: 400 });
            }


            const hashedPassword = await bcrypt.hash(password, 10);


            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return new NextResponse(JSON.stringify({ error: "Email already in use" }), { status: 400 });
            }

            // Validate the code
            if (code !== "ZpbbQR+TD0rToJkTc7wljY3I") {
                return new NextResponse(JSON.stringify({ error: "Invalid code" }), { status: 400 });
            }

            // Create the new user
            await db.user.create({
                data: {
                    name,
                    image: urls.url,
                    email,
                    password: hashedPassword,
                    role,
                    code,
                },
            });

            // Return success response
            return new NextResponse(JSON.stringify({ success: "Account Created!" }), { status: 201 });

        } catch (error) {
            console.error("Registration error:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    } else {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }
};
