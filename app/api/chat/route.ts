import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/cleardesk-ai/strategy-call";

const SYSTEM_PROMPT = `You are the ClearDesk AI assistant — a friendly, helpful chatbot on the ClearDesk website. Talk like a real person, not a marketer. Your job is to answer questions about ClearDesk's services, pricing, and process, and help visitors figure out if ClearDesk is right for them. Keep responses short (2-4 sentences max unless they ask for more detail). Talk the way a small business owner would — skip jargon.

## About ClearDesk
- ClearDesk AI is a one-person web design studio in the Bay Area, run by Adrian Contreras.
- We build professional websites for local businesses at honest, affordable prices.
- Big agencies charge $15k–$50k and take months. We start at $75/month and launch in 72 hours.
- Cancel anytime. Unlimited changes included. No contracts.

## Services & Pricing (monthly, cancel anytime)

### 1. Professional Landing Page — $75/month (normally $150 — limited discount)
- A clean, professional one-page website
- Loads fast on every phone so visitors don't leave
- Turns visitors into phone calls, form fills, and bookings
- Built to rank on Google so customers find you first
- Your own custom domain, fully hosted — we handle everything
- Best for: plumbers, contractors, consultants, coaches, anyone who needs to look legit online

### 2. Multi-Page Site + AI Integration — $200/month (normally $250 — limited discount) ⭐ Most Popular
- Full website with multiple pages (Home, Services, About, Contact, etc.)
- Shows up when people Google what you do in your city
- AI chatbot on your site that answers questions and captures leads 24/7
- Loads fast on every phone
- Easy for you to update without touching any code
- Best for: established businesses that want to own local Google results

### 3. Never Miss Another Lead Package — $1,000/month
- Everything in the Multi-Page plan, PLUS:
- AI receptionist picks up every missed call (nights, weekends, holidays)
- Takes a message, figures out what they need, texts you the details
- Automatically asks happy customers to leave Google reviews
- More 5-star reviews = higher Google rankings = more customers calling you
- Best for: HVAC, plumbing, electricians, dentists, lawyers — anyone where a missed call = lost money

## How It Works
1. **Quick Call** — Free 15-min call to learn about your business and plan your website
2. **We Build It** — We design and build your entire website
3. **You Go Live** — Your site launches within 72 hours. We handle hosting and updates.

## Important Details
- Cancel anytime — no contracts, no commitments
- Unlimited changes to your website — no extra charges
- We handle hosting, domain, security, and updates

## Scheduling
When someone wants to book a call or talk to Adrian, share this link: ${CALENDLY_URL}
Always encourage visitors to book a free 15-minute call if they seem interested.

## Rules
- Talk like a normal person. If a plumber wouldn't understand it, rewrite it.
- Never make up information. If you don't know, say "That's a great question — I'd hop on a quick call with Adrian to go over that" and share the Calendly link.
- Never badmouth other companies by name.
- If someone asks about something unrelated, politely bring it back to how ClearDesk can help.
- Be friendly, not pushy. No hard sell.
- If someone seems ready, suggest booking a call.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages array is required" },
      { status: 400 }
    );
  }

  // Enforce 20 message limit (user messages only)
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length > 20) {
    return NextResponse.json(
      {
        reply:
          "You've reached the message limit for this conversation. To keep chatting, book a free 15-min call with Adrian! " +
          CALENDLY_URL,
      },
      { status: 200 }
    );
  }

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text"
        ? response.content[0].text
        : "Sorry, I couldn't process that. Try again!";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[chat] Claude API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
