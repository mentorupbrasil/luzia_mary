import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luzia-mary.vercel.app";

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
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
