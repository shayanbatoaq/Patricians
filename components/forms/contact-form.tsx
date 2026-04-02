"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { contactServiceOptions } from "@/data/site";

const fieldClassName =
  "w-full rounded-3xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-[var(--brand-300)] focus:ring-4 focus:ring-[rgba(17,94,212,0.08)]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.3)] sm:p-8">
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();

          const form = event.currentTarget;
          const formData = new FormData(form);
          const payload = Object.fromEntries(formData.entries());

          setStatus("submitting");
          setMessage(null);

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const result = (await response.json().catch(() => null)) as
              | { message?: string; error?: string }
              | null;

            if (!response.ok) {
              setStatus("error");
              setMessage(
                result?.error ??
                  "Your inquiry could not be sent right now. Please try again shortly.",
              );
              return;
            }

            form.reset();
            setStatus("success");
            setMessage(
              result?.message ??
                "Your inquiry has been sent successfully. Patricians will reply by email.",
            );
          } catch {
            setStatus("error");
            setMessage(
              "A network error interrupted the request. Please try again in a moment.",
            );
          }
        }}
      >
        <label className="hidden" aria-hidden="true">
          <span>Website</span>
          <input
            tabIndex={-1}
            autoComplete="off"
            className={fieldClassName}
            name="website"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Name
            </span>
            <input
              required
              className={fieldClassName}
              name="name"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Business Name
            </span>
            <input
              className={fieldClassName}
              name="businessName"
              placeholder="Your business"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Email
            </span>
            <input
              type="email"
              required
              className={fieldClassName}
              name="email"
              placeholder="name@company.com"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Service Interested In
            </span>
            <select required className={fieldClassName} name="service" defaultValue="">
              <option value="">Select a service</option>
              {contactServiceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Project Details
          </span>
          <textarea
            required
            className={`${fieldClassName} min-h-36 resize-y`}
            name="projectDetails"
            placeholder="Tell us what you want to build, automate, improve, or launch."
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" className="min-w-[9.5rem]" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Let's Build"}
          </Button>
        </div>

        {message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              status === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
