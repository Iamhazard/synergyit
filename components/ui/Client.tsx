"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./layouts/Movingcard";
import axios from "axios";

interface Category {
    imageUrl: string;
    id: number;
    name: string;
    thumbnailUrl: string;
}

const Clients = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/companies/getcompanies');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories');
        }
    };
    console.log(categories)
    const items = categories || [];

    return (
        <section id="testimonials" className="py-6">
            <div className='items-center justify-center bg-green-400 rounded-xl w-fit px-8  py-2 flex'>
                <h1 className="heading">
                    Brands
                    <span className="text-purple"> We Use</span>
                </h1>
            </div>



            <div className="flex flex-col items-center max-lg:mt-6">
                <div
                    className="h-[25vh] md:h-[20rem] rounded-md flex flex-col antialiased items-center justify-center  overflow-hidden"
                >
                    <InfiniteMovingCards
                        items={items.map(cat => ({
                            name: cat.name,
                            thumbnailUrl: cat.thumbnailUrl,
                            image: cat.imageUrl
                        }))}
                        direction="right"
                        speed="fast"
                    />
                </div>

                <div className='bg-sky-400 rounded-xl px-4 py-2 flex pb-2 mb-4'>
                    <h1 className="text-2xl text-purple ">Our Brands</h1>
                </div>


                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : categories ? (
                        categories.map((cat) => (
                            <React.Fragment key={cat.id}>
                                <div className="flex md:max-w-60 max-w-32 gap-2">
                                    {/* <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="md:w-10 w-5"
                                    /> */}
                                    <img
                                        src={cat.thumbnailUrl}
                                        alt={cat.name}
                                        width={cat.id === 4 || cat.id === 5 ? 100 : 150}
                                        className="md:w-24 w-20"
                                    />
                                </div>
                            </React.Fragment>
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Clients;
