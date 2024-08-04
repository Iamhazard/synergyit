
"use client";
import React, { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { LoginSchema, RegisterSchema } from "@/Schemas";
import { FormError } from "@/components/ui/layouts/form-error";
import { FormSuccess } from "@/components/ui/layouts/form-success";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/layouts/card-wrapper";
import { Input } from "@chakra-ui/react";
import { register } from "@/actions/registerAction";
import { UserRole } from "@prisma/client";


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
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            role: role as UserRole,
        },
    });


    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);

            });
        });
    };
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