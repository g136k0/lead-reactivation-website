import { NextResponse } from "next/server";

const requiredFields = [
  "oldLeads",
  "monthlyLeads",
  "customerValue",
  "firstName",
  "business",
  "website",
  "email",
  "phone",
  "preferredTime",
] as const;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;

    // Silently accept automated submissions caught by the honeypot.
    if (clean(body.companyWebsite)) return NextResponse.json({ ok: true });

    const data = Object.fromEntries(
      [...requiredFields, "timezone"].map((field) => [field, clean(body[field])]),
    ) as Record<string, string>;

    if (requiredFields.some((field) => !data[field])) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Notification service unavailable" }, { status: 503 });
    }

    const message = [
      "🟢 New LeadRevive consultation request",
      "",
      `Name: ${data.firstName}`,
      `Business: ${data.business}`,
      `Website: ${data.website}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      "",
      `Old leads: ${data.oldLeads}`,
      `Monthly leads: ${data.monthlyLeads}`,
      `Customer value: ${data.customerValue}`,
      `Preferred time: ${data.preferredTime}`,
      `Timezone: ${data.timezone || "Not detected"}`,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
    });

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: "Notification failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
