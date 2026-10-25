import React from 'react';
import Icon from './Icon';
import { getServiceEnquiryWhatsAppUrl } from '../utils/whatsapp';

export default function ServiceCard({ service }) {
  const whatsappUrl = getServiceEnquiryWhatsAppUrl(service.title);

  return (
    <article className="service-card" id={`service-${service.id}`}>
      <div className="service-card-top">
        <div className="service-icon-box">
          <Icon name={service.icon} size={22} />
        </div>
        <span className="service-tag">{service.tag}</span>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>

      {/* Requirements hint if present */}
      {service.requirements && (
        <div className="service-requirement-hint">
          <Icon name="check-circle" size={13} color="var(--color-brand)" />
          <span><strong>Bring: </strong>{service.requirements}</span>
        </div>
      )}

      {/* Action CTA & Turnaround */}
      <div className="service-card-action">
        {service.turnaround && (
          <span className="service-turnaround-badge">
            <Icon name="clock" size={12} />
            <span>{service.turnaround}</span>
          </span>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="service-enquire-btn"
          aria-label={`Enquire on WhatsApp about ${service.title}`}
        >
          <Icon name="whatsapp" size={15} />
          <span>Enquire</span>
        </a>
      </div>
    </article>
  );
}
