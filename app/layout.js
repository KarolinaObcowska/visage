'use client'
import { Montserrat } from 'next/font/google'
import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'
const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <html lang="en" data-theme="autumn">
        <body className={`${inter.className} h-screen`}>{children}</body>
      </html>
    </SessionProvider>
  )
}
