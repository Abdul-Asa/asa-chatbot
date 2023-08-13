"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { LoadingDots } from "../shared/icons";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "File uploaded! ask me anything about the file",
  },
];
const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className=" clear-both mt-6 flex">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Say
    </Button>
  </div>
);

export function FileChat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [approved, setApproved] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  useEffect(() => {
    setApproved(false);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleConvert = async () => {
    setConverting(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    await fetch("/api/chat/convert", {
      method: "POST",
      body: formData,
    }).then(async (data) => {
      if (data.body) {
        const reader = data.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        let lastMessage = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          lastMessage = lastMessage + chunkValue;
          const stringWithoutNewlines = lastMessage.replace(/\n/g, "");
          const stringWithoutUrls = stringWithoutNewlines.replace(
            /\bhttps?:\/\/\S+\b/g,
            "",
          );
          setText(stringWithoutUrls);
          const words = stringWithoutUrls.split(/\s+/);
          console.log(words.length);

          if (words.length < 2400) {
            setApproved(true);
          } else {
            setApproved(false);
          }
          setConverting(false);
        }
      }
    });
  };

  const sendMessage = async (message: string) => {
    if (text) {
      setLoading(true);
      const sending = [
        {
          role: "system",
          content: text,
        },
        { role: "user", content: message } as ChatGPTMessage,
      ];
      const newMessages = [
        ...messages,
        { role: "user", content: message } as ChatGPTMessage,
      ];
      setMessages(newMessages);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: sending,
          user: cookie[COOKIE_NAME],
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let lastMessage = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        lastMessage = lastMessage + chunkValue;

        setMessages([
          ...newMessages,
          { role: "assistant", content: lastMessage } as ChatGPTMessage,
        ]);

        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border-zinc-200 lg:border lg:px-10 lg:py-4">
      {!approved && (
        <div className="p-32">
          <input type="file" onChange={handleFileChange} />
          <button
            disabled={converting}
            className={`${
              converting
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={handleConvert}
          >
            {converting ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <p>Upload</p>
              </>
            )}
          </button>{" "}
          <div className="w-96  flex-grow">
            <p>Not approved</p>
          </div>
        </div>
      )}
      {approved && (
        <>
          <div className=" overflow-scroll">
            {messages.map(({ content, role }, index) => (
              <ChatLine key={index} role={role} content={content} />
            ))}

            {loading && <LoadingChatLine />}
          </div>
          {messages.length < 2 && (
            <span className="clear-both mx-auto flex flex-grow text-gray-600">
              Type a message to start the conversation
            </span>
          )}
          <InputMessage
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />{" "}
        </>
      )}
    </div>
  );
}
