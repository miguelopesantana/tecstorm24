import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Hedit",
  description: "Automated Medical appointment Documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen flex flex-col bg-background font-sans antialiased overflow-x-hidden",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html >
  );
}
