import "./globals.css";
import Navigation from "@/components/layout/Navigation/Navigation";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer/Footer";
import { Toaster } from "react-hot-toast";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alightinternational.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alight International — Global Solutions & Premium International Trade",
    template: "%s | Alight International",
  },
  description:
    "Alight International delivers premium global trade solutions, quality-certified products, and reliable cross-border supply chain operations.",
  keywords: [
    "Alight International",
    "global trade",
    "international commerce",
    "quality products",
    "supply chain solutions",
    "custom manufacturing",
    "enterprise distribution",
    "bulk orders",
    "international export",
  ],
  authors: [{ name: "Alight International", url: SITE_URL }],
  creator: "Alight International",
  publisher: "Alight International",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Alight International",
    title: "Alight International — Global Solutions & Premium International Trade",
    description:
      "Delivering premium global trade solutions, quality-certified products, and reliable enterprise distribution worldwide.",
    images: [
      {
        url: `${SITE_URL}/images/alight_logo.svg`,
        width: 1200,
        height: 630,
        alt: "Alight International",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alight International — Global Solutions & Premium International Trade",
    description:
      "Delivering premium global trade solutions, quality-certified products, and reliable enterprise distribution worldwide.",
    images: [`${SITE_URL}/images/alight_logo.svg`],
    creator: "@alightinternational",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alight International",
    url: SITE_URL,
    logo: `${SITE_URL}/images/alight_logo.svg`,
    description:
      "Alight International is a premier global enterprise offering certified products, international distribution, and bespoke corporate supply solutions.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "International",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CurrencyProvider>
              <WishlistProvider>
                <CartProvider>
                  <Navigation />
                  {children}
                  <Footer />
                  <Toaster
                    position="bottom-right"
                    toastOptions={{
                      style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '10px',
                      },
                      success: {
                        iconTheme: {
                          primary: '#ff3e6c',
                          secondary: '#fff',
                        },
                      }
                    }}
                  />
                </CartProvider>
              </WishlistProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
