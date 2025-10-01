import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/types";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          // Mock for testing
          if (
            credentials?.email === "test@example.com" &&
            credentials?.password === "testpass"
          ) {
            return {
              id: "1",
              email: "test@example.com",
              name: "Test User",
              image: null,
              emailVerified: false,
              isActive: true,
              lastLoginAt: null,
              createdAt: null,
              updatedAt: null,
              accessToken: "mock-jwt-token",
              refreshToken: "mock-refresh-token",
            };
          }

          // Real API call
          const res = await fetch("https://api.oluwasetemi.dev/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const data = await res.json();
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            image: data.user.image,
            emailVerified: data.user.emailVerified,
            isActive: data.user.isActive,
            lastLoginAt: data.user.lastLoginAt,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.emailVerified = user.emailVerified;
        token.isActive = user.isActive;
        token.lastLoginAt = user.lastLoginAt;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        if (user.accessToken) {
          try {
            const decoded: { exp: number } = jwtDecode(user.accessToken);
            token.exp = decoded.exp;
          } catch (error) {
            console.error("JWT decode error:", error);
          }
        }
      }
      if (token.accessToken && token.exp && Date.now() > token.exp * 1000) {
        try {
          const res = await fetch("https://api.oluwasetemi.dev/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });
          if (res.ok) {
            const data = await res.json();
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
            const decoded: { exp: number } = jwtDecode(data.accessToken);
            token.exp = decoded.exp;
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? null;
        session.user.image = token.image ?? null;
        session.user.emailVerified = token.emailVerified ?? false;
        session.user.isActive = token.isActive ?? false;
        session.user.lastLoginAt = token.lastLoginAt ?? null;
        session.user.createdAt = token.createdAt ?? null;
        session.user.updatedAt = token.updatedAt ?? null;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  debug: true, // Enable debug logs
};

export default NextAuth(authOptions);
