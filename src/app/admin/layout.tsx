import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Layout raiz do painel — cobre login e rotas internas sem alterar autenticação. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
