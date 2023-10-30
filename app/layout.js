import { Montserrat } from 'next/font/google'
import '../styles/global.css'
const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="autumn">
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  )
}
