'use client'
import React, { use } from "react";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../../button";
import Image from "next/image";
import NavItems from "./NavItems"
import { useSession } from "next-auth/react";
import NavMobile from "./MobileNab";

const Navbar = () => {
    const user = null;
    const { data: session } = useSession()
    console.log(session, "logged in user")
    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-300">
                        <div className="flex h-16 items-center">
                            {/* mbl   */}
                            <NavMobile />

                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Image alt="logo" src='/images/synergy-Logo.png' width={150} height={140}
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />


                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (
                                        <Link
                                            href="/me/product"
                                            className={buttonVariants({ variant: "btn" })}>
                                            Products{" "}
                                        </Link>
                                    )}
                                    {user ? null : (
                                        <Link
                                            href="/me/enquires"
                                            className={buttonVariants({ variant: "btn" })}>
                                            Enquiries{" "}
                                        </Link>
                                    )}

                                    <div className="ml-4 flow-root lg:ml-6">
                                        {/* itmes */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </MaxWidthWrapper>
            </header>
        </div>
    );
};

export default Navbar;