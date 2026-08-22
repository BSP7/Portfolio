import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message, website } = req.body;

    // Spam Protection: Honeypot check
    // If the hidden 'website' field contains any value, silently reject.
    if (website && website.trim() !== '') {
      return res.status(200).json({ success: true });
    }

    // Validation: Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Validation failed: Name requires minimum 2 characters.' });
    }

    // Validation: Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Validation failed: Invalid email format.' });
    }

    // Validation: Message
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
      return res.status(400).json({ success: false, error: 'Validation failed: Message must be between 10 and 1000 characters.' });
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('Missing CONTACT_EMAIL environment variable.');
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();
    const timestamp = new Date().toISOString();

    const htmlBody = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Portfolio Contact</h2>
  <p><strong>Name:</strong><br/>${safeName}</p>
  <p><strong>Email:</strong><br/>${safeEmail}</p>
  <p><strong>Time:</strong><br/>${timestamp}</p>
  <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
  <h3>Message</h3>
  <p style="white-space: pre-wrap; line-height: 1.5;">${safeMessage}</p>
  <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
</div>
    `;

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      subject: `📩 New Portfolio Contact from ${safeName}`,
      html: htmlBody,
      replyTo: safeEmail,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Internal server error handling contact form:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
