import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
  }: {
    messages: UIMessage[];
    model: string;
  } = await req.json();

  const result = streamText({
    model: model,
    messages: convertToModelMessages(messages),
    system:
      "You are a helpful assistant that can answer questions, help with tasks, and analyze uploaded files including PDFs, documents, and images. When files are uploaded, analyze their content and provide detailed insights.",
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
