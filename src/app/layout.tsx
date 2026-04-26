import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Providers from "./Providors";
import { ThemeProvider } from "@/providors/theme-provider.tsx";

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
      suppressHydrationWarning
    >
      <Providers>

      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:block w-64 shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-y-auto bg-muted/20 p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        </ThemeProvider>
      </body>
      </Providers>
    </html>
  );
}
