import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
      try {
              const event = await req.json();

        if (event.type === "email.received") {
                  const { email_id, from, subject } = event.data;

                // Fetch the full email content from Resend API
                const emailContent = await fetch(
                            `https://api.resend.com/emails/${email_id}/content`,
                    {
                                  headers: {
                                                  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                                  },
                    }
                          );
                  const content = await emailContent.json();

                await resend.emails.send({
                            from: "noreply@cleardesk.tech",
                            to: "ac633912@gmail.com",
                            subject: `[Forwarded] ${subject || "No Subject"}`,
                            html: content.html || `<p>From: ${from}</p><pre>${content.text || "No content"}</pre>`,
                });
        }

        return NextResponse.json({ received: true });
      } catch (error) {
              console.error("Webhook error:", error);
              return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
      }
}
