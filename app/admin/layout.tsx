import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/layouts/Nav/NavBar";
import Footer from "@/components/ui/layouts/Footer";





export const metadata: Metadata = {
    title: "Synergy It",
    description:
        "A",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">

                <body>

                    <div className="main" />
                    <Navbar />
                    <Toaster />
                    <div className="flex-grow flex-1">{children}
                        <Footer />
                    </div>


                </body>

            </html>
        </SessionProvider>
    );
}