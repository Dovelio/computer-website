
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Custom Vite plugin providing /api/contact endpoint during local development
 */
function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = ''

          req.on('data', (chunk) => {
            body += chunk
          })

          req.on('end', async () => {
            try {
              const { sendContactEmail } = await import('./server/mailHandler.js')
              const payload = JSON.parse(body || '{}')
              const result = await sendContactEmail(payload)

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Your enquiry has been delivered successfully to Jose Computers.',
                  messageId: result.messageId
                })
              )
            } catch (err) {
              console.error('Vite dev server /api/contact error:', err)
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = err.statusCode || 500
              res.end(
                JSON.stringify({
                  success: false,
                  error: err.message || 'Failed to send email. Please try again or contact us directly.'
                })
              )
            }
          })
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 405
          res.end(JSON.stringify({
            success: false,
            error: 'Method not allowed. Use POST.'
          }))
        }
      })
    }
  }
}

export default defineConfig(({ command, mode }) => {
  // During local development (vite dev), base is '/' so that
  // http://localhost:5173/ and direct routes (e.g. /about, /services, /contact) work directly on refresh.
  // During production build (vite build) or preview, base is '/computer-website/' for GitHub Pages repository hosting.
  const isProduction = mode === 'production' || command === 'build' || command === 'preview';
  const base = process.env.VITE_BASE_PATH || (isProduction ? '/computer-website/' : '/');

  return {
    base,
    plugins: [react(), contactApiPlugin()]
  };
});
