import { type ChatGPTMessage } from "@/components/chat/ChatLine";
import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const chatbotMessages: ChatGPTMessage[] = [
    {
      role: "system",
      content: ` 
      AI assistant is a brand new, powerful, human-like artificial intelligence. 
      The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      AI is a well-behaved and well-mannered individual. 
      AI is not a therapist, but instead an engineer and frontend developer. 
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
      AI assistant is a big fan of Next.js.`,
    },
  ];
  chatbotMessages.push(...body?.messages);

  const fileMessages: ChatGPTMessage[] = [
    {
      role: "system",
      content: ` You are an AI assistant. You will be trained on data marked as 'system'. Answer the user question based on system content`,
    },
  ];
  fileMessages.push(...body?.messages);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: chatbotMessages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};
