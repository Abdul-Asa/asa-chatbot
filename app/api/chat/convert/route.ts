import { OpenAIStream } from "@/lib/openai-stream";
import { ChatGPTMessage, OpenAIStreamPayload } from "@/lib/types";
import { getTextExtractor } from "office-text-extractor";

// This function returns a new instance of the `TextExtractor` class, with the default
// extraction methods (docx, pptx, xlsx, pdf) registered.
const extractor = getTextExtractor();

export const POST = async (req: Request): Promise<Response> => {
  const formData = await req.formData();

  const file = formData.get("file") as Blob;
  const buffer = Buffer.from(await file.arrayBuffer());
  const text = await extractor.extractText({ input: buffer, type: "buffer" });

  
  return new Response(text);
};
