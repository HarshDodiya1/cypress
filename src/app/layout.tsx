import { ThemeProvider } from "@/lib/provider/theme-provider";
import db from "@/lib/supabase/db";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
