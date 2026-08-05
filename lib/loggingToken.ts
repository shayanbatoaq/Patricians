import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

type LoggingTokenPayload = {
  sessionId: string;
  exchangeId: string;
  userMessageId: string;
  assistantMessageId: string;
  expiresAt: number;
};

function secret() {
  const value =
    process.env.PAT_AI_LOGGING_SECRET?.trim() ||
    process.env.OPENROUTER_API_KEY?.trim() ||
    process.env.NOTION_TOKEN?.trim();

  if (!value) {
    throw new Error("Pat AI logging cannot sign requests because no server secret is configured.");
  }

  return value;
}

function signature(encodedPayload: string) {
  return createHmac("sha256", secret()).update(encodedPayload).digest("base64url");
}

export function createLoggingToken(
  payload: Omit<LoggingTokenPayload, "expiresAt">,
): string {
  const completePayload: LoggingTokenPayload = {
    ...payload,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(completePayload)).toString("base64url");
  return `${encodedPayload}.${signature(encodedPayload)}`;
}

export function verifyLoggingToken(token: string): LoggingTokenPayload | null {
  const [encodedPayload, suppliedSignature, extra] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extra) return null;

  const expectedSignature = signature(encodedPayload);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as Partial<LoggingTokenPayload>;
    if (
      typeof payload.sessionId !== "string" ||
      typeof payload.exchangeId !== "string" ||
      typeof payload.userMessageId !== "string" ||
      typeof payload.assistantMessageId !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return payload as LoggingTokenPayload;
  } catch {
    return null;
  }
}

