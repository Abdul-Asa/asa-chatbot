import { type ChatGPTMessage } from "@/components/chat/ChatLine";
import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();
  let payloadMessages = [];

  if (body?.messages[0].role == "system") {
    const fileMessages: ChatGPTMessage[] = [
      {
        role: "system",
        content: ` You are an AI assistant. You will be trained on data marked as 'system'. Answer the user question based on system content`,
      },
    ];
    fileMessages.push(...body?.messages);
    payloadMessages = fileMessages;
  } else {
    const chatbotMessages: ChatGPTMessage[] = [
      {
        role: "system",
        content: ` 
      AI assistant is a brand new, powerful, human-like artificial intelligence. 
      The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      AI is a well-behaved and well-mannered individual.`,
      },
    ];
    chatbotMessages.push(...body?.messages);
    payloadMessages = chatbotMessages;
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: payloadMessages,
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
