
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

export default defineConfig({
  base: '/computer-website/',
  plugins: [react(), contactApiPlugin()]
})
