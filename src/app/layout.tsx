import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "UPA Hub — Platforma pentru Unități Protejate și Incluziune",
    template: "%s | UPA Hub",
  },
  description: "UPA Hub conectează companiile responsabile cu unitățile protejate autorizate și oferă instrumente pentru accesibilitate și incluziune în câmpul muncii.",
  keywords: ["unități protejate", "accesibilitate", "incluziune", "dizabilități", "UPA", "România", "Legea 448"],
  authors: [{ name: "UPA Hub" }],
  openGraph: {
    title: "UPA Hub — Platforma pentru Unități Protejate și Incluziune",
    description: "Conectăm companiile responsabile cu unitățile protejate autorizate.",
    type: "website",
    locale: "ro_RO",
    siteName: "UPA Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPA Hub — Unități Protejate și Incluziune",
    description: "Platforma digitală pentru incluziunea persoanelor cu dizabilități în câmpul muncii.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "UPA Hub",
  "description": "Platforma care conectează companiile responsabile cu unitățile protejate autorizate și instrumentele pentru incluziune.",
  "url": "https://upa-hub.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://upa-hub.vercel.app/unitati-protejate?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#0B1120] text-text dark:text-gray-100 transition-colors duration-300`}>
        <ClientProviders>
          <a href="#main-content" className="skip-link">
            Salt la conținut
          </a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
