"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/isocon/logo.svg"
              alt="ASA Chatbot"
              width={24}
              height={24}
            />
            <span className="font-mono font-semibold">ASA Chatbot</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with{" "}
            <Image src="/isocon/heart.svg" alt="Heart" width={16} height={16} />
            by{" "}
            <Link
              href="https://asa-dev.vercel.app"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              Shehu
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
