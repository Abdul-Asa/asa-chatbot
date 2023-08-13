import Balancer from "react-wrap-balancer";
import { Github } from "@/components/shared/icons";
import Footer from "@/components/layout/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CTA from "../components/layout/home-button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className=" mx-auto flex h-screen w-full flex-col justify-between pt-32">
      <section className="">
        <a
          href="https://github.com/Abdul-Asa/asa-chatbot"
          target="_blank"
          rel="noreferrer"
          className=" mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-gray-600 px-7 py-2 transition-colors hover:bg-gray-900"
        >
          <Github className="h-5 w-5 " />
          <p className="text-xs font-semibold text-white md:text-sm">
            {" Don't forget to leave a star on Github"}
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Introducing the ASA-chatbot</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            A GPT-3 powered chatbot. Your own personal AI assistant. Chat with
            .pdfs and .docx files too
          </Balancer>
        </p>
        <div className="mx-auto mt-6 flex flex-col items-center justify-center gap-4 space-x-5 md:flex-row">
          <CTA session={session} />
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="/chat-file"
          >
            Chat with files (sign up not required)
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
