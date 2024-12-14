"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ErrorPage = () => {
  const searchParams: any = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[400px] space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            {error || "Something went wrong during authentication"}
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href="/signup">Try Again</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
