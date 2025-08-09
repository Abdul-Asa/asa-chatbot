# ASA Chatbot

An AI-powered chatbot built with Next.js App Router and the Vercel AI SDK. It supports streaming responses, model selection (OpenAI and Anthropic), and basic file uploads for multimodal analysis.

## Features

- **Streaming chat** with typing indicator and auto-scroll
- **Model switcher**: OpenAI GPT‑4o and Anthropic Claude 3.5 Sonnet
- **File uploads**: attach `.pdf`, `.doc/.docx`, `.txt`, `.png`, `.jpg/.jpeg`
- **Modern UI** with Tailwind CSS, Radix UI primitives, and dark mode support

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **AI**: Vercel AI SDK (`ai`, `@ai-sdk/react`)
- **Models**: OpenAI, Anthropic (Google provider included but not wired in UI)
- **UI**: Tailwind CSS v4, Radix UI, Lucide icons

---

## Quick Start

### 1 Prerequisites

- Node.js 18.18+ or 20+
- One or more provider API keys: OpenAI and/or Anthropic

### 2 Environment Variables

Create a `.env.local` file in the project root with the keys you will use:

```bash
# API key for desired model
OPENAI_API_KEY=your_openai_api_key

# or use Vercel AI Gateway for vercel's abstraction
AI_GATEWAY_API_KEY=your_api_key

```

The server reads the `model` string and forwards chat messages via the Vercel AI SDK.

### 3 Install and Run

```bash
# install
npm install

# start dev server
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open `http://localhost:3000` and click “Start Chatting” (or go directly to `/chat`).

---

## Usage

- Use the input at the bottom to send a message
- Click **Upload** to attach files (listed above)
- Use the **Model** dropdown to switch between providers/models
- Click the stop button while streaming to cancel

> Note: File uploads are converted to data URLs client‑side and passed to the server with your message parts.

---

## Project Structure

```text
app/
  api/chat/route.ts      # Streaming chat endpoint (server)
  chat/page.tsx          # Chat UI (client)
  page.tsx               # Landing page
components/              # UI and chat components
lib/utils.ts             # Utility helpers
```

Key endpoint: `app/api/chat/route.ts` handles `POST` requests using `streamText` and returns a streaming UI response.

---

## Configuration

- Scripts: `dev`, `build`, `start`, `lint`
- Tailwind CSS v4 is preconfigured (see `postcss.config.mjs` and `globals.css`)
- Path alias `@/*` is available via `tsconfig.json`

---

## API

Endpoint: `POST /api/chat`

Request body (simplified):

```json
{
  "messages": [
    {
      "id": "1",
      "role": "user",
      "parts": [{ "type": "text", "text": "Hello" }]
    }
  ],
  "model": "openai/gpt-4o"
}
```

Models supported out of the box in the UI:

- `openai/gpt-4o`
- `anthropic/claude-3-5-sonnet`

> Ensure you have the corresponding API key set in `.env.local` for the selected model.

---

## Build and Deploy

```bash
npm run build
npm start  # runs the production server
```

This app is ready for platforms like Vercel. Remember to add environment variables in your deployment settings.

---

## Troubleshooting

- 401 or provider errors: verify API keys in `.env.local` and redeploy/restart
- Streaming hangs: check network tab for `/api/chat` and server logs
- File not accepted: ensure the extension is one of the allowed types listed above

---

## License

Proprietary. All rights reserved.
