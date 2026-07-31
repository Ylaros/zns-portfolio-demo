import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaFlow — Demo fictícia",
  description: "Demonstração fictícia de uma central operacional, criada exclusivamente para portfólio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
