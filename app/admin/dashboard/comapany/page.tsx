'use client'
import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../../_components/Layouts/DefaultLayout';
import Breadcrumb from '../../_components/Breadcrumbs/Breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Link from 'next/link';
import { useEdgeStore } from '@/lib/edgestore';
import { Header } from '@/components/ui/layouts/header';
import { Button } from '@/components/ui/MovingButton';
import { DeleteButton } from '../../_components/DeleteButton';
import { BrandState } from '@/@types/enum';

interface Category {
    name: any;
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
    const [categoryame, setCategoryName] = useState('');
    const [editCategories, setEditCategories] = useState<BrandState | null>(null);
    const [categoryId, setCategoryId] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [brands, setBrands] = useState<Category[]>([]);
    const [edit, setEdit] = useState(false);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const { edgestore } = useEdgeStore();
    const [isPending, startTransition] = useTransition();



    const handleDeleteClick = () => {

    }

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get('/api/companies/getcompanies');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchBrand();
    }, []);

    //console.log(categories)


    const submitCategory = async (data: any) => {
        setSubmitting(true);
        try {

            const formData = {
                ...data,
                urls
            }
            const response = await fetch('/api/companies', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(formData),
            })
            if (!response.ok) throw new Error("HTTP error " + response.status);
            // console.log(response)

            setSuccessMessage('Brand added successfully');
            reset();
        } catch (error) {
            setErrorMessage('Failed to add Brand');
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
                    <form onSubmit={handleSubmit(submitCategory)} className="px-4 py-4">


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
                                        Invalid companies name
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
                        <Header label='Existing Brand'></Header>
                        {Array.isArray(brands) && brands.length > 0 ? (
                            brands.map((c) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {`${c.name}`}

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
                        ) : (<p className='px-4 '>No Brand Available</p>)}

                    </div>
                </Card>
            </main>
        </DefaultLayout>
    );
};

export default Skills;