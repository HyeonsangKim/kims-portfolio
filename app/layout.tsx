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
      <body className="bg-[#0a0a0f] text-gray-200 antialiased">
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
