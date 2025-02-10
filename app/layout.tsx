import type { Metadata } from "next";
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
  title: "Sort by Oldest",
  description: "Find YouTube comments that were posted a long time ago",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" sizes="180x180"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f1f1f1] max-w-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
