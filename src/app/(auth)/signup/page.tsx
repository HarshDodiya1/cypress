"use client";
import Logo from "@/../public/cypresslogo.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Github, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(provider);
      console.log("This is the provider that we are sending: ", provider);
      await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="w-full max-w-[400px] space-y-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="cypress Logo" width={50} height={50} />
          <span className="font-semibold dark:text-white text-4xl">
            cypress.
          </span>
        </Link>

        <p className="text-foreground/60">
          An all-In-One Collaboration and Productivity Platform
        </p>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full p-6 flex items-center justify-center space-x-4 hover:bg-accent/30 transition-colors"
            onClick={() => handleOAuthSignIn("google")}
            disabled={!!isLoading}
          >
            {isLoading === "google" ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <FcGoogle className="h-6 w-6" />
            )}
            <span>Continue with Google</span>
          </Button>

          <Button
            variant="outline"
            className="w-full p-6 flex items-center justify-center space-x-4 hover:bg-accent/30 transition-colors"
            onClick={() => handleOAuthSignIn("github")}
            disabled={!!isLoading}
          >
            {isLoading === "github" ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Github className="h-6 w-6" />
            )}
            <span>Continue with GitHub</span>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {codeExchangeError && (
          <Alert variant="destructive">
            <AlertTitle>Invalid Link</AlertTitle>
            <AlertDescription>{codeExchangeError}</AlertDescription>
          </Alert>
        )}

        <div className="text-center">
          <span className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
