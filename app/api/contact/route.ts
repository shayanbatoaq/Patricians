import { NextResponse } from "next/server";
import { Resend } from "resend";

import { companyName, contactDetails } from "@/data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getValue(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMultiline(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const name = getValue(body.name);
    const businessName = getValue(body.businessName);
    const email = getValue(body.email);
    const service = getValue(body.service);
    const projectDetails = getValue(body.projectDetails);
    const website = getValue(body.website);

    if (website) {
      return NextResponse.json({
        message: "Your inquiry has been sent successfully. Patricians will reply by email.",
      });
    }

    if (!name || !email || !service || !projectDetails) {
      return NextResponse.json(
        { error: "Please complete all required fields before submitting." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || contactDetails.email.value;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        {
          error:
            "The contact form is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to the environment.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0f172a">
        <h1 style="margin-bottom:16px;font-size:24px;color:#0b3b91;">New ${escapeHtml(companyName)} inquiry</h1>
        <p style="margin:0 0 20px;">A new contact form submission was sent from the website.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            <tr>
              <td style="padding:10px 0;font-weight:700;vertical-align:top;">Name</td>
              <td style="padding:10px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:700;vertical-align:top;">Business</td>
              <td style="padding:10px 0;">${escapeHtml(businessName || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:700;vertical-align:top;">Email</td>
              <td style="padding:10px 0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:700;vertical-align:top;">Service</td>
              <td style="padding:10px 0;">${escapeHtml(service)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:700;vertical-align:top;">Project details</td>
              <td style="padding:10px 0;">${formatMultiline(projectDetails)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const text = [
      `New ${companyName} inquiry`,
      "",
      `Name: ${name}`,
      `Business: ${businessName || "Not provided"}`,
      `Email: ${email}`,
      `Service: ${service}`,
      "",
      "Project details:",
      projectDetails,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Patricians inquiry: ${service}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend send failed", error);

      return NextResponse.json(
        {
          error:
            error.message ||
            "Resend could not deliver this inquiry. Please try again.",
        },
        { status: error.statusCode || 502 },
      );
    }

    return NextResponse.json({
      message: "Your inquiry has been sent successfully. Patricians will reply by email.",
    });
  } catch (error) {
    console.error("Contact form route failed", error);

    return NextResponse.json(
      { error: "Something went wrong while sending your inquiry." },
      { status: 500 },
    );
  }
}
