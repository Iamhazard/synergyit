
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/layouts/MaxWidthWrapper";
import { CheckCircle } from "lucide-react";
import { IoHardwareChip } from "react-icons/io5";
import { GiCctvCamera } from "react-icons/gi";
import Link from "next/link";
import ProductReel from "@/components/products/Products";
import Clients from "@/components/ui/Client";
import Navbar from "@/components/ui/layouts/Nav/NavBar";
import Footer from "@/components/ui/layouts/Footer";


const perks = [
  {
    name: "Digital Surveillance System",
    Icon: GiCctvCamera,
    description:
      "Get your CCTV for Comapny which can provide the best solution for discouraging the theft and unwanted activity in sensitive areas.",
  },
  {
    name: "Guaranteed Quality ",
    Icon: CheckCircle,
    description:
      "Every assets on Our platform is verified by our team to ensure quality standard.Not happy ? We offer a 30-day refund guarantee period. ",
  },
  {
    name: "Hardware / Software Support ",
    Icon: IoHardwareChip,
    description:
      "We provide our customers Maintenance Scheme with Annual this scheme customers can use their hassle free environment. ",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="bgimage">
        <div className="gradient" />
      </div>
      <MaxWidthWrapper>
        <div className="py-[220px] mx-auto text-center flex flex-col items-center max-w-3xl ">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl ">
            Your Marketplace for high-quality {""}
            <span className="text-blue-600">Tech Product </span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-white">
            Synergy IT is in market to provide the service of Computer Network design LAN and WAN design for running critical corporate sectors like banks, hospitals and government sectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 ">
            <Link className={buttonVariants()} href="/me/mission">
              Our Mission{" "}
            </Link>
            <Link href='me/about'>
              <Button variant="btn"> About US &rarr;</Button>
            </Link>
          </div>
        </div>

        {/* product */}
        <div className="">
          <ProductReel
            query={{ sort: 'desc', limit: 4 }}
            href='/me/product'
            title='Our Products'
          />
        </div>
        <div className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
          <div className="max-w-7xl w-full">
            <Clients />
            {/* <OurWorks /> */}
          </div>
        </div>

      </MaxWidthWrapper>
      <section className="border-t border-gray-300 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk, inx) => (
              <div
                key={inx}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 fle justify-betweens">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-900">
                    {<perk.Icon className="w-1/3 h-1/3 " />}
                  </div>
                </div>
                <div className="mt-6  md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </MaxWidthWrapper>

      </section>
      <div><Footer /></div>
    </main>
  );
}