import { sendContactEmail } from '../server/mailHandler.js';

/**
 * Serverless API handler (Vercel, Netlify, or standard Node HTTP)
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON request payload.'
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Missing enquiry data.'
      });
    }

    const result = await sendContactEmail(body);
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been successfully delivered to Jose Computers.',
      messageId: result.messageId
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: err.message || 'Failed to send enquiry email. Please try again or contact us directly.'
    });
  }
}
