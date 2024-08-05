
"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { RegisterSchema } from "@/Schemas";
import { FormError } from "@/components/ui/layouts/form-error";
import { FormSuccess } from "@/components/ui/layouts/form-success";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/layouts/card-wrapper";
import { Input } from "@chakra-ui/react";
import { register } from "@/actions/registerAction";
import { UserRole } from "@prisma/client";
import { SingleImageDropzone } from "@/components/ui/layouts/single-imageDropZonefile";
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
            role: role as UserRole,
        },
    });

    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const [progress, setProgress] = useState(0)
    const { edgestore } = useEdgeStore();


    if (isSubmitted) {
        return <div className="flex flex-col items-center m-6">COMPLETE!!!</div>;
    }
    if (isCancelled) {
        return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
    }
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
                if (data.success) {
                    route.push("/admin")

                } else {
                    setError(data.error)
                }

            });
        });
    };
    console.log(urls)
    return (
        <CardWrapper
            headerLabel="Admin"
            backButtonLabel="Admin login"
            blackButtonHref="/"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">

                        <>
                            <div className="flex justify-center items-center">
                                <div>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setFile(e.target.files?.[0]);
                                        }}
                                    />
                                    <div className="h-[6px] w-44 border rounded  mt-6 ">
                                        <Progress value={progress} className="bg-white transition-all duration-150" style={{
                                            width: `${progress}`
                                        }} />
                                    </div>

                                    <button
                                        onClick={async () => {
                                            if (file) {
                                                const res = await edgestore.mypublicImages.upload({
                                                    file,

                                                    onProgressChange: (progress) => {

                                                        setProgress(progress);
                                                    },
                                                });
                                                setUrls({
                                                    url: res.url,
                                                    thumbnailUrl: res.thumbnailUrl,
                                                })
                                                console.log(res);


                                            }
                                        }}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>

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
                        </>

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