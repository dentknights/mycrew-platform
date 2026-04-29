import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'

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
        <AuthProvider>
          <div className="flex min-h-screen bg-black">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-0 md:ml-[240px]">
              <Header />
              <main className="flex-1 pt-16">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
