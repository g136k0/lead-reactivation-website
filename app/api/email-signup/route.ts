import { NextResponse } from "next/server";

function clean(value: unknown, length = 500) {
  return typeof value === "string" ? value.trim().slice(0, length) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;

    if (clean(body.companyWebsite)) return NextResponse.json({ ok: true });

    const email = clean(body.email, 254).toLowerCase();
    const source = clean(body.source) || "/";
    const timezone = clean(body.timezone) || "Not detected";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Notification service unavailable" }, { status: 503 });
    }

    const message = [
      "🟢 New LeadRevive email subscriber",
      "",
      `Email: ${email}`,
      `Source: ${source}`,
      `Timezone: ${timezone}`,
      `Submitted: ${new Date().toISOString()}`,
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
