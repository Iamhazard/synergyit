/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { CategoryState } from '@/@types/enum';
import CardWrapper from '@/components/ui/layouts/card-wrapper';
import { CategorySchema } from '@/Schemas';
import { Header } from '@/components/ui/layouts/header';
import { DeleteButton } from '../../_components/DeleteButton';
import DefaultLayout from '../../_components/Layouts/DefaultLayout';
import Breadcrumb from '../../_components/Breadcrumbs/Breadcrumb';
import { FormError } from '@/components/ui/layouts/form-error';
import { FormSuccess } from '@/components/ui/layouts/form-success';
import { Label } from '@/components/ui/label';
import Image from 'next/image';



export interface Categories {
    data: CategoryState[];
}
const Category = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof CategorySchema>>({
        defaultValues: {
            name: "",

        }
    })
    const [error, setError] = useState<string | undefined>("");
    const [categoryame, setCategoryName] = useState('');
    const [success, setSuccess] = useState<string | undefined>("");
    const [categories, setCategories] = useState<Categories | null>(null)
    const [editCategories, setEditCategories] = useState<CategoryState | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [categoryId, setCategoryId] = useState('')
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
        fetchCategories()

    }, [])

    const fetchCategories = async () => {
        try {
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('/api/category/getcategory');
                    setCategories(response.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

        } catch (error) {
            console.log(error)

        }
    }
    console.log("all category", categories)
    const submitCategory = async (data: any) => {

        setSubmitting(true);

        if (editCategories) {
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('/api/category/getcategory');
                    setCategories(response.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };
            setSuccessMessage('Category updated successfully');
            fetchCategories()
            resetForm();
        } else {
            try {
                const response = await fetch('/api/category/new', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) throw new Error("HTTP error " + response.status);
                //console.log(response)

                setSuccessMessage('Category added successfully');
                fetchCategories()
                resetForm();
            } catch (error) {
                setErrorMessage('Failed to add category');
                console.error('Error:', error);
            } finally {
                setSubmitting(false);
            }
        }

    };
    const resetForm = () => {
        form.reset({
            name: "",
        });
        setEditCategories(null);
        setCategoryId('');
    };

    const handleCancelClick = () => {
        resetForm();
        setEditCategories(null); // Clear the edit state
    };

    const handleDeleteClick = () => {

    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Category' />
            <main className="flex mx-auto max-w-[800px] justify-center items-center">
                <CardWrapper
                    headerLabel='Category'
                    blackButtonHref='/'
                    backButtonLabel='Back home'
                >
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submitCategory)} className="space-y-6">
                                <div className='space-y-4'>

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

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label>{editCategories ? "Update category" : "New Category"}
                                                    {editCategories && (
                                                        <b>:{editCategories.title}</b>
                                                    )}
                                                </label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter category"
                                                        {...field}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}></FormField>
                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <div className='pb-2 flex gap-2'>
                                    <Button
                                        disabled={isPending}
                                        type="submit"
                                        className='py-4'
                                        variant="default">
                                        {editCategories ? 'Update' : 'Create'}
                                    </Button>
                                    <Button variant='destructive' type='submit' onClick={() => handleCancelClick}>Cancel</Button>
                                </div>


                            </form>
                        </Form>
                        <div className='mt-4'>
                            <Header label='Existing category'></Header>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map((c: CategoryState) => (
                                    <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                        <div className='grow'>
                                            {c.title}

                                        </div>
                                        <div className="flex gap-1">

                                            <Button type="button"
                                                onClick={() => {
                                                    setEditCategories(c)
                                                    setCategoryName(c.title);
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
                            ) : (<p className='px-4 '>No Categories Available</p>)}

                        </div>

                    </div>

                </CardWrapper>

            </main>
        </DefaultLayout>

    );
};

export default Category;