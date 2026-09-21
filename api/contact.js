import { Resend } from 'resend';

export default async function handler(req, res) {
  // 1. CORS / Preflight handling
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({ success: true });
  }

  // 2. Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.',
    });
  }

  try {
    const { name, email, message, website } = req.body || {};

    // 3. Spam Protection: Honeypot check
    // If the hidden 'website' field contains any value, silently accept and drop.
    if (website && typeof website === 'string' && website.trim() !== '') {
      return res.status(200).json({ success: true });
    }

    // 4. Input Validations (User error -> 400 Bad Request)
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Name requires a minimum of 2 characters.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Please provide a valid email address.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Message must be between 10 and 1000 characters.',
      });
    }

    // 5. Environment configuration & sanitization
    // Strip accidental quotes and surrounding whitespace from Vercel env variables
    const rawApiKey = process.env.RESEND_API_KEY || '';
    const apiKey = rawApiKey.replace(/^["']|["']$/g, '').trim();

    if (!apiKey) {
      console.error('[Server Configuration Error]: RESEND_API_KEY environment variable is not defined.');
      return res.status(500).json({
        success: false,
        error: 'Email service is temporarily misconfigured. Please try again later.',
      });
    }

    // Default recipient: user's verified account email if CONTACT_EMAIL is unset or invalid
    const rawContactEmail = process.env.CONTACT_EMAIL || 'bs.pavankumar2005@gmail.com';
    let contactEmail = rawContactEmail.replace(/^["']|["']$/g, '').trim();
    if (!emailRegex.test(contactEmail)) {
      console.warn(`[Warning]: CONTACT_EMAIL "${rawContactEmail}" is invalid. Falling back to bs.pavankumar2005@gmail.com`);
      contactEmail = 'bs.pavankumar2005@gmail.com';
    }

    const rawFrom = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';
    const fromAddress = rawFrom.replace(/^["']|["']$/g, '').trim();

    // Resend Sandbox Restriction: When sending from 'onboarding@resend.dev', Resend strictly permits
    // delivery ONLY to the account owner's email address (bs.pavankumar2005@gmail.com).
    // If a non-account email is configured without a verified domain, route to the registered email to ensure delivery.
    if (fromAddress.includes('resend.dev') && contactEmail !== 'bs.pavankumar2005@gmail.com') {
      console.warn(`[Resend Sandbox Notice]: Cannot send to "${contactEmail}" with test sender "${fromAddress}". Diverting to registered account email "bs.pavankumar2005@gmail.com" to ensure successful transmission.`);
      contactEmail = 'bs.pavankumar2005@gmail.com';
    }

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();
    const timestamp = new Date().toISOString();

    const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  <h2 style="color: #111; margin-top: 0;">New Portfolio Contact Message</h2>
  <p style="margin: 4px 0;"><strong>Name:</strong> ${safeName}</p>
  <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
  <p style="margin: 4px 0;"><strong>Date:</strong> ${timestamp}</p>
  <hr style="border: none; border-top: 1px solid #eaeaea; margin: 16px 0;" />
  <h3 style="color: #333; margin-bottom: 8px;">Message:</h3>
  <p style="white-space: pre-wrap; line-height: 1.6; color: #444; background: #f9f9f9; padding: 12px; border-radius: 4px;">${safeMessage}</p>
  <hr style="border: none; border-top: 1px solid #eaeaea; margin: 16px 0;" />
  <p style="font-size: 12px; color: #888; margin-bottom: 0;">Sent via personal portfolio contact form</p>
</div>
    `;

    const resend = new Resend(apiKey);

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      subject: `📩 New Portfolio Contact from ${safeName}`,
      html: htmlBody,
      replyTo: safeEmail,
    });

    if (resendError) {
      console.error('[Resend API Error]:', JSON.stringify(resendError, null, 2));
      return res.status(500).json({
        success: false,
        error: 'Unable to send message at this time. Please try again later.',
      });
    }

    console.log('[Contact Success]: Email sent successfully with ID:', resendData?.id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Internal Server Error in /api/contact]:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request.',
    });
  }
}
