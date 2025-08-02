import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Leaflo - 낙엽이 에너지가 되는 혁신',
  description: '버려지던 낙엽을 고효율 바이오매스 펠릿으로 전환하여 지속가능한 미래를 만들어가는 Leaflo입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
