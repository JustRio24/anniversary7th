import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing'
})

export const metadata: Metadata = {
  title: 'Our Love Story - 7th Anniversary',
  description: 'Celebrating 7 years of love since August 8, 2018. A romantic journey through our memories, milestones, and dreams together.',
  keywords: 'anniversary, love story, romance, couple, celebration, memories',
  authors: [{ name: 'Our Love Story' }],
  openGraph: {
    title: 'Our Love Story - 7th Anniversary',
    description: 'Celebrating 7 years of love since August 8, 2018',
    type: 'website',
    images: ['/placeholder.svg?height=630&width=1200'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Love Story - 7th Anniversary',
    description: 'Celebrating 7 years of love since August 8, 2018',
    images: ['/placeholder.svg?height=630&width=1200'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
