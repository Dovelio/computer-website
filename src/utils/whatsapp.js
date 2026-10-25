import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Creates a clean WhatsApp click-to-chat URL with a prefilled message.
 * @param {string} message - Text message to prefill in WhatsApp
 * @param {string} [phone] - Optional phone number override (defaults to BUSINESS_INFO.whatsappRaw)
 * @returns {string} Fully encoded WhatsApp URL
 */
export function getWhatsAppUrl(message, phone = BUSINESS_INFO.whatsappRaw) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generate prefilled WhatsApp URL for a specific service enquiry.
 * Example requirement: "Hello, I would like to enquire about your PAN card service."
 * @param {string} serviceName - Name of the service
 * @returns {string} WhatsApp URL
 */
export function getServiceEnquiryWhatsAppUrl(serviceName) {
  const message = `Hello, I would like to enquire about your ${serviceName} service. Please guide me on required documents and process.`;
  return getWhatsAppUrl(message);
}

/**
 * General WhatsApp enquiry URL for quick contact
 * @returns {string} WhatsApp URL
 */
export function getGeneralWhatsAppUrl() {
  const message = `Hello, I need assistance with digital services at your computer center. Could you please provide information?`;
  return getWhatsAppUrl(message);
}
