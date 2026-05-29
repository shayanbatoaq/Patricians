import { PAT_AI_CONTEXT } from "@/lib/pat-ai-context";
import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

const SYSTEM_PROMPT = `
You are Pat AI, the official AI assistant for Patricians.

You are NOT a general-purpose chatbot.

Your only job is to help users understand Patricians, its services, pricing, timelines, process, contact options, and AI solutions.

SOURCE OF TRUTH:
Use only the provided Patricians context and website content.
Do not invent facts.
Do not guess pricing, timelines, features, guarantees, or technical details.
If information is not present in the provided context, say that you do not have that information and recommend contacting Patricians.

ALLOWED TOPICS:
- Patricians company information
- AI automation services
- AI website assistant services
- website development services
- e-commerce website services
- digital marketing services
- mobile app development services
- pricing and packages
- timelines
- process
- FAQs
- contact and booking guidance
- helping users choose the right Patricians service

DISALLOWED TOPICS:
- cooking or recipes
- school/homework help
- coding help unrelated to Patricians
- general AI questions not connected to Patricians
- medical, legal, financial, or religious advice
- news, politics, entertainment, sports
- personal advice
- anything unrelated to Patricians

OUT-OF-SCOPE RESPONSE RULE:
If the user asks about anything outside Patricians, respond briefly:
"I can only help with Patricians' services, pricing, timelines, and AI solutions. If you need help choosing between websites, website assistants, automation, digital marketing, or mobile apps, I can guide you."

HALLUCINATION RULES:
- Never make up information
- Never invent unavailable services
- Never invent discounts
- Never invent delivery promises
- Never claim something is included unless it exists in the context
- If unsure, admit uncertainty
- If the context does not contain the answer, say:
"I don't have that information in my current Patricians context. Please contact Patricians for confirmation."

RESPONSE STYLE:
- Keep answers concise
- Use 3-6 lines where possible
- Ask only one follow-up question at a time
- Be professional, calm, clear, and business-focused
- Guide users toward Book a Strategy Call or Contact Patricians when relevant
- Use plain text only
- Do not use markdown formatting
- Do not use headings, bullets, numbered lists, tables, code blocks, links, emphasis, bold, italics, asterisks, underscores, or markdown syntax
- Use clean sentences, short paragraphs, and line breaks only

PRIMARY OBJECTIVE:
Help users understand Patricians and move toward the right next step.
`;

const OUT_OF_SCOPE_MESSAGE =
  "I can only help with Patricians' services, pricing, timelines, and AI solutions. If you need help choosing between websites, website assistants, automation, digital marketing, or mobile apps, I can guide you.";

const patriciansKeywords = [
  "patricians",
  "pat ai",
  "service",
  "services",
  "pricing",
  "price",
  "cost",
  "package",
  "packages",
  "plan",
  "plans",
  "timeline",
  "delivery",
  "contact",
  "email",
  "phone",
  "book",
  "strategy call",
  "website",
  "site",
  "landing page",
  "e-commerce",
  "ecommerce",
  "store",
  "shop",
  "automation",
  "workflow",
  "ai solution",
  "website assistant",
  "assistant",
  "chatbot",
  "chat bot",
  "marketing",
  "digital marketing",
  "social media",
  "meta",
  "facebook",
  "instagram",
  "mobile",
  "app",
  "mvp",
  "clinic",
  "business",
  "brand",
  "leads",
  "lead",
  "sales",
  "support",
  "customer",
  "customers",
  "company",
  "agency",
  "faq",
  "included",
  "includes",
  "best for",
] as const;

const outOfScopePatterns = [
  /\b(bake|cake|recipe|cook|cooking|meal|eat|food|dinner|lunch|breakfast)\b/i,
  /\b(homework|essay|assignment|school|solve this|math problem)\b/i,
  /\b(code|coding|python|javascript|java|c\+\+|html|css|sql|debug|loop|function)\b/i,
  /\b(president|prime minister|election|politics|news|match|score|sports|movie|song|celebrity)\b/i,
  /\b(workout|fitness plan|diet plan|personal advice|relationship advice)\b/i,
  /\b(quantum physics|physics|chemistry|biology|history|geography)\b/i,
  /\b(medical|doctor|diagnose|medicine|legal|lawyer|lawsuit|financial advice|investment|religious)\b/i,
] as const;

const businessIntentPatterns = [
  /\b(i|we|my|our)\s+(need|want|run|have|own|am launching|are launching)\b/i,
  /\b(which|what)\s+(service|package|plan)\b/i,
  /\b(what do you do|who are you|tell me about (patricians|your company|the company))\b/i,
  /\b(help|guide|recommend|choose)\b/i,
] as const;

const generalRequestPatterns = [
  /\b(tell me|explain|teach me|show me|give me|write|create|make|draft|summarize|translate|define|who is|what is|how do i|how to|why does|when did)\b/i,
] as const;

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

function includesAnyKeyword(text: string, keywords: readonly string[]) {
  const lowerText = text.toLowerCase();

  return keywords.some((keyword) => lowerText.includes(keyword));
}

function isPatriciansRelated(message: string) {
  return (
    includesAnyKeyword(message, patriciansKeywords) ||
    businessIntentPatterns.some((pattern) => pattern.test(message))
  );
}

function isClearlyOutOfScope(message: string) {
  if (isPatriciansRelated(message)) {
    return false;
  }

  return (
    outOfScopePatterns.some((pattern) => pattern.test(message)) ||
    generalRequestPatterns.some((pattern) => pattern.test(message))
  );
}

function getOutOfScopeResponse(): ChatApiResponse {
  return {
    message: OUT_OF_SCOPE_MESSAGE,
    suggestedActions: ["Explore Services", "Contact Patricians"],
  };
}

function removeMarkdownFormatting(response: string) {
  return response
    .replace(/```[\s\S]*?```/g, (match) =>
      match.replace(/```[a-z]*\n?/gi, "").replace(/```/g, ""),
    )
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/[*_]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sanitizeAssistantResponse(response: string, latestUserMessage: string) {
  if (isClearlyOutOfScope(latestUserMessage)) {
    return OUT_OF_SCOPE_MESSAGE;
  }

  const looksLikeGeneralAnswer =
    /```|^\s*(ingredients|steps|method|recipe|workout|exercise|diagnosis|legal advice|financial advice)\b/im.test(
      response,
    );

  if (looksLikeGeneralAnswer && !isPatriciansRelated(response)) {
    return OUT_OF_SCOPE_MESSAGE;
  }

  return removeMarkdownFormatting(response);
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

  if (
    lowerText.includes("website assistant") ||
    lowerText.includes("chatbot") ||
    lowerText.includes("chat bot")
  ) {
    actions.add("View Website Assistant Plans");
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

    if (isClearlyOutOfScope(latestUserMessage)) {
      return Response.json(getOutOfScopeResponse());
    }

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
          {
            role: "system",
            content: "Patricians context: " + JSON.stringify(PAT_AI_CONTEXT),
          },
          ...messages,
        ],
        temperature: 0.2,
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
    const rawMessage =
      result.choices?.[0]?.message?.content?.trim() ??
      "I can help with services, pricing, timelines, and the right next step.";
    const message = sanitizeAssistantResponse(rawMessage, latestUserMessage);

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
