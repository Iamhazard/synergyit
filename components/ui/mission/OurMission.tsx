import React from "react";
import MaxWidthWrapper from "../layouts/MaxWidthWrapper";
import { Monitor, Server, Video, Wrench } from "lucide-react";
import { GiAutoRepair } from "react-icons/gi";
import { IoHardwareChipOutline } from "react-icons/io5";

const services = [
    {
        icon: Monitor,
        title: "Marketing Of Computers",
        description:
            "Our main objective is to fulfill growing demand for information technology in Nepal.",
    },
    {
        icon: Server,
        title: "Hardware / Software Support",
        description:
            "We provide our customers Maintenance Scheme with Annual this scheme customers can use their hassle free environment.",
    },
    {
        icon: Video,
        title: "Digital Surveillance System",
        description:
            "In today's complex business environment, CCTV can provide the best solution for discouraging the theft and unwanted activity in sensitive areas.",
    },
    {
        icon: Wrench,
        title: "Repair / Maintenance",
        description:
            "We and experienced technicians, fully equipped Lab parts to solve & well stocked spare the problem.",
    },
];

const OurMission = () => {
    return (
        <MaxWidthWrapper>
            <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-4xl xl:max-w-5xl">
                <div className="w-full h-[280px] lg:w-1/2 lg:h-auto">
                    <img
                        className="h-full w-full object-cover"
                        src="https://picsum.photos/id/1018/2000"
                        alt="Winding mountain road"
                    />
                </div>

                <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
                    <div className="flex flex-col p-3 md:px-16">
                        <h2 className="text-md font-medium uppercase text-green-800 lg:text-xl">
                            Our Mission
                        </h2>
                        <p className=" text-md text-wrap antialiased font-thin tracking-normal whitespace-norml decoration-1">
                            Synergy IT was established with the intention to bring something
                            new, unique, and modern aspects to the Nepalese IT scenario. We
                            are a competitive, professional, and service-oriented background.
                        </p>

                        <div className="flex flex-col md:flex-row md:space-x-8 mt-2">
                            <div className="flex items-start space-x-4 mb-8 md:mb-0">
                                <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
                                    <Monitor />
                                </div>
                                <div>
                                    <div className="text-md text-gray-900 font-bold tracking-normal whitespace-norml decoration-1">
                                        Marketing of Computers
                                    </div>
                                    <small className="text-gray-600 mt-4 text-md text-wrap antialiased font-medium tracking-normal whitespace-norml ">
                                        Our main objective is to fulfill the growing demand for
                                        information technology in Nepal.
                                    </small>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
                                    <Server />
                                </div>
                                <div>
                                    <div className="text-md text-gray-900 font-bold tracking-normal whitespace-norml decoration-1">
                                        Digital Surveillance System
                                    </div>
                                    <small className="text-gray-600 mt-4 text-md text-wrap antialiased font-medium tracking-normal whitespace-norml ">
                                        In today's complex business environment, CCTV can provide
                                        the best solution for discouraging theft and unwanted
                                        activity in sensitive areas.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-8 mt-2">
                            <div className="flex items-start space-x-4 mb-8 md:mb-0">
                                <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
                                    <GiAutoRepair />
                                </div>
                                <div>
                                    <div className="text-md text-gray-900 font-bold tracking-normal whitespace-norml decoration-1">
                                        Repair / Maintenance
                                    </div>
                                    <small className="text-gray-600 mt-4 text-md text-wrap antialiased font-medium tracking-normal whitespace-norml ">

                                        We and experienced technicians, fully equipped Lab parts to solve & well stocked spare the problem.
                                    </small>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
                                    <IoHardwareChipOutline />
                                </div>
                                <div>
                                    <div className="text-md text-gray-900 font-bold tracking-normal whitespace-norml decoration-1">
                                        Hardware / Software Support
                                    </div>
                                    <small className="text-gray-600 mt-4 text-md text-wrap antialiased font-medium tracking-normal whitespace-norml ">

                                        We provide our customers Maintenance Scheme with Annual this scheme customers can use their hassle free environment.
                                    </small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default OurMission;
