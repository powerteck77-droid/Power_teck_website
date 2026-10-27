import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/siteConfig';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.companyName} | Leading Home Appliances & Electronics Manufacturer`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.description,
  keywords: [
    'Air Coolers Manufacturer India',
    'Ceiling Fans Manufacturer Delhi',
    'BLDC Fans Energy Saving',
    'Mixer Grinders Manufacturer',
    'Kitchen Chimneys India',
    'OEM Appliance Manufacturing',
    'Powerteck Appliances',
  ],
  authors: [{ name: 'Powerteck Industries' }],
  creator: 'Powerteck Industries',
  metadataBase: new URL(siteConfig.domain),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.domain,
    title: `${siteConfig.companyName} — Manufacturer of Air Coolers, Fans & Home Appliances`,
    description: siteConfig.description,
    siteName: siteConfig.companyName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAFAFA] text-[#373333] selection:bg-[#DC1017] selection:text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
