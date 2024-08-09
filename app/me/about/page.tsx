import MaxWidthWrapper from "@/components/ui/layouts/MaxWidthWrapper";
import React from "react";

const AboutPage = () => {
    return (
        <MaxWidthWrapper>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                            About Us
                        </h1>
                        <p className="font-normal text-base leading-6 text-gray-600 ">
                            Synergy IT is in market to provide the service of Computer Network design LAN and WAN design for running critical corporate sectors like banks, hospitals and government sectors.
                        </p>
                    </div>
                    <div className="w-full lg:w-8/12 ">
                        <img
                            className="w-full h-full"
                            src="../../../images/svg/cctv.jpg"
                            alt="cameras "
                        />
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                            Our Story
                        </h1>
                        <p className="font-normal text-base leading-6 text-gray-600 ">
                            Synergy I.T Solutions PVT.LTD is IT Based Company. It is registered at
                            company Register’s Office, Ministry of Industry, under Service Industry. The head
                            office and service facility are situated at New Baneshwor 10, Kathmandu, which is
                            one of the prime location for business in Nepal.
                            This company was establish with an intention to bring something new unique and
                            modern aspects in the Nepalese IT scenario. We are competitive professional and
                            service oriented
                            Background. IT industry is growing globally at fast pace and to provide best
                            products to customer to meet their expectations is very challenging we are
                            committed to meet the expectations. Since, this is our area of excellence and we
                            are fully confident that we can serve our clients in best possible manner. Our last
                            record of performance proves it. But this is not the stop. As one always thrives for
                            betterment of our company will also advance to serve you again and again.. The
                            best possible ways.

                        </p>
                    </div>

                    <div className="w-full lg:w-8/12 ">
                        <img
                            className="w-full h-full"
                            src="../../../images/svg/alco.jpg"
                            alt="cameras "
                        />
                    </div>

                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default AboutPage;
