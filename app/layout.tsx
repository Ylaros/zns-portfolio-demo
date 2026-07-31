import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaFlow — Demonstração de produto",
  description: "Demonstração fictícia e interativa de fluxos operacionais, documentos, calendário e gestão.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
