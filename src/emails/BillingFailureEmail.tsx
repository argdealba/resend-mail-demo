import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface BillingFailureEmailProps {
  customerName: string;
  invoiceNumber: string;
  amountDue: string;
  chargeAttemptDate: string;
  nextRetryDate: string;
  repoLinkLabel?: string;
  repoLinkUrl?: string;
}

export default function BillingFailureEmail({
  customerName,
  invoiceNumber,
  amountDue,
  chargeAttemptDate,
  nextRetryDate,
  repoLinkLabel,
  repoLinkUrl,
}: BillingFailureEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Hi {customerName},</Text>
            <Text>
              We attempted to charge your account on {chargeAttemptDate} but it
              failed.
            </Text>

            <Text>Invoice Number: {invoiceNumber}</Text>
            <Text>Amount Due: {amountDue}</Text>
            <Text>Next Retry: {nextRetryDate}</Text>

            <Button href="https://example.com/update-payment">
              Update Payment Method
            </Button>

            {repoLinkLabel && repoLinkUrl && (
              <Text>
                <Link href={repoLinkUrl}>{repoLinkLabel}</Link>
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}