
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

import { LoginSchema } from "@/Schemas";
import { FormError } from "@/components/ui/layouts/form-error";
import { FormSuccess } from "@/components/ui/layouts/form-success";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/layouts/card-wrapper";
import { Input } from "@chakra-ui/react";
import { login } from "@/actions/loginAction";


const Adminlogin = () => {
    const params = useSearchParams();
    const callbackUrl = params?.get("callbackUrl");
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Email already used by different providers!"
            : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);

                    }


                })
                .catch(() => setError("Something went wrong"));
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
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default Adminlogin