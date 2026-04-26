import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Providers from "./Providors";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mustafa's Dashboard",
  description: "this is an experimental dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <Providers>

      <body className="min-h-full h-full flex flex-col">
        <Navbar />
        <div className="flex h-full">
          <div className="hidden md:block h-full w-1/6">
            <Sidebar />
          </div>
          <div className="p-5 w-full md:max-w-285">

        {children}
          </div>
        </div>
      </body>
      </Providers>
    </html>
  );
}
