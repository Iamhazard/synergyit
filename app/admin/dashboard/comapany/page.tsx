'use client'
import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../../_components/Layouts/DefaultLayout';
import Breadcrumb from '../../_components/Breadcrumbs/Breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Upload } from 'lucide-react';

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
    const [edit, setEdit] = useState(false);
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

            <header className="bg-transparent shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumb pageName='Client' />

                </div>
            </header>
            <main className="flex mx-auto max-w-[800px] justify-center items-center mt-10">

                <Card className=' py-4 justify-center items-center space-x-5 gap-1 px-4'>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Brand</h1>

                    <form onSubmit={handleSubmit(submitCategory)} className="px-4 py-4">
                        <div>
                            <h1 className="text-xl font-medium tracking-tight text-gray-900">Add Brand logo</h1>

                            <div className='bg-gray-600 p-2 rounded-lg'>
                                <div className='px-3'>
                                    <Image className="rounded-lg" src={imagePreview || "/images/cc.jpg"} alt='' width={200} height={250}></Image>
                                </div>
                                <Label>
                                    <Input type='file' className='hidden' id="file-upload" onChange={handleFileChange} />
                                    <span className={buttonVariants({
                                        className:
                                            'mt-3 w-full'
                                    })} >{edit ? 'Uploading...' : 'Upload'}</span>
                                </Label>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Brand title
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white"
                                    id="name"
                                    type="text"
                                    placeholder=""
                                    {...register('name', {
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