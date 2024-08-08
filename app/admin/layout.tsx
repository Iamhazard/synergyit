import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/layouts/Nav/NavBar";
import Footer from "@/components/ui/layouts/Footer";





export const metadata: Metadata = {
    title: "Synergy It",
    description:
        "A",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (


        <>
            <div className="main" />

            <Toaster />
            <div className="flex-grow flex-1">{children}

            </div>
        </>


    );
}