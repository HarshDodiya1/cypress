import SessionProvider from "@/lib/provider/session-provider";
import { ThemeProvider } from "@/lib/provider/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import AppStateProvider from "@/lib/provider/state-provider";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseUserProvider } from "@/lib/provider/supabase-user-provider";
import { SocketProvider } from "@/lib/provider/socket-provider";

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
    <html lang="en" suppressHydrationWarning>
      <AppStateProvider>
        <SessionProvider>
          <SupabaseUserProvider>
            <body
              className={twMerge("bg-background", inter.className)}
              suppressHydrationWarning
            >
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <SocketProvider>
                  {children}
                  <Toaster />
                </SocketProvider>
              </ThemeProvider>
            </body>
          </SupabaseUserProvider>
        </SessionProvider>
      </AppStateProvider>
    </html>
  );
}
