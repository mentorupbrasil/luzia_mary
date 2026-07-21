import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`, template: `%s | ${siteConfig.candidate.ballotName}` },
  description: siteConfig.candidate.shortBio,
  openGraph: {
    title: `${siteConfig.candidate.ballotName} | ${siteConfig.candidate.office}`,
    description: siteConfig.candidate.shortBio,
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}><body className="antialiased">{children}</body></html>;
}
