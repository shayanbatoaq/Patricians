import { analyzeConversation, extractExplicitLeadDetails } from "@/lib/conversationAnalysis";
import { parseConversationFinalizeRequest } from "@/lib/conversationPayload";
import { verifyLoggingToken } from "@/lib/loggingToken";
import { finalizeConversationPage } from "@/lib/notionLogger";
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
    const body = parseConversationFinalizeRequest(await request.json());
    if (!body) {
      return Response.json({ ok: false, error: "Invalid conversation finalization payload." }, { status: 400 });
    }

    const token = verifyLoggingToken(body.loggingToken);
    if (!token || token.sessionId !== body.sessionId) {
      return Response.json({ ok: false, error: "Invalid logging token." }, { status: 401 });
    }

    const { analysis } = await analyzeConversation(body.messages, {
      final: true,
      completionReason: body.completionReason,
    });
    const result = await finalizeConversationPage({
      ...body,
      analysis,
      leadDetails: mergeLeadDetails(
        extractExplicitLeadDetails(body.messages),
        body.contactDetails,
      ),
      final: true,
    });

    return Response.json({ ok: true, notionPageId: result?.pageId });
  } catch (error) {
    console.error("Pat AI conversation finalization failed", error);
    return Response.json(
      { ok: false, error: "Conversation finalization failed after retries." },
      { status: 503 },
    );
  }
}

