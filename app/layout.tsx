import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Providers from '@/components/Providers'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: "Hyeonsang Kim — Portfolio",
  description: "Hyeonsang Kim's Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-[#0a0a0f] text-gray-200 antialiased font-pretendard">
        <Providers>
          <Nav />
          <main className="max-w-5xl mx-auto px-6">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
