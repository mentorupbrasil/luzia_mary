import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const publicUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: {
    default: `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`,
    template: `%s | ${siteConfig.candidate.ballotName}`,
  },
  description: siteConfig.candidate.shortBio,
  keywords: [
    siteConfig.candidate.ballotName,
    "Deputada Federal",
    "Maranhão",
    "Imperatriz",
    "Região Tocantina",
    siteConfig.candidate.party,
  ],
  openGraph: {
    title: `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`,
    description: siteConfig.candidate.shortBio,
    locale: "pt_BR",
    type: "website",
    siteName: siteConfig.candidate.ballotName,
    url: publicUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`,
    description: siteConfig.candidate.shortBio,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className={`${sans.className} antialiased`}>{children}</body>
    </html>
  );
}
