import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
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
      <Preview>We couldn't process your payment for {invoiceNumber}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>ARGDEALBA / BILLING</Text>
          <Heading style={styles.heading}>A quick note about your payment</Heading>

          <Text style={styles.text}>Hi {customerName},</Text>
          <Text style={styles.text}>
            We couldn't process the payment for your latest invoice. Please
            update your payment method to keep your account active.
          </Text>

          <Section style={styles.details}>
            <Text style={styles.detail}>
              <strong>Invoice</strong>
              <br />
              {invoiceNumber}
            </Text>
            <Text style={styles.detail}>
              <strong>Amount due</strong>
              <br />
              {amountDue}
            </Text>
            <Text style={styles.detail}>
              <strong>Attempted</strong>
              <br />
              {chargeAttemptDate}
            </Text>
            <Text style={styles.detail}>
              <strong>Next retry</strong>
              <br />
              {nextRetryDate}
            </Text>
          </Section>

          <Button href="https://example.com/billing" style={styles.button}>
            Update payment method
          </Button>

          {repoLinkLabel && repoLinkUrl && (
            <>
              <Hr style={styles.hr} />
              <Text style={styles.text}>
                <Link
                  href={repoLinkUrl}
                  style={{ color: "#7eaa8b", fontWeight: "600" }}
                >
                  {repoLinkLabel}
                </Link>
              </Text>
            </>
          )}

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Questions? Reply to this email and our team will help.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f1eb",
    fontFamily: "Arial, sans-serif",
    color: "#1b2522",
  },
  container: {
    maxWidth: "560px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#fffefb",
  },
  brand: {
    color: "#a5502f",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  heading: {
    fontSize: "30px",
    lineHeight: "1.15",
    fontWeight: "400",
    margin: "28px 0 24px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#52615b",
  },
  details: {
    margin: "28px 0",
    padding: "8px 20px",
    borderLeft: "3px solid #7eaa8b",
  },
  detail: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#52615b",
  },
  button: {
    backgroundColor: "#1b2522",
    color: "#fffefb",
    padding: "14px 18px",
    fontSize: "14px",
    borderRadius: "4px",
  },
  hr: {
    borderColor: "#e2dfd7",
    margin: "36px 0 20px",
  },
  footer: {
    color: "#77817b",
    fontSize: "12px",
  },
} as const;