"use server";

import { RegisterSchema } from "@/Schemas";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiled = RegisterSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, role } = validatedFiled.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });



  return { success: "Account Created!" };
};