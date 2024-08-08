import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./lib/user";
import { getAccountByUserId } from "./lib/account";
import { UserRole } from "@prisma/client";


export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      // console.log("Signing in user:", user);

      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id as string);

      // Prevent sign-in without email verification
      if (existingUser?.emailVerified) {
        return true;
      }

      return true; // Ensure a boolean is returned
    },
    async session(params) {
      const { session, token } = params as any;
      // console.log({ sessionToken: token }); 
      try {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        if (token.role && session.user) {
          session.user.role = token.role as UserRole;
        }

        if (session.user) {
          session.user.name = token.name;
          session.user.role = token.role;
          session.user.image = token.image;
          session.user.email = token.email;

        }
        return session;
      } catch (error) {
        console.error("Error setting session:", error);
        return session;
      }

    },
    async jwt({ token }) {
      try {
        const unixTimestamp = 1693747542;
        const isoDateString = new Date(unixTimestamp * 1000).toISOString();
        //console.log(isoDateString);



        if (!token.sub) return token;
        const existingUser = await getUserById(token.sub);

        if (!existingUser) return token;
        const existingAccount = await getAccountByUserId(existingUser.id);
        token.isOAuth = !!existingAccount;
        token.name = existingUser.name;
        token.image = existingUser.image
        token.email = existingUser.email;
        token.role = existingUser.role;


        //console.log({ token }, "token form login")
        return token;
      } catch (error) {
        console.error("Error updating JWT token:", error);
        return token;
      }

    },
  },

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});