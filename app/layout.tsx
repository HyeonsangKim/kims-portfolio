import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "I'm Hyeonsang Kim",
  description: "Hyeonsang Kim's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
