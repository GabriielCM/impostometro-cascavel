import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { MoneyRain } from '@/components/MoneyRain'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://impostometro-cascavel.vercel.app'),
  title: 'Impostômetro Cascavel | Arrecadação Municipal em Tempo Real',
  description: 'Acompanhe em tempo real quanto o município de Cascavel-PR arrecada em impostos. Dados baseados na LOA 2026 com receita prevista de R$ 2,595 bilhões.',
  keywords: [
    'impostômetro',
    'Cascavel',
    'Paraná',
    'impostos',
    'arrecadação municipal',
    'LOA 2026',
    'transparência fiscal',
    'IPTU',
    'ISS',
    'ITBI',
  ],
  authors: [{ name: 'Impostômetro Cascavel' }],
  creator: 'Impostômetro Cascavel',
  publisher: 'Impostômetro Cascavel',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://impostometro-cascavel.vercel.app',
    siteName: 'Impostômetro Cascavel',
    title: 'Impostômetro Cascavel | Arrecadação Municipal em Tempo Real',
    description: 'Acompanhe em tempo real quanto o município de Cascavel-PR arrecada em impostos. Receita prevista para 2026: R$ 2,595 bilhões.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Impostômetro Cascavel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impostômetro Cascavel | Arrecadação em Tempo Real',
    description: 'Veja quanto Cascavel arrecada em impostos em tempo real. Receita 2026: R$ 2,595 bilhões.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// Google Analytics ID - substituir pelo ID real
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Impostômetro Cascavel',
              description: 'Acompanhe em tempo real a arrecadação municipal de Cascavel-PR.',
              url: 'https://impostometro-cascavel.vercel.app',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
              },
              author: {
                '@type': 'Organization',
                name: 'Impostômetro Cascavel',
              },
              about: {
                '@type': 'GovernmentOrganization',
                name: 'Prefeitura Municipal de Cascavel',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Cascavel',
                  addressRegion: 'PR',
                  addressCountry: 'BR',
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background-dark min-h-screen`}>
        <MoneyRain />
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
