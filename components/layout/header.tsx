"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/isocon/logo.svg"
            alt="ASA Chatbot"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-bold font-mono">ASA Chatbot</h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
