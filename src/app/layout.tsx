import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "EduVita | Inteligência de Bem-Estar Escolar",
  description: "Plataforma Inteligente de Bem-Estar Escolar - Dashboard executivo para gestores e sociedade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-neutral-100 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
