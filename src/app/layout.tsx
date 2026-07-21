import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { content } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const url = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${content.candidate.ballotName} | ${content.candidate.office}`,
    template: `%s | ${content.candidate.ballotName}`,
  },
  description: content.candidate.shortBio,
  keywords: [
    content.candidate.ballotName,
    "Deputada Federal",
    content.candidate.state,
    content.candidate.city,
    content.candidate.region,
  ],
  openGraph: {
    title: `${content.candidate.ballotName} | ${content.candidate.office}`,
    description: content.candidate.shortBio,
    locale: "pt_BR",
    type: "website",
    siteName: content.candidate.ballotName,
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.candidate.ballotName} | ${content.candidate.office}`,
    description: content.candidate.shortBio,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className={`${body.className} antialiased`}>{children}</body>
    </html>
  );
}
