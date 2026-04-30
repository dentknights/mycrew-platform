import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyCrew - Your Crew, Your Content, Your Empire',
  description: 'The creator platform with the lowest fees (10%), 90-day free trial, and anti-screenshot protection. Join thousands of creators earning more.',
  keywords: 'creator platform, content monetization, subscriptions, onlyfans alternative, fanvue alternative, creator economy',
  openGraph: {
    title: 'MyCrew - Creator Monetization Platform',
    description: '10% platform fee. 90-day free trial. Anti-screenshot protection.',
    type: 'website',
    url: 'https://mycrew.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
