import React from 'react';
import Icon from './Icon';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import '../styles/whatsapp.css';

export default function WhatsAppButton() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <div className="floating-whatsapp-wrap">
      <div className="floating-whatsapp-tooltip">
        <Icon name="whatsapp" size={14} color="#25d366" />
        <span>Need Help? Chat on WhatsApp</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with our computer center on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <span className="whatsapp-pulse-ring" aria-hidden="true" />
        <Icon name="whatsapp" size={32} color="#ffffff" />
      </a>
    </div>
  );
}
