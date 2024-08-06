
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {

    image: string;


};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}