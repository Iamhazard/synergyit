"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../_components/css/satoshi.css"
import "../_components/css/style.css"
import React, { useEffect, useState } from "react";
import DefaultLayout from "../_components/Layouts/DefaultLayout";
import Loader from "../_components/Loader";



const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <section className="dark:bg-boxdark-2 dark:text-bodydark">
          <>
            {loading ? <Loader /> : children}
          </>

        </section>
      </body>
    </html>
  );
}
export default RootLayout