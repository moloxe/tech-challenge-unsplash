import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SearchBoxProvider } from "./_hooks/useSearchBox";
import Header from "./_components/Layout/Header";
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
  title: "Tech Challenge",
  description: "Unsplash API Tech Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <SearchBoxProvider>{children}</SearchBoxProvider>
      </body>
    </html>
  );
}
