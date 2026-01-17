import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const SYSTEM_CONTEXT = `
You are a helpful AI assistant on Dhruv Prajapati’s portfolio website.

About Dhruv:
- Full Stack Developer (MERN)
- React, Next.js, TypeScript, Node.js, MongoDB
- Projects: Movie App, Weather Dashboard, Security Tool, Password Manager
- Seeking placement opportunities

Keep responses concise (2–4 sentences), friendly and professional.
`;

export async function chatWithGemini(userMessage: string) {
  if (!userMessage.trim()) {
    throw new Error("Message is empty");
  }

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: SYSTEM_CONTEXT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand! I'll help visitors learn about Dhruv's portfolio.",
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      topP: 0.9,
      maxOutputTokens: 400,
    },
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
