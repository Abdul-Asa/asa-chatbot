"use client";
import { Chat } from "@/components/chat/Chat";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((bado) => {
      console.log(bado);
      if (!bado) {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <main className="h-screen gap-12 px-12 pb-8 pt-20">
      <Chat />
    </main>
  );
}

export default ChatPage;
