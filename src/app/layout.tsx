import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Web3ContextProvider from '@/contexts/Web3ContextProvider';
import {ReactNode} from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frontend App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Web3ContextProvider>
        {children}
      </Web3ContextProvider>
      </body>
    </html>
  );
}
