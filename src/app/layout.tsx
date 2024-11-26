import SessionProvider from "@/lib/provider/session-provider";
import { ThemeProvider } from "@/lib/provider/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import AppStateProvider from "@/lib/provider/state-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Productivity×100",
  description: "All-In-One Collaboration and Productivity Platform",
};

const inter = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log("This is the db: ", db);
  return (
    <html lang="en">
      <AppStateProvider>
        <SessionProvider>
          <body className={twMerge("bg-background", inter.className)}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </SessionProvider>
      </AppStateProvider>
    </html>
  );
}
