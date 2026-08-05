import type { ChatMessage } from "@/types/chat";
import type {
  ConversationAnalysis,
  ConversationOutcome,
  ExplicitLeadDetails,
  UsageMetrics,
} from "@/types/analytics";
import { EMPTY_USAGE_METRICS, readOpenRouterMetrics } from "@/lib/openrouterMetrics";

export const PAT_AI_MODEL = "openai/gpt-5.4-mini";

const OUT_OF_SCOPE_MESSAGE_START = "I can only help with Patricians' services";
const ANALYSIS_KEYS = [
  "summary",
  "business",
  "industry",
  "serviceInterest",
  "recommendedService",
  "qualifiedLead",
  "leadScore",
  "strategyCallRecommended",
  "outcome",
  "tags",
  "knowledgeGaps",
  "improvements",
] as const;

const OUTCOMES: readonly ConversationOutcome[] = [
  "In Progress",
  "Qualified Lead",
  "Strategy Call Requested",
  "Contact Submitted",
  "Knowledge Gap",
  "Out of Scope",
  "Completed",
];

const ANALYSIS_JSON_SCHEMA = {
  name: "pat_ai_conversation_analysis",
  strict: true,
  schema: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description: "A concise factual summary of the conversation.",
      },
      business: {
        type: ["string", "null"],
        description: "Business name only when the user stated it explicitly.",
      },
      industry: {
        type: ["string", "null"],
        description: "Industry only when the user stated it explicitly.",
      },
      serviceInterest: {
        type: "array",
        items: { type: "string" },
        description: "Patricians services the user is demonstrably interested in.",
      },
      recommendedService: {
        type: ["string", "null"],
        description: "Best grounded Patricians service recommendation, or null.",
      },
      qualifiedLead: { type: "boolean" },
      leadScore: { type: "integer", minimum: 0, maximum: 100 },
      strategyCallRecommended: { type: "boolean" },
      outcome: { type: "string", enum: OUTCOMES },
      tags: { type: "array", items: { type: "string" } },
      knowledgeGaps: {
        type: "array",
        items: { type: "string" },
        description:
          "Missing Patricians knowledge that prevented a relevant business answer. Empty for out-of-scope requests.",
      },
      improvements: {
        type: "array",
        items: { type: "string" },
        description: "Concrete Pat AI knowledge or answer improvements grounded in the transcript.",
      },
    },
    required: ANALYSIS_KEYS,
    additionalProperties: false,
  },
} as const;

type AnalyzeOptions = {
  final?: boolean;
  completionReason?: string;
};

export type AnalysisResult = {
  analysis: ConversationAnalysis;
  usage: UsageMetrics;
};

function cleanString(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanNullableString(value: unknown) {
  const cleaned = cleanString(value);
  return cleaned || null;
}

function cleanStringArray(value: unknown, maxItems = 12) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .map((item) => cleanString(item, 120))
        .filter((item): item is string => Boolean(item)),
    ),
  ).slice(0, maxItems);
}

function userTranscript(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n");
}

function isGroundedInUserText(value: string | null, messages: ChatMessage[]) {
  if (!value) {
    return true;
  }

  return userTranscript(messages).toLocaleLowerCase().includes(value.toLocaleLowerCase());
}

export function validateConversationAnalysis(
  value: unknown,
  messages: ChatMessage[],
): ConversationAnalysis | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);

  if (
    keys.length !== ANALYSIS_KEYS.length ||
    ANALYSIS_KEYS.some((key) => !Object.hasOwn(record, key))
  ) {
    return null;
  }

  const summary = cleanString(record.summary, 1200);
  const business = cleanNullableString(record.business);
  const industry = cleanNullableString(record.industry);
  const recommendedService = cleanNullableString(record.recommendedService);
  const outcome = cleanString(record.outcome) as ConversationOutcome;
  const leadScore = record.leadScore;

  if (
    !summary ||
    !Array.isArray(record.serviceInterest) ||
    !Array.isArray(record.tags) ||
    !Array.isArray(record.knowledgeGaps) ||
    !Array.isArray(record.improvements) ||
    typeof record.qualifiedLead !== "boolean" ||
    typeof record.strategyCallRecommended !== "boolean" ||
    typeof leadScore !== "number" ||
    !Number.isInteger(leadScore) ||
    leadScore < 0 ||
    leadScore > 100 ||
    !OUTCOMES.includes(outcome)
  ) {
    return null;
  }

  return {
    summary,
    business: isGroundedInUserText(business, messages) ? business : null,
    industry: isGroundedInUserText(industry, messages) ? industry : null,
    serviceInterest: cleanStringArray(record.serviceInterest),
    recommendedService,
    qualifiedLead: record.qualifiedLead,
    leadScore,
    strategyCallRecommended: record.strategyCallRecommended,
    outcome,
    tags: cleanStringArray(record.tags),
    knowledgeGaps: cleanStringArray(record.knowledgeGaps),
    improvements: cleanStringArray(record.improvements),
  };
}

function firstMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    const value = match?.[1]?.trim().replace(/[.,;!?]+$/, "");

    if (value) {
      return value.slice(0, 160);
    }
  }

  return null;
}

export function extractExplicitLeadDetails(messages: ChatMessage[]): ExplicitLeadDetails {
  const text = userTranscript(messages);
  const email = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] ?? null;
  const userName = firstMatch(text, [
    /\bmy name is\s+([^\n,.!?]{2,80})/i,
    /\bthis is\s+([^\n,.!?]{2,80})/i,
  ]);
  const businessName = firstMatch(text, [
    /\b(?:my|our)\s+(?:business|company|brand)(?:'s)?\s+(?:name is|is called)\s+([^\n,.!?]{2,100})/i,
    /\b(?:business|company|brand)\s+(?:name is|is called)\s+([^\n,.!?]{2,100})/i,
    /\b(?:i|we)\s+(?:run|own)\s+(?:a business called\s+|a company called\s+)?([^\n,.!?]{2,100})/i,
  ]);
  const industry = firstMatch(text, [
    /\b(?:my|our)\s+industry\s+is\s+([^\n,.!?]{2,80})/i,
    /\b(?:i am|we are|my business is|our business is)\s+in\s+(?:the\s+)?([^\n,.!?]{2,80}?)(?:\s+industry)?(?:[,.!?]|$)/i,
  ]);
  const phone = firstMatch(text, [
    /\b(?:phone|mobile|whatsapp|contact number)(?:\s+number)?\s*(?:is|:|-)?\s*(\+?\d[\d ()-]{6,}\d)/i,
    /\b(?:call|text|whatsapp)\s+me\s+(?:at|on)\s+(\+?\d[\d ()-]{6,}\d)/i,
  ]);
  const budget = firstMatch(text, [
    /\b(?:my|our|the)\s+budget\s+(?:is|of|:)?\s*(.{1,80}?)(?=\s+(?:and\s+)?(?:my|our|the)\s+timeline\b|[.!?]|$)/i,
    /\b(?:i|we)\s+can\s+(?:spend|invest)\s+([^\n,.!?]{1,80})/i,
  ]);
  const timeline = firstMatch(text, [
    /\b(?:my|our|the)\s+timeline\s+(?:is|of|:)?\s*([^\n,.!?]{1,100})/i,
    /\b(?:i|we)\s+need\s+(?:it|this|the project)\s+(?:by|within)\s+([^\n,.!?]{1,100})/i,
    /\b(?:launch|deadline)\s+(?:is|by|:)?\s*([^\n,.!?]{1,100})/i,
  ]);

  return {
    userName,
    email,
    phone,
    businessName,
    industry,
    budget,
    timeline,
  };
}

export function isOutOfScopeConversation(messages: ChatMessage[]) {
  return messages.some(
    (message) =>
      message.role === "assistant" && message.content.startsWith(OUT_OF_SCOPE_MESSAGE_START),
  );
}

export function isStrategyCallRequested(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user")
    .some((message) =>
      /\b(?:book|schedule|arrange|request|want|need)\b.{0,30}\b(?:strategy\s+)?call\b/i.test(
        message.content,
      ),
    );
}

function detectServices(text: string) {
  const services = new Set<string>();
  const lower = text.toLowerCase();

  if (/website|landing page|e-?commerce|online store/.test(lower)) {
    services.add(/e-?commerce|online store/.test(lower) ? "E-Commerce Website" : "Website Development");
  }
  if (/website assistant|chatbot|chat bot/.test(lower)) services.add("AI Website Assistant");
  if (/automation|workflow/.test(lower)) services.add("AI Automation");
  if (/marketing|social media|facebook|instagram|meta ads/.test(lower)) {
    services.add("AI Social Media Marketing");
  }
  if (/mobile app|app mvp/.test(lower)) services.add("Mobile App Development");

  return Array.from(services);
}

export function createFallbackAnalysis(
  messages: ChatMessage[],
  options: AnalyzeOptions = {},
): ConversationAnalysis {
  const lead = extractExplicitLeadDetails(messages);
  const outOfScope = isOutOfScopeConversation(messages);
  const strategyCallRequested = isStrategyCallRequested(messages);
  const transcript = userTranscript(messages);
  const services = outOfScope ? [] : detectServices(transcript);
  const knowledgeGap = messages.some(
    (message) =>
      message.role === "assistant" &&
      /(?:do not|don't) have that information|contact Patricians for confirmation/i.test(
        message.content,
      ),
  );
  const contactSignals = [lead.userName, lead.email, lead.phone, lead.businessName].filter(Boolean)
    .length;
  const score = outOfScope
    ? 0
    : Math.min(100, services.length * 20 + contactSignals * 12 + (lead.budget ? 10 : 0) + (lead.timeline ? 10 : 0));
  const qualifiedLead = !outOfScope && score >= 55;
  const outcome: ConversationOutcome = outOfScope
    ? "Out of Scope"
    : options.completionReason === "contact-submitted"
      ? "Contact Submitted"
      : strategyCallRequested
        ? "Strategy Call Requested"
        : knowledgeGap
          ? "Knowledge Gap"
          : options.final
            ? "Completed"
            : qualifiedLead
              ? "Qualified Lead"
              : "In Progress";

  const summary = outOfScope
    ? "The visitor made an out-of-scope request and was redirected to Patricians services."
    : services.length > 0
      ? `The visitor discussed ${services.join(", ")}${strategyCallRequested ? " and requested a strategy call" : ""}.`
      : "The visitor started a Patricians service conversation; more information is needed to identify the best fit.";

  return {
    summary,
    business: lead.businessName,
    industry: lead.industry,
    serviceInterest: services,
    recommendedService: services[0] ?? null,
    qualifiedLead,
    leadScore: score,
    strategyCallRecommended: !outOfScope && (qualifiedLead || strategyCallRequested),
    outcome,
    tags: outOfScope ? ["Out of Scope"] : services,
    knowledgeGaps: knowledgeGap ? ["Relevant information was missing from Pat AI context"] : [],
    improvements: knowledgeGap ? ["Add the missing answer to the approved Patricians context"] : [],
  };
}

function analysisPrompt(options: AnalyzeOptions) {
  return `Analyze this Pat AI conversation for internal CRM logging.

Rules:
- Pat AI only handles Patricians services.
- Never invent or infer a person's name, contact details, business name, industry, budget, or timeline. Business and industry must be null unless literally stated by the user.
- Mark unrelated requests as Out of Scope. For those, leave business fields, service interest, recommendation, knowledge gaps, and improvements empty and do not fabricate analysis.
- A Knowledge Gap exists only when a relevant Patricians business question could not be answered because approved information was missing.
- Use a 0-100 lead score grounded in service intent, explicit business context, timing, budget, and contact information.
- Keep summary under 80 words.
- Completion mode: ${options.final ? "final" : "ongoing"}.
- Completion reason: ${options.completionReason ?? "none"}.`;
}

export async function analyzeConversation(
  messages: ChatMessage[],
  options: AnalyzeOptions = {},
): Promise<AnalysisResult> {
  const fallback = createFallbackAnalysis(messages, options);

  if (isOutOfScopeConversation(messages) || !process.env.OPENROUTER_API_KEY) {
    return { analysis: fallback, usage: { ...EMPTY_USAGE_METRICS } };
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: PAT_AI_MODEL,
        messages: [
          { role: "system", content: analysisPrompt(options) },
          {
            role: "user",
            content: JSON.stringify(
              messages.slice(-40).map(({ role, content }) => ({ role, content: content.slice(0, 4000) })),
            ),
          },
        ],
        temperature: 0,
        max_tokens: 800,
        provider: { require_parameters: true },
        response_format: {
          type: "json_schema",
          json_schema: ANALYSIS_JSON_SCHEMA,
        },
      }),
    });

    if (!response.ok) {
      console.error("Pat AI analysis request failed", response.status, (await response.text()).slice(0, 500));
      return { analysis: fallback, usage: { ...EMPTY_USAGE_METRICS } };
    }

    const result = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: Parameters<typeof readOpenRouterMetrics>[0];
    };
    const content = result.choices?.[0]?.message?.content;
    const parsed = content ? (JSON.parse(content) as unknown) : null;
    const analysis = validateConversationAnalysis(parsed, messages);

    if (!analysis) {
      console.error("Pat AI analysis returned JSON that failed strict validation");
      return { analysis: fallback, usage: readOpenRouterMetrics(result.usage) };
    }

    if (options.completionReason === "contact-submitted") {
      analysis.outcome = "Contact Submitted";
    } else if (isStrategyCallRequested(messages)) {
      analysis.outcome = "Strategy Call Requested";
    }

    return { analysis, usage: readOpenRouterMetrics(result.usage) };
  } catch (error) {
    console.error("Pat AI analysis failed", error);
    return { analysis: fallback, usage: { ...EMPTY_USAGE_METRICS } };
  }
}
