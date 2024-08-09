'use client'
import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../../_components/Layouts/DefaultLayout';
import Breadcrumb from '../../_components/Breadcrumbs/Breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import { useEdgeStore } from '@/lib/edgestore';
import Link from 'next/link';
import { Header } from '@/components/ui/layouts/header';
import { Button } from '@/components/ui/MovingButton';
import { DeleteButton } from '../../_components/DeleteButton';
import { ProductState } from '@/@types/enum';

export interface Products {
    id: string;
    slug: string;
    name: string;
    data: ProductState[];
}


interface Category {
    id: string;
    name: string;

}
const Product = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [categoryame, setCategoryName] = useState('');
    const [editCategories, setEditCategories] = useState<ProductState | null>(null);
    const [categoryId, setCategoryId] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Products[]>([]);
    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const { edgestore } = useEdgeStore();
    const [isPending, startTransition] = useTransition();
    if (isSubmitted) {
        return <div className="flex flex-col items-center m-6">COMPLETE!!!</div>;
    }
    if (isCancelled) {
        return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
    }

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

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products/getProduct');
                //console.log(response)
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching Product:', error);
            }
        };

        fetchProduct();
    }, []);






    const handleDeleteClick = () => {

    }

    const submitCategory = async (data: any) => {
        console.log(data)
        setSubmitting(true);
        try {

            const formData = {
                ...data,
                urls
            }
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(formData),
            })
            if (!response.ok) throw new Error("HTTP error " + response.status);
            // console.log(response)

            setSuccessMessage('Products added successfully');
            reset();
        } catch (error) {
            setErrorMessage('Failed to add products');
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Product' />

            <main className="flex mx-auto max-w-[800px] justify-center items-center mt-10">
                <Card className=' py-4 justify-center items-center space-x-5 gap-1 px-4'>
                    <h2>Product</h2>
                    <div>
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select Category
                        </label>
                        <select
                            id="category_id"

                            {...register("category_id", {
                                required: "Category is required",
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Choose a category</option>

                            {categories &&
                                categories.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>

                    </div>
                    <div className="flex flex-col items-center m-6 gap-2">
                        <input
                            type="file"
                            onChange={(e) => {
                                setFile(e.target.files?.[0])
                            }}

                            name="imageUrl"
                            disabled={isPending}
                        />
                        <button
                            className="bg-white rounde px-2 hover:opacity-55"
                            onClick={async () => {
                                if (file) {
                                    const res = await edgestore.mypublicImages.upload({ file })
                                    setUrls({
                                        url: res.url,
                                        thumbnailUrl: res.thumbnailUrl
                                    })
                                }
                            }}
                        >
                            upload
                        </button>
                        {urls?.url && <Link href={urls.url} target="_blank" className="block">
                            <img
                                src={urls.url}
                                alt="Full size image"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                            <span className="mt-2 block text-sm text-center">Full Image</span>
                        </Link>}
                        {/* {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">Thumb</Link>} */}
                    </div>
                    <h1 className='text-gray-600  py-4'>Add Product</h1>
                    <form onSubmit={handleSubmit(submitCategory)} className="px-4 py-4">

                        <div className="flex flex-wrap -mx-3 ">

                            <div className=" md:w-1/2 px-3  md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Product Name
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-1  leading-tight focus:outline-none focus:bg-white"
                                    id="name"
                                    type="text"
                                    placeholder=""
                                    {...register('name', {
                                        required: true,

                                    })}
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
                                    </span>
                                )}
                            </div>
                            <div className=" md:w-1/2 px-3  md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Slug Name
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-1  leading-tight focus:outline-none focus:bg-white"
                                    id="slug"
                                    type="text"
                                    placeholder=""
                                    {...register('slug', {
                                        required: true,

                                    })}
                                />
                                {errors.slug && (
                                    <span className="text-red-600 text-bold">
                                        Invalid Slug name
                                    </span>
                                )}
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 ">

                            <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    label
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded px-1 py-1 leading-tight focus:outline-none focus:bg-white"
                                    id="label"
                                    type="text"
                                    placeholder=""
                                    {...register('label', {
                                        required: true,

                                    })}
                                />
                                {errors.label && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex -mx-3 ">

                            <div className="px-3 w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Description
                                </label>
                                <Textarea
                                    className=" h-[200px] appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded px-1  py-1 leading-tight focus:outline-none focus:bg-white"
                                    id="description"
                                    placeholder=""
                                    {...register('description', {
                                        required: true,

                                    })}
                                />
                                {errors.description && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 space-x-1">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                        {successMessage && <p className="text-green-600">{successMessage}</p>}
                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    </form>
                    <div className='mt-4'>
                        <Header label='Existing Product'></Header>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((c) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {`${c.name}  ${c.slug}`}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setCategoryName(c.name);
                                                setCategoryId(c.id)
                                            }}
                                        >
                                            Edit
                                        </Button>


                                        <DeleteButton label='Delete'
                                            onDelete={async () => handleDeleteClick()}
                                        >

                                        </DeleteButton>
                                    </div>

                                </div>
                            ))
                        ) : (<p className='px-4 '>No Products Available</p>)}

                    </div>

                </Card>
            </main>
        </DefaultLayout>
    );
};

export default Product;