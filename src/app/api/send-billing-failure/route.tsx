import { Resend } from "resend";
import BillingFailureEmail from "@/emails/BillingFailureEmail";

export async function POST(request: Request) {
  const body = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: body.recipientEmail,
    subject: "Billing Failure Notification",
    react: (
      <BillingFailureEmail
        customerName={body.customerName}
        invoiceNumber={body.invoiceNumber}
        amountDue={body.amountDue}
        chargeAttemptDate={body.chargeAttemptDate}
        nextRetryDate={body.nextRetryDate}
      />
    ),
  });

  return Response.json(response);
}