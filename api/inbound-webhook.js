import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Inbound Webhook Endpoint for Resend.
 * Configure this URL in Resend Dashboard -> Webhooks -> Add Webhook.
 * URL: https://yourdomain.com/api/inbound-webhook
 * Event: email.received
 */
export default async function handler(req, res) {
  // Only accept POST requests from webhooks
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Webhooks must use POST.',
    });
  }

  try {
    const payload = req.body;

    // Optional webhook signature verification can be added here if RESEND_WEBHOOK_SECRET is set
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers['svix-signature'] || req.headers['resend-signature'];
      if (!signature) {
        return res.status(401).json({ success: false, error: 'Missing webhook signature' });
      }
      // Note: If using svix for webhook verification, you can verify payload headers here
    }

    const { type, data } = payload || {};

    console.log(`[Resend Webhook] Received event: ${type}`);

    if (type === 'email.received' && data?.email_id) {
      // Fetch full content of the received email
      const { data: emailData, error: emailError } = await resend.emails.receiving.get(data.email_id);

      if (emailError) {
        console.error('[Resend Webhook] Error fetching email details:', emailError);
      } else {
        console.log(`[Resend Webhook] New email from ${emailData.from}: "${emailData.subject}"`);
      }

      // Check if there are attachments
      if (data.attachments && data.attachments.length > 0) {
        const { data: attachmentsData, error: attachError } = await resend.attachments.receiving.list({
          emailId: data.email_id,
        });

        if (!attachError) {
          console.log(`[Resend Webhook] Found ${attachmentsData.data?.length || 0} attachments.`);
        }
      }
    }

    // Acknowledge receipt to Resend
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('[Resend Webhook] Internal server error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
