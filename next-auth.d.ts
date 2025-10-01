import { User as CustomUser } from "@/lib/types";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends CustomUser {
    accessToken?: string;
    refreshToken?: string;
  }
  interface Session {
    user: CustomUser & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    emailVerified?: boolean;
    isActive?: boolean;
    lastLoginAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
  }
}
