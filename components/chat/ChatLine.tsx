import { ChatGPTMessage } from "@/lib/types";
import clsx from "clsx";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags

const convertNewLines = (text: string) => {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let isCodeBlock = false;
  let codeLanguage = "";
  let codeContent = "";

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (isCodeBlock) {
        elements.push(
          <SyntaxHighlighter key={i} language={codeLanguage} style={docco}>
            {codeContent}
          </SyntaxHighlighter>,
        );
        codeContent = "";
        isCodeBlock = false;
      } else {
        codeLanguage = line.slice(3);
        isCodeBlock = true;
      }
    } else if (isCodeBlock) {
      codeContent += line + "\n";
    } else {
      elements.push(
        <span key={i}>
          {line}
          <br />
        </span>,
      );
    }
  });

  return elements;
};

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
        <div className="flex-1 gap-4">
          <p className="font-large text-xxl text-gray-900">
            <a href="#" className="hover:underline">
              {role == "assistant" ? "AI" : "You"}
            </a>
          </p>
          <p
            className={clsx(
              "text ",
              role == "assistant" ? "font- font-semibold " : "text-gray-400",
            )}
          >
            {formattedMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
export type { ChatGPTMessage };
