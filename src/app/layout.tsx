import type { Metadata } from "next";
import { Cart } from "@/components/cart";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white">
          <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
            {/* Logo */}
            <div className="text-xl font-bold">
              NaviCoffee
            </div>
            {/* Navigation Links */}
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="/about" className="hover:text-gray-300">About</a>
              <a href="/login" className="hover:text-gray-300">Login</a>
              <a href="/signup" className="hover:text-gray-300">Sign Up</a>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p className="text-sm">
            © 2025 My Next.js App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
