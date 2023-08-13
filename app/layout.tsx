import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "../components/fonts/index";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";

export const metadata = {
  title: "🤖 ASA-chatbot",
  description:
    "A GPT-3 powered chatbot that chats with pdf and othe files. Your own personal AI assistant",
  twitter: {
    card: "summary_large_image",
    title: "🤖 ASA-chatbot",
    description: "A GPT-3 powered chatbot. Your own personal AI assistant",
    creator: "@AbdullahShehu1",
  },
  metadataBase: new URL("https://asa-chatbot.vercel.app/"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed -z-10 h-screen w-full bg-gradient-to-br from-indigo-200 via-white to-blue-100" />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="w-full">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
