import Link from "next/link";
import Image from "next/image";
import { Chat } from "../types/chat";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "@/components/products/productListing";


import React from 'react';
import { Categories } from "../../dashboard/category/page";
import axios from "axios";

const DescriptionList = ({ description }: any) => {
  // Assuming description is a string with items separated by new lines
  const items = typeof description === 'string'
    ? description.split('\n').filter(item => item.trim() !== '')
    : [];
  return (
    <ul className="list-disc pl-5 text-sm text-black dark:text-white">
      {items.map((item: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
        <li key={index} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  );
};


const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categories | null>(null)

  useEffect(() => {
    fetchCategories()

  }, [])

  const fetchCategories = async () => {
    try {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('/api/category/getCategory');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories()
      console.log(categories)
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Category
      </h4>

      <div>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((pro, key) => (
            <Link
              href="/"
              className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
              key={key}
            >
              <div className="relative h-14 w-14 rounded-full">
                <Image
                  width={56}
                  height={56}
                  src={pro.imgUrl}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />

              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {pro.name}
                  </h5>
                  <p>
                    <span className="text-sm text-black dark:text-white">
                      <DescriptionList description={pro.description} />
                    </span>
                  </p>
                </div>
                <div className="flex h-10 w-[120px] items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">

                    {pro.label}
                  </span>
                </div>

              </div>
            </Link>
          ))
        ) : (<p className='px-4 '>No Categories Available</p>)}
      </div>
    </div>
  );
};

export default ProductCard;
