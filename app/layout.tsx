import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/language-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'صرافی آرین | Aryan Exchange',
  description: 'Currency exchange, digital currency trading, money transfer & VISA card services',
  generator: 'v0.app',
  openGraph: {
    title: 'صرافی آرین | Aryan Exchange',
    description: 'ارز دیجیتال، صرافی آنلاین، انتقال پول و کارت ویزا - خدمات جامع مالی در آرین اکسچنج',
    url: 'https://aryan-exchange.com',
    siteName: 'صرافی آرین',
    images: [
      {
        url: '/aryan-exchange-logo-square.png',
        width: 1200,
        height: 1200,
        alt: 'صرافی آرین | Aryan Exchange',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صرافی آرین | Aryan Exchange',
    description: 'ارز دیجیتال، صرافی آنلاین، انتقال پول و کارت ویزا - خدمات جامع مالی در آرین اکسچنج',
    images: ['/aryan-exchange-logo-square.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/aryan-exchange-logo-square-without-bg.png',
        type: 'image/png',
        sizes: 'any',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
