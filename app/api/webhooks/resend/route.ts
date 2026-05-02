import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
          const event = await req.json();

          if (event.type === "email.received") {
                  const { from, subject, html, text } = event.data;

                  await resend.emails.send({
                            from: "noreply@cleardesk.tech",
                            to: "ac633912@gmail.com",
                            subject: `[Forwarded] ${subject}`,
                            html: html || `<pre>${text}</pre>`,
                          });
                }

          return NextResponse.json({ received: true });
        } catch (error) {
          console.error("Webhook error:", error);
          return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
        }
  }
