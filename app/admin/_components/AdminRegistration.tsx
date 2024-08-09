
"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { RegisterSchema, UserRole } from "@/Schemas";
import { FormError } from "@/components/ui/layouts/form-error";
import { FormSuccess } from "@/components/ui/layouts/form-success";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/layouts/card-wrapper";
import { Input } from "@chakra-ui/react";
import { useEdgeStore } from "@/lib/edgestore";



const AdminRegistration = () => {
    const params = useSearchParams();
    const callbackUrl = params?.get("callbackUrl");
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Email already used by different providers!"
            : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const role = "ADMIN";
    const route = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            code: "",
            role: role as UserRole,
        },
    });

    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const { edgestore } = useEdgeStore();

    if (isSubmitted) {
        return <div className="flex flex-col items-center m-6">COMPLETE!!!</div>;
    }
    if (isCancelled) {
        return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
    }
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values)
        const formData = {
            ...values,
            urls
        }
        setError("");
        setSuccess("");
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    setSuccess(data.success);
                    route.push("/admin");
                } else {
                    setError(data.error || "An error occurred");
                }
            } catch (error) {
                console.log(error)
            }

        });
    };
    console.log(urls)
    return (
        <CardWrapper
            headerLabel="Admin"
            backButtonLabel="Admin login"
            blackButtonHref="/"
        >
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">


                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Full Name"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Code"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your Password"
                                            {...field}

                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className="px-0 font-normal">
                                        <Link href="/auth/reset">Forgot Password</Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>


                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <Button
                        variant="btn"

                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default AdminRegistration