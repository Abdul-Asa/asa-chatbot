"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { FileIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ai-elements/loader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const models = [
  {
    name: "GPT 4o",
    value: "openai/gpt-4o",
  },
  {
    name: "Claude 3.5 Sonnet",
    value: "anthropic/claude-3-5-sonnet",
  },
];

async function convertFilesToDataURLs(
  files: FileList
): Promise<
  { type: "file"; filename: string; mediaType: string; url: string }[]
> {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{
          type: "file";
          filename: string;
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string, // Data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

const ChatBotDemo = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { messages, sendMessage, status, clearError, stop } = useChat({
    onError: (err: unknown) => {
      console.log(err);
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "streaming") {
      stop();
      clearError();
      return;
    }
    if (input.trim() || (files && files.length > 0)) {
      setErrorMessage(null);

      const fileParts =
        files && files.length > 0 ? await convertFilesToDataURLs(files) : [];

      sendMessage(
        {
          role: "user",
          parts: [{ type: "text", text: input }, ...fileParts],
        },
        {
          body: {
            model: model,
          },
        }
      );

      setInput("");
      setFiles(undefined);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col min-h-0">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-6 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <Conversation className="flex-1">
              <ConversationContent>
                {messages.map((message) => (
                  <div key={message.id}>
                    <Message from={message.role} key={message.id}>
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              );
                            case "file":
                              return (
                                <div
                                  key={`${message.id}-${i}`}
                                  className="mb-2 p-2 border-muted rounded-md border"
                                >
                                  <div className="flex items-center gap-2 text-sm ">
                                    <FileIcon size={16} />
                                    <span className="font-medium">
                                      {part.filename}
                                    </span>
                                    <span className="text-muted-foreground">
                                      ({part.mediaType})
                                    </span>
                                  </div>
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </MessageContent>
                    </Message>
                  </div>
                ))}
                {status === "submitted" && <Loader />}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {errorMessage && (
              <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                  <p className="ml-6 text-xs">
                    Refresh the page if the error persists
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setErrorMessage(null);
                    clearError();
                  }}
                >
                  Dismiss
                </Button>
              </div>
            )}

            <div className="mt-6 border-t border-border pt-6">
              <PromptInput onSubmit={handleSubmit}>
                {files && files.length > 0 && (
                  <div className="mb-2 p-2 bg-muted rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">
                      Attached files:
                    </div>
                    {Array.from(files).map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <FileIcon size={12} />
                        <span className="truncate">{file.name}</span>
                        <span className="text-muted-foreground">
                          ({Math.round(file.size / 1024)}KB)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <PromptInputTextarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Type your message here or upload a file..."
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    if (event.target.files) {
                      setFiles(event.target.files);
                    }
                  }}
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <PromptInputToolbar>
                  <PromptInputTools>
                    <PromptInputButton
                      variant={files && files.length > 0 ? "default" : "ghost"}
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                    >
                      <FileIcon size={16} />
                      <span>Upload</span>
                    </PromptInputButton>
                    <PromptInputModelSelect
                      onValueChange={(value) => {
                        setModel(value);
                      }}
                      value={model}
                    >
                      <PromptInputModelSelectTrigger>
                        <PromptInputModelSelectValue />
                      </PromptInputModelSelectTrigger>
                      <PromptInputModelSelectContent>
                        {models.map((model) => (
                          <PromptInputModelSelectItem
                            key={model.value}
                            value={model.value}
                          >
                            {model.name}
                          </PromptInputModelSelectItem>
                        ))}
                      </PromptInputModelSelectContent>
                    </PromptInputModelSelect>
                  </PromptInputTools>
                  <PromptInputSubmit
                    disabled={
                      status === "ready" &&
                      !input &&
                      (!files || files.length === 0)
                    }
                    status={status}
                    className="w-20"
                  />
                </PromptInputToolbar>
              </PromptInput>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatBotDemo;
