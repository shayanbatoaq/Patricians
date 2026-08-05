import type { UsageMetrics } from "@/types/analytics";

export type OpenRouterUsage = {
  prompt_tokens?: unknown;
  completion_tokens?: unknown;
  total_tokens?: unknown;
  cost?: unknown;
};

export const EMPTY_USAGE_METRICS: UsageMetrics = Object.freeze({
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
  estimatedCost: 0,
});

function nonNegativeNumber(value: unknown) {
  const parsed = typeof value === "string" ? Number(value) : value;

  return typeof parsed === "number" && Number.isFinite(parsed) && parsed >= 0
    ? parsed
    : 0;
}

export function readOpenRouterMetrics(usage: OpenRouterUsage | null | undefined): UsageMetrics {
  if (!usage) {
    return { ...EMPTY_USAGE_METRICS };
  }

  return {
    promptTokens: Math.trunc(nonNegativeNumber(usage.prompt_tokens)),
    completionTokens: Math.trunc(nonNegativeNumber(usage.completion_tokens)),
    totalTokens: Math.trunc(nonNegativeNumber(usage.total_tokens)),
    estimatedCost: nonNegativeNumber(usage.cost),
  };
}

export function addUsageMetrics(...metrics: UsageMetrics[]): UsageMetrics {
  return metrics.reduce<UsageMetrics>(
    (total, current) => ({
      promptTokens: total.promptTokens + nonNegativeNumber(current.promptTokens),
      completionTokens:
        total.completionTokens + nonNegativeNumber(current.completionTokens),
      totalTokens: total.totalTokens + nonNegativeNumber(current.totalTokens),
      estimatedCost: total.estimatedCost + nonNegativeNumber(current.estimatedCost),
    }),
    { ...EMPTY_USAGE_METRICS },
  );
}

export function normalizeUsageMetrics(value: unknown): UsageMetrics {
  if (!value || typeof value !== "object") {
    return { ...EMPTY_USAGE_METRICS };
  }

  const metrics = value as Partial<UsageMetrics>;

  return {
    promptTokens: Math.trunc(nonNegativeNumber(metrics.promptTokens)),
    completionTokens: Math.trunc(nonNegativeNumber(metrics.completionTokens)),
    totalTokens: Math.trunc(nonNegativeNumber(metrics.totalTokens)),
    estimatedCost: nonNegativeNumber(metrics.estimatedCost),
  };
}

