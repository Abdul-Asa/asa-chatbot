import type { Metadata } from "next";
import { Doto, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Chatbot",
  description: "Chat with PDFs using AI - Dark and minimalist design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${doto.variable} ${instrumentSans.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
