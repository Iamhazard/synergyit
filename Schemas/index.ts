

import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "password is required" }),


});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minium 6 character required" }),
  name: z.string().min(1, { message: "Name  is required" }),
  role: z.enum([UserRole.ADMIN]),

});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minium 6 character required" }),
});


export const CategorySchema = z.object({
  name: z.string(),

})


export const SendMail = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});