import { analyzeConversation, extractExplicitLeadDetails } from "@/lib/conversationAnalysis";
import { parseConversationLogRequest } from "@/lib/conversationPayload";
import { verifyLoggingToken } from "@/lib/loggingToken";
import { syncConversationExchange } from "@/lib/notionLogger";
import type { ExplicitLeadDetails } from "@/types/analytics";

export const maxDuration = 60;

function mergeLeadDetails(
  extracted: ExplicitLeadDetails,
  supplied: Partial<ExplicitLeadDetails> | undefined,
): ExplicitLeadDetails {
  return Object.fromEntries(
    Object.entries(extracted).map(([key, value]) => [
      key,
      supplied?.[key as keyof ExplicitLeadDetails] || value,
    ]),
  ) as ExplicitLeadDetails;
}

export async function POST(request: Request) {
  try {
    const body = parseConversationLogRequest(await request.json());
    if (!body) {
      return Response.json({ ok: false, error: "Invalid conversation log payload." }, { status: 400 });
    }

    const token = verifyLoggingToken(body.loggingToken);
    if (
      !token ||
      token.sessionId !== body.sessionId ||
      token.exchangeId !== body.exchange.exchangeId ||
      token.userMessageId !== body.exchange.userMessage.id ||
      token.assistantMessageId !== body.exchange.assistantMessage.id
    ) {
      return Response.json({ ok: false, error: "Invalid logging token." }, { status: 401 });
    }

    const final = Boolean(body.finalize || body.completionReason);
    const { analysis } = await analyzeConversation(body.messages, {
      final,
      completionReason: body.completionReason,
    });
    const leadDetails = mergeLeadDetails(
      extractExplicitLeadDetails(body.messages),
      body.contactDetails,
    );
    const result = await syncConversationExchange({
      ...body,
      analysis,
      leadDetails,
      final,
    });

    return Response.json({ ok: true, notionPageId: result.pageId, duplicate: result.duplicate });
  } catch (error) {
    console.error("Pat AI conversation logging failed", error);
    return Response.json(
      { ok: false, error: "Conversation logging failed after retries." },
      { status: 503 },
    );
  }
}

