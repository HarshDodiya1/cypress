import { config } from "@/../config";
import { Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      if (!account || !user) return false;

      try {
        const payload = {
          email: user.email,
          name: user.name,
          oauth_id: account.providerAccountId,
          provider: account.provider,
          image: user.image,
        };

        const response = await fetch(
          `${config.NEXT_PUBLIC_SITE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        if (data?.user) {
          user.id = data.user.id;
          user.name = data.user.name;
          user.token = data.user.token;
          user.image = data.user.image;
          user.provider = account?.provider;
          return true;
        }
        return false;
      } catch (error) {
        console.error("Sign in error:", error);
        if (error instanceof AxiosError) {
          return redirect(`/auth/error?message=what${error.message}`);
        }
        return redirect(
          `/auth/error?message=Something went wrong.please try again!`
        );
        return false;
      }
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: config.GITHUB_CLIENT_ID as string,
      clientSecret: config.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};
