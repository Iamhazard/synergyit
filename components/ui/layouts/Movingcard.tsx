"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Item {
    thumbnailUrl: string;
    name: string;
    image: string;
}

interface InfiniteMovingCardsProps {
    items: Item[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: InfiniteMovingCardsProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        addAnimation();
    }, []);

    const addAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            setDirection();
            setSpeed();
            setStart(true);
        }
    };

    const setDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const setSpeed = () => {
        const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
        if (containerRef.current) {
            containerRef.current.style.setProperty("--animation-duration", duration);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_90%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-16 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[90vw] max-w-full relative rounded-2xl border border-b-1 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
                        style={{
                            background: "linear-gradient(90deg, rgba(2,0,36,1) 1%, rgba(82,82,246,1) 35%, rgba(0,212,255,1) 84%)",
                            backgroundBlendMode: 'overlay',
                        }}
                        key={idx}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            {/* <span className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                                {item.image}
                            </span> */}
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <div className="me-3">
                                    <img src={item.thumbnailUrl} alt={`Profile of ${item.name}`} />
                                </div>
                                <span className="flex flex-col gap-1">
                                    <span className="text-xl font-bold leading-[1.6] text-white">
                                        {item.name}
                                    </span>
                                    {/* <span className="text-sm leading-[1.6] text-white-200 font-normal">
                                        {item.title}
                                    </span> */}
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
