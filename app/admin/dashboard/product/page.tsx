'use client'
import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../../_components/Layouts/DefaultLayout';
import Breadcrumb from '../../_components/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Category {
    id: string;
    title: string;
}
const Skills = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            setProductImage(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
            setSelectedFile(selectedFile);
        } else {
            alert("Please select a file!");
        }

        const fileUploadElement = document.getElementById("file-upload")!;
        if (selectedFile) {
            fileUploadElement.textContent = selectedFile.name;
        } else {
            fileUploadElement.textContent = "";
        }
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category/getcategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    //console.log(categories)


    const submitCategory = async (data: any) => {
        setSubmitting(true);
        try {
            // const formData = new FormData();
            // formData.append('title', data.title);
            // formData.append('categoryId', data.category_id);
            // formData.append('category', data.category)

            const response = await fetch('/api/skills/new', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("HTTP error " + response.status);
            // console.log(response)

            setSuccessMessage('skills added successfully');
            reset();
        } catch (error) {
            setErrorMessage('Failed to add skills');
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
                                            {item.title}
                                        </option>
                                    );
                                })}
                        </select>

                    </div>
                    <h1 className='text-gray-600  py-4'>Add Product</h1>
                    <form onSubmit={handleSubmit(submitCategory)} className="px-4 py-4">
                        <div>
                            <div className='bg-gray-600 p-2 rounded-lg'>
                                <div className='px-3'>
                                    <Image className="rounded-lg" src={imagePreview || "/images/cc.jpg"} alt='' width={200} height={250}></Image>
                                </div>
                                <Label>
                                    <Input type='file' className='hidden' id="file-upload" onChange={handleFileChange} />
                                    <span className={buttonVariants({
                                        className:
                                            'mt-3 w-full'
                                    })} >Edit</span>
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">

                            <div className=" md:w-1/2 px-3  md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Product Name
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-1  leading-tight focus:outline-none focus:bg-white"
                                    id="title"
                                    type="text"
                                    placeholder=""
                                    {...register('title', {
                                        required: true,

                                    })}
                                />
                                {errors.title && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
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
                                    id="title"
                                    type="text"
                                    placeholder=""
                                    {...register('title', {
                                        required: true,

                                    })}
                                />
                                {errors.title && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">

                            <div className="px-3 ">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Description
                                </label>
                                <Textarea
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded px-1 py-1 leading-tight focus:outline-none focus:bg-white"
                                    id="title"
                                    placeholder=""
                                    {...register('title', {
                                        required: true,

                                    })}
                                />
                                {errors.title && (
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
                </Card>
            </main>
        </DefaultLayout>
    );
};

export default Skills;