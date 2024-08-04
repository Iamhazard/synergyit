import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/layouts/Nav/NavBar";
import Footer from "@/components/ui/layouts/Footer";



const inter = Inter({ subsets: ["latin"] });

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

                <body className={inter.className}>

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