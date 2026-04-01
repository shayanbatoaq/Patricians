"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { contactServiceOptions } from "@/data/site";

const fieldClassName =
  "w-full rounded-3xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-[var(--brand-300)] focus:ring-4 focus:ring-[rgba(17,94,212,0.08)]";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.3)] sm:p-8">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Name
            </span>
            <input className={fieldClassName} name="name" placeholder="Your name" />
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
              className={fieldClassName}
              name="email"
              placeholder="name@company.com"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Service Interested In
            </span>
            <select className={fieldClassName} name="service">
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
            className={`${fieldClassName} min-h-36 resize-y`}
            name="projectDetails"
            placeholder="Tell us what you want to build, automate, improve, or launch."
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[var(--muted-foreground)]">
            This is a polished front-end inquiry form ready for email, backend,
            or CRM wiring when you want it.
          </p>
          <Button type="submit">Let&apos;s Build</Button>
        </div>

        {submitted ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Thanks. Your inquiry is staged successfully in the front-end flow and
            ready to connect to email, a CRM, or a backend workflow later.
          </p>
        ) : null}
      </form>
    </div>
  );
}
