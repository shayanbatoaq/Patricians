import { PAT_AI_CONTEXT } from "@/lib/pat-ai-context";
import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

const SYSTEM_PROMPT = `
You are Pat AI, the AI assistant for Patricians.

ROLE:
You help users understand services, pricing, and solutions.

OBJECTIVES:
- Recommend the best service
- Help users decide what they need
- Guide them toward conversion

RULES:
- Keep responses short (3-6 lines)
- Be clear, direct, and professional
- Ask only ONE follow-up question
- Always guide toward next step

BEHAVIOR:
- If user is unsure -> help them choose
- If user shows intent -> suggest:
  - Book a Strategy Call
  - Contact Patricians

TONE:
- Premium
- Calm
- Business-focused
- Confident but not hype

DO NOT:
- Write long paragraphs
- Over-explain
- Use technical jargon unnecessarily

ALWAYS:
- Be practical
- Be helpful
- Move conversation forward
`;

function normalizeMessages(messages: ChatApiRequest["messages"]) {
  return messages
    .filter((message) => {
      return (
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000),
    }));
}

function getSuggestedActions(text: string, latestUserMessage: string) {
  const lowerText = `${latestUserMessage} ${text}`.toLowerCase();
  const actions = new Set<string>();

  if (
    lowerText.includes("website") ||
    lowerText.includes("landing") ||
    lowerText.includes("site")
  ) {
    actions.add("View Website Package");
    actions.add("Book a Strategy Call");
  }

  if (
    lowerText.includes("e-commerce") ||
    lowerText.includes("ecommerce") ||
    lowerText.includes("store") ||
    lowerText.includes("shop")
  ) {
    actions.add("View Website Package");
    actions.add("Contact Patricians");
  }

  if (lowerText.includes("chatbot") || lowerText.includes("chat bot")) {
    actions.add("View Chatbot Plans");
    actions.add("Book a Strategy Call");
  }

  if (lowerText.includes("automation") || lowerText.includes("workflow")) {
    actions.add("Discuss Automation");
    actions.add("Book a Strategy Call");
  }

  if (
    lowerText.includes("marketing") ||
    lowerText.includes("social") ||
    lowerText.includes("instagram") ||
    lowerText.includes("facebook") ||
    lowerText.includes("meta")
  ) {
    actions.add("View Marketing Plans");
    actions.add("Book a Strategy Call");
  }

  if (lowerText.includes("mobile") || lowerText.includes("app") || lowerText.includes("mvp")) {
    actions.add("Discuss Mobile App");
    actions.add("Book a Strategy Call");
  }

  if (
    lowerText.includes("book") ||
    lowerText.includes("call") ||
    lowerText.includes("strategy")
  ) {
    actions.add("Book a Strategy Call");
  }

  if (lowerText.includes("contact") || lowerText.includes("email")) {
    actions.add("Contact Patricians");
  }

  if (actions.size === 0) {
    actions.add("Explore Services");
    actions.add("Book a Strategy Call");
  }

  return Array.from(actions).slice(0, 3);
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        {
          message:
            "Pat AI is almost ready, but the OpenRouter API key is not configured yet.",
          suggestedActions: ["Contact Patricians"],
          error: "OPENROUTER_API_KEY is missing.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<ChatApiRequest>;
    const messages = normalizeMessages(body.messages ?? []);

    if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
      return Response.json(
        {
          message: "Please send a question so Pat AI can help.",
          suggestedActions: ["Explore Services"],
          error: "A user message is required.",
        },
        { status: 400 },
      );
    }

    const latestUserMessage = messages[messages.length - 1]?.content ?? "";

    const openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.4-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: JSON.stringify(PAT_AI_CONTEXT) },
          ...messages,
        ],
        temperature: 0.5,
        max_tokens: 380,
      }),
      },
    );

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();

      return Response.json(
        {
          message:
            "I could not reach the AI service right now. You can still contact Patricians directly or book a strategy call.",
          suggestedActions: ["Book a Strategy Call", "Contact Patricians"],
          error: errorText.slice(0, 500),
        },
        { status: openRouterResponse.status },
      );
    }

    const result = (await openRouterResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const message =
      result.choices?.[0]?.message?.content?.trim() ??
      "I can help with services, pricing, timelines, and the right next step.";

    const response: ChatApiResponse = {
      message,
      suggestedActions: getSuggestedActions(message, latestUserMessage),
    };

    return Response.json(response);
  } catch (error) {
    return Response.json(
      {
        message:
          "Something went wrong while Pat AI was responding. Try again, or contact Patricians directly.",
        suggestedActions: ["Contact Patricians"],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
