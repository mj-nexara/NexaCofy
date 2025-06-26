import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Nexara Way - One Cup NexaCofy for Every Student",
  description:
    "The Nexara Way: A systematic, humanitarian, and technology-driven pathway. Automatically collect cryptocurrency every hour - Bitcoin, Ethereum, Ripple, USDC. One Cup NexaCofy for Every Student.",
  keywords: [
    "The Nexara Way",
    "Nexara",
    "One Cup NexaCofy",
    "cryptocurrency faucet",
    "free crypto",
    "students",
    "bitcoin",
    "ethereum",
    "ripple",
    "usdc",
    "auto claim",
    "automated earning",
    "coffee money",
    "student financial aid",
    "crypto education",
    "blockchain technology",
  ],
  authors: [{ name: "The Nexara Way Team", url: "https://onecupnexacofy.vercel.app" }],
  creator: "The Nexara Way",
  publisher: "Nexara",
  applicationName: "The Nexara Way",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F59E0B" },
    { media: "(prefers-color-scheme: dark)", color: "#1E293B" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onecupnexacofy.vercel.app",
    siteName: "The Nexara Way",
    title: "The Nexara Way - One Cup NexaCofy for Every Student",
    description:
      "A systematic, humanitarian, and technology-driven pathway for students. Automatically collect cryptocurrency every hour - Bitcoin, Ethereum, Ripple, USDC.",
    images: [
      {
        url: "https://onecupnexacofy.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Nexara Way - One Cup NexaCofy for Every Student",
        type: "image/png",
      },
      {
        url: "https://onecupnexacofy.vercel.app/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "The Nexara Way Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NexaraWay",
    creator: "@NexaraWay",
    title: "The Nexara Way - One Cup NexaCofy for Every Student",
    description:
      "A systematic, humanitarian, and technology-driven pathway. Automatically collect cryptocurrency every hour for students.",
    images: [
      {
        url: "https://onecupnexacofy.vercel.app/twitter-image.png",
        alt: "The Nexara Way - One Cup NexaCofy for Every Student",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "The Nexara Way",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://onecupnexacofy.vercel.app"),
  alternates: {
    canonical: "https://onecupnexacofy.vercel.app",
  },
  category: "technology",
  classification: "Cryptocurrency Education Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="The Nexara Way" />
        <meta name="apple-mobile-web-app-title" content="The Nexara Way" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1E293B" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/nexara-icon.png" as="image" type="image/svg+xml" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "The Nexara Way",
              alternateName: "One Cup NexaCofy",
              description:
                "A systematic, humanitarian, and technology-driven pathway for students to earn cryptocurrency automatically",
              url: "https://onecupnexacofy.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "The Nexara Way Team",
              },
              publisher: {
                "@type": "Organization",
                name: "Nexara",
                logo: {
                  "@type": "ImageObject",
                  url: "https://onecupnexacofy.vercel.app/nexara-icon.png",
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Navigation />
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
