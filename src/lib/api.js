import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends a contact form message via EmailJS.
 * The email lands directly in uzairanjummrana@gmail.com.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} payload
 */
export async function submitContact({ name, email, subject, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS environment variables are not configured. See .env file.')
  }

  // These keys must match the variables in your EmailJS template
  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    subject: subject || '(No subject)',
    message,
  }

  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY,
  )

  if (response.status !== 200) {
    throw new Error(`EmailJS error: ${response.text}`)
  }

  return response
}
