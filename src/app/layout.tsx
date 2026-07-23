import type { Metadata } from "next";
import { Archivo, League_Spartan, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { content } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

/** Display pesado (títulos da home / people). */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["900"],
});

/** Títulos `.font-display` e headings da marca. */
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

/** UI / labels / botões da campanha. */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/** Corpo do site. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const url = getSiteUrl();
const defaultTitle = `${content.candidate.ballotName} | ${content.candidate.office}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: defaultTitle,
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
    type: "website",
    locale: "pt_BR",
    siteName: content.candidate.ballotName,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${leagueSpartan.variable} ${montserrat.variable} ${jakarta.variable}`}
    >
      <body className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  );
}
