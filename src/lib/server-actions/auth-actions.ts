"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/lib/email"; // You'll need to create this
import { config } from "../../../config";
import db from "../db/db";

const JWT_SECRET = new TextEncoder().encode(config.JWT_SECRET);
const SALT_ROUNDS = 10;

// Enhanced token generation with more claims
export const generateToken = async (userId: string, email: string) => {
  const token = await new SignJWT({
    userId,
    email,
    type: "access_token",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
};

// Generate verification token
const generateVerificationToken = async (email: string) => {
  const token = await new SignJWT({
    email,
    type: "verification_token",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
};

const setAuthCookie = (token: string) => {
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });
};

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    if (!user) {
      return { error: { message: "Invalid credentials" } };
    }

    if (!user.emailVerified) {
      return { error: { message: "Please verify your email first" } };
    }

    const passwordMatch = bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return { error: { message: "Invalid credentials" } };
    }

    const token = await generateToken(user.id, user.email!);
    setAuthCookie(token);

    return {
      data: {
        user: { ...user, password: undefined },
        session: { access_token: token },
      },
    };
  } catch (error) {
    return { error: { message: "Login failed", error } };
  }
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  try {
    // const existingUser = await db.query.profiles.findFirst({
    //   where: eq(profiles.email, email),
    // });
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return { error: { message: "User already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const verificationToken = await generateVerificationToken(email);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
        emailVerified: false,
      },
    });

    // Send verification email
    await sendVerificationEmail(
      email,
      `${config.NEXT_PUBLIC_SITE_URL}api/auth/verify?token=${verificationToken}`
    );

    return {
      data: {
        user: { ...newUser, password: undefined },
        message: "Verification email sent. Please check your inbox.",
      },
    };
  } catch (error) {
    return { error: { message: "Signup failed", error } };
  }
}

export async function verifyEmail(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const userId = verified.payload.userId as string;

    if (verified.payload.type !== "verification_token") {
      throw new Error("Invalid token type");
    }

    // await db
    //   .update(profiles)
    //   .set({ emailVerified: true })
    //   .where(eq(profiles.email, email));

    await db.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
      },
    });

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    return { error: { message: "Email verification failed", error } };
  }
}

export async function verifyAuth() {
  try {
    const token = cookies().get("auth-token")?.value;

    if (!token) return null;

    const verified = await jwtVerify(token, JWT_SECRET);

    if (verified.payload.type !== "access_token") {
      throw new Error("Invalid token type");
    }

    const userId = verified.payload.userId as string;
    // const user = await db.query.profiles.findFirst({
    //   where: eq(profiles.id, userId),
    // });
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    return user ? { ...user, password: undefined } : null;
  } catch (error) {
    return null;
  }
}
