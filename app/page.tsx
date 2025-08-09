"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { CanvasEffect } from "../components/canvas-effect";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Assistant
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Intelligent
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {" "}
                    Chat Companion
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Experience the future of conversation with ASA Chatbot. Get
                  instant, intelligent responses powered by advanced AI
                  technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/chat"
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className: "text-lg px-8 py-6",
                  })}
                >
                  Start Chatting
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <CanvasEffect />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
