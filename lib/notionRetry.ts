import { isHTTPResponseError } from "@notionhq/client";

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

type RecoveryResult<T> =
  | { recovered: true; value: T }
  | { recovered: false };

type RetryOptions<T> = {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  sleep?: (milliseconds: number) => Promise<void>;
  random?: () => number;
  recover?: (error: unknown, attempt: number) => Promise<RecoveryResult<T>>;
};

function defaultSleep(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

function errorStatus(error: unknown) {
  if (isHTTPResponseError(error)) return error.status;
  if (error && typeof error === "object" && "status" in error) {
    return typeof error.status === "number" ? error.status : null;
  }
  return null;
}

function retryAfterMilliseconds(error: unknown) {
  if (!isHTTPResponseError(error)) return null;
  const headers = error.headers;
  let retryAfter: string | null = null;

  if (headers instanceof Headers) {
    retryAfter = headers.get("retry-after");
  } else if (headers && typeof headers === "object") {
    const entry = Object.entries(headers as Record<string, unknown>).find(
      ([name]) => name.toLowerCase() === "retry-after",
    );
    retryAfter = typeof entry?.[1] === "string" ? entry[1] : null;
  }

  if (!retryAfter) return null;
  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const date = Date.parse(retryAfter);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

export function isRetryableNotionError(error: unknown) {
  const status = errorStatus(error);
  return status !== null && RETRYABLE_STATUS_CODES.has(status);
}

export async function withNotionRetry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions<T> = {},
): Promise<T> {
  const maxAttempts = Math.max(1, options.maxAttempts ?? 4);
  const baseDelayMs = Math.max(0, options.baseDelayMs ?? 400);
  const maxDelayMs = Math.max(baseDelayMs, options.maxDelayMs ?? 5000);
  const sleep = options.sleep ?? defaultSleep;
  const random = options.random ?? Math.random;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (!isRetryableNotionError(error) || attempt === maxAttempts) throw error;

      if (options.recover) {
        const recovery = await options.recover(error, attempt);
        if (recovery.recovered) return recovery.value;
      }

      const exponentialDelay = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      const jitteredDelay = exponentialDelay * (0.75 + random() * 0.5);
      const retryAfter = retryAfterMilliseconds(error);
      await sleep(Math.max(retryAfter ?? 0, Math.round(jitteredDelay)));
    }
  }

  throw new Error("Notion retry loop ended unexpectedly.");
}

