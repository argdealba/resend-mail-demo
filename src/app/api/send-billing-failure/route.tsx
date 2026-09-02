import { Resend } from "resend";
import BillingFailureEmail from "@/emails/BillingFailureEmail";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST(request: Request) {
  const body = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Prepare attachments array
  const attachments = [];
  if (body.includeAttachment) {
    const filePath = join(process.cwd(), "public/files/invoice.pdf");
    const fileBuffer = readFileSync(filePath);
    attachments.push({
      filename: "invoice.pdf",
      content: fileBuffer,
    });
  }

  // Prepare email config
  const emailConfig = {
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
        repoLinkLabel={body.includeRepoLink ? body.repoLinkLabel : undefined}
        repoLinkUrl={body.includeRepoLink ? body.repoLinkUrl : undefined}
      />
    ),
    ...(attachments.length > 0 && { attachments }),
  };

  const response = await resend.emails.send(emailConfig);

  return Response.json(response);
}