import assert from "node:assert/strict";
import test from "node:test";

import {
  createFallbackAnalysis,
  extractExplicitLeadDetails,
  validateConversationAnalysis,
} from "@/lib/conversationAnalysis";
import type { ChatMessage } from "@/types/chat";

function message(role: ChatMessage["role"], content: string, index: number): ChatMessage {
  return { id: String(index), role, content, createdAt: new Date(index * 1000).toISOString() };
}

test("extracts only explicitly supplied lead details", () => {
  const messages = [
    message(
      "user",
      "My name is Aisha Khan. My company is called North Star Labs. My industry is healthcare. Email me at aisha@example.com. My phone is +92 300 1234567. Our budget is $5,000 and our timeline is 6 weeks.",
      1,
    ),
  ];

  assert.deepEqual(extractExplicitLeadDetails(messages), {
    userName: "Aisha Khan",
    email: "aisha@example.com",
    phone: "+92 300 1234567",
    businessName: "North Star Labs",
    industry: "healthcare",
    budget: "$5,000",
    timeline: "6 weeks",
  });
});

test("strict validation rejects additional JSON fields", () => {
  const messages = [message("user", "I need a website.", 1)];
  const invalid = {
    summary: "The visitor needs a website.",
    business: null,
    industry: null,
    serviceInterest: ["Website Development"],
    recommendedService: "Website Development",
    qualifiedLead: false,
    leadScore: 25,
    strategyCallRecommended: false,
    outcome: "In Progress",
    tags: ["Website"],
    knowledgeGaps: [],
    improvements: [],
    hallucinatedField: true,
  };

  assert.equal(validateConversationAnalysis(invalid, messages), null);
});

test("strict validation removes ungrounded business and industry values", () => {
  const messages = [message("user", "I need a website.", 1)];
  const valid = {
    summary: "The visitor needs a website.",
    business: "Invented Inc",
    industry: "Healthcare",
    serviceInterest: ["Website Development"],
    recommendedService: "Website Development",
    qualifiedLead: false,
    leadScore: 25,
    strategyCallRecommended: false,
    outcome: "In Progress",
    tags: ["Website"],
    knowledgeGaps: [],
    improvements: [],
  };

  const result = validateConversationAnalysis(valid, messages);
  assert.equal(result?.business, null);
  assert.equal(result?.industry, null);
});

test("out-of-scope fallback does not create fake lead analysis", () => {
  const messages = [
    message("user", "Give me a cake recipe", 1),
    message(
      "assistant",
      "I can only help with Patricians' services, pricing, timelines, and AI solutions.",
      2,
    ),
  ];
  const result = createFallbackAnalysis(messages);

  assert.equal(result.outcome, "Out of Scope");
  assert.equal(result.leadScore, 0);
  assert.deepEqual(result.serviceInterest, []);
  assert.deepEqual(result.knowledgeGaps, []);
});
