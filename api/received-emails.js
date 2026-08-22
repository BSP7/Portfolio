import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Serverless handler to query received emails and attachments from Resend.
 *
 * Supported query patterns (GET):
 *  - List emails:               GET /api/received-emails?limit=20
 *  - Get specific email:        GET /api/received-emails?emailId=<email_id>
 *  - List email attachments:    GET /api/received-emails?emailId=<email_id>&attachments=true
 *  - Get specific attachment:   GET /api/received-emails?emailId=<email_id>&attachmentId=<attachment_id>
 */
export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only GET requests are accepted.',
    });
  }

  // Optional: Protect route with ADMIN_SECRET if configured in environment variables
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.query.secret;

    if (token !== adminSecret) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or missing administrative authorization secret.',
      });
    }
  }

  // Check API key configuration
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable.');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error: RESEND_API_KEY is not configured.',
    });
  }

  const { emailId, attachmentId, attachments, limit } = req.query;

  try {
    // 1. Fetch specific attachment
    if (emailId && attachmentId) {
      const { data, error } = await resend.attachments.receiving.get({
        id: attachmentId,
        emailId,
      });

      if (error) {
        console.error('Resend Get Attachment Error:', error);
        return res.status(400).json({ success: false, error });
      }

      return res.status(200).json({ success: true, data });
    }

    // 2. List attachments for a specific email
    if (emailId && (attachments === 'true' || attachments === '1')) {
      const { data, error } = await resend.attachments.receiving.list({
        emailId,
      });

      if (error) {
        console.error('Resend List Attachments Error:', error);
        return res.status(400).json({ success: false, error });
      }

      return res.status(200).json({ success: true, data });
    }

    // 3. Get single received email details
    if (emailId) {
      const { data, error } = await resend.emails.receiving.get(emailId);

      if (error) {
        console.error('Resend Get Received Email Error:', error);
        return res.status(400).json({ success: false, error });
      }

      return res.status(200).json({ success: true, data });
    }

    // 4. List all received emails (with optional limit)
    const queryOptions = {};
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100) {
        queryOptions.limit = parsedLimit;
      }
    }

    const { data, error } = await resend.emails.receiving.list(queryOptions);

    if (error) {
      console.error('Resend List Received Emails Error:', error);
      return res.status(400).json({ success: false, error });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Internal Server Error in /api/received-emails:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while communicating with Resend.',
    });
  }
}
