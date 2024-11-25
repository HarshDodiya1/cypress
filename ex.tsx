import { config } from "@/../config";
import axios, { AxiosError } from "axios";
import { Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  email?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: AuthOptions = {
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
      try {
        const payload = {
          email: user.email!,
          name: user.fullName || user.email?.split("@")[0],
          oauth_id: account?.providerAccountId!,
          provider: account?.provider!,
          image: user?.avatarUrl,
        };

        console.log("this is the payload: ", payload);

        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // console.log("this is the response: ", response);
        const data = await response.json();
        // console.log("This is the data that we got: ", data);
        if (data?.user) {
          user.id = data.user.id;
          user.token = data.user.token;
          user.provider = account?.provider;
          user.fullName = data.user.name;
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
          prompt: "",
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