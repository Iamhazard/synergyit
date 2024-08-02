

import type { Metadata } from "next";
import "./globals.css";
import { Roboto, IBM_Plex_Serif } from "next/font/google";

import Navbar from "@/components/ui/layouts/Nav/NavBar";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/layouts/Footer";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})
export const metadata: Metadata = {
  title: "Synergy It",
  description: "Leading Tech company of Nepal",
  icons: {
    icon: '/images/synergy-Logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased ",
          `${roboto} ${ibmPlexSerif.variable}`
        )}
      >
        <main className="relative flex flex-col min-h-screen ">

          <Navbar />
          {children}

          <Footer />
        </main>
        <div>


        </div>

      </body>
    </html >
  );
}
