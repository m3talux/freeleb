import type { Metadata } from "next";
import {Inter} from 'next/font/google'
import "./globals.css";


const inter = Inter({weight: ['100', '400', '600', '700','900'], subsets: ['latin']})

export const metadata: Metadata = {
  title: "Freeleb | My Lebanon",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
