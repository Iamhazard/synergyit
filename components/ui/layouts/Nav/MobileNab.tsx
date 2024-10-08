"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useCycle } from "framer-motion";
import { SideNavItem } from "@/@types/enum";
import { cn } from "@/lib/utils";
import NAV_ITEMS from "./SideNavbarItems";

type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(0px at 100% 0)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

const NavMobile = () => {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    // const { data: session } = useSession();
    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            className={`fixed inset-0 z-50 w-full md:hidden ${isOpen ? "" : "pointer-events-none"
                }`}
            ref={containerRef}>
            <motion.div
                className="absolute inset-0 right-0 w-full bg-white"
                variants={sidebar}
            />
            <motion.ul variants={variants} className="absolute grid w-full gap-3 px-10 py-16">

                {NAV_ITEMS.map((item, idx) => {
                    const isLastItem = idx === NAV_ITEMS.length - 1;
                    return (
                        <div key={idx}>
                            {item.submenu ? (
                                <></>
                            ) : (
                                <MenuItem>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg text-gray-600">{item.icon}</span>
                                        <Link
                                            href={item.path}
                                            onClick={() => toggleOpen()}
                                            className={cn(
                                                item.current
                                                    ? "text-gray-800"
                                                    : "text-gray-600 hover:bg-gray-300 hover:text-black",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                            aria-current={item.current ? "page" : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                </MenuItem>

                            )}
                            {!isLastItem && <MenuItem className="my-3 h-px w-full bg-gray-300" />}
                        </div>
                    );
                })}



            </motion.ul>

            <MenuToggle toggle={toggleOpen} />
        </motion.nav>
    );
};

export default NavMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
    <button
        onClick={toggle}
        className="pointer-events-auto absolute left-1 top-[14px] z-30">
        <svg width="26" height="25" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
);

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuItem = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <motion.li variants={MenuItemVariants} className={className}>

            {children}
        </motion.li>
    );
};



const MenuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
            duration: 0.02,
        },
    },
};

const variants = {
    open: {
        transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
};

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return dimensions.current;
};