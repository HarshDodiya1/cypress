import { NextRequest, NextResponse } from "next/server";
import { verifyEmail, generateToken } from "@/lib/server-actions/auth-actions";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log("this is hte search params", searchParams);
  const token = searchParams.get('token');
  console.log("this is the token", token);
  const requestUrl = new URL(req.url);
  console.log("this is the request url", requestUrl);

  if (!token) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=invalid_token`);
  }

  const result:any = await verifyEmail(token);

  if (result.error) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=verification_failed`);
  }

  // Generate auth token and set cookie
  const authToken = await generateToken(result.user.id, result.user.email);
  cookies().set('auth-token', authToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  });

  // Redirect to dashboard after successful verification
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
