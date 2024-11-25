import { config } from "@/../config";
import db from "@/lib/db/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface LoginData {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image?: string;
}

export async function POST(request: Request) {
  try {
    const data: LoginData = await request.json();

    if (!data.email || !data.oauth_id || !data.provider) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let user = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { oauth_id: data.oauth_id }],
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          oauth_id: data.oauth_id,
          provider: data.provider,
          image: data.image || null,
        },
      });
    } else {
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: data.name,
          image: data.image || user.image,
          provider: data.provider,
          oauth_id: data.oauth_id,
        },
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        provider: user.provider,
      },
      config.JWT_SECRET as string,
      { expiresIn: "365d" }
    );

    return NextResponse.json({
      message: "Logged in successfully!",
      user: {
        ...user,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
