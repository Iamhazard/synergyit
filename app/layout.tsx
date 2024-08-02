import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Providers } from "./provider";


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
          <Providers>
            <div className="main" />
            <Toaster />
            <div className="flex-grow flex-1">{children}</div>
          </Providers>

        </body>

      </html>
    </SessionProvider>
  );
}