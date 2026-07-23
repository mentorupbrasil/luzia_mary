import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * CSP para o site público.
 * - Sem unsafe-eval em produção
 * - unsafe-inline em script/style: exigido pelo App Router / CSS do Next
 * - Fontes via next/font (self-hosted)
 * - Neon só no servidor (não entra no connect-src do browser)
 */
function contentSecurityPolicy() {
  const scriptSrc = ["'self'", "'unsafe-inline'"];
  if (isDev) scriptSrc.push("'unsafe-eval'");

  const connectSrc = ["'self'"];
  if (isDev) connectSrc.push("ws:", "wss:");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src ${connectSrc.join(" ")}`,
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy() },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
  },
  async redirects() {
    return [
      {
        source: "/demandas",
        destination: "/participe",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Rotas públicas (exclui /admin e APIs internas do painel)
        source: "/((?!admin(?:/|$)|_next/static|_next/image).*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
