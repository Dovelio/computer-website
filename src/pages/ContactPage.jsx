import React, { useState, useRef, useEffect } from 'react';
import Icon from '../components/Icon';
import { BUSINESS_INFO } from '../data/businessInfo';
import { SERVICES } from '../data/services';
import { getGeneralWhatsAppUrl, getWhatsAppUrl } from '../utils/whatsapp';
import {
  createPageAnimation,
  animateSectionHeader,
  animateStaggerCards,
  animateFadeSlide,
  gsap
} from '../utils/animations';

import '../styles/contactPage.css';

export default function ContactPage() {
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    preferredMode: 'WhatsApp',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GSAP Animations
  useEffect(() => {
    return createPageAnimation(pageRef, () => {
      // 1. Header Banner Entrance
      gsap.fromTo(
        '.contact-banner-content > *',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );

      // 2. Top 4 Action Cards
      animateStaggerCards('.contact-actions-grid', '.contact-action-card', 0.1);

      // 3. Form and Map Columns
      animateFadeSlide('.contact-grid', '.contact-form-card', -25);
      animateFadeSlide('.contact-grid', '.contact-info-col', 25, 0.15);

      // 4. Final Section: Visiting FAQs Section Header & Cards Entrance
      animateSectionHeader('.contact-faq-header');
      animateStaggerCards('.contact-faq-grid', '.contact-faq-card', 0.12);
    });
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone / WhatsApp number';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formData.service) {
      newErrors.service = 'Please select the required service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details or query regarding your requirement';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 350);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      service: '',
      preferredMode: 'WhatsApp',
      message: ''
    });
    setErrors({});
  };

  const whatsappForwardUrl = getWhatsAppUrl(
    `Hello, my name is ${formData.name}. Phone: ${formData.phone}. Service Needed: ${formData.service || 'General'}. Preferred Reply: ${formData.preferredMode}. Query Details: ${formData.message}`
  );

  return (
    <div className="contact-page" ref={pageRef}>
      {/* 1. Page Header Banner (No Breadcrumbs) */}
      <section className="page-hero-banner" aria-label="Contact Page Introduction">
        <div className="container contact-banner-content">
          <span className="section-badge">Get In Touch</span>
          <h1 className="page-hero-title">
            Contact {BUSINESS_INFO.name}
          </h1>
          <p className="page-hero-subtitle">
            Located near Rajiv Junction on Colachel Road, Karungal, Kanyakumari. Walk in directly, give our desk a call, or submit an online enquiry below.
          </p>
        </div>
      </section>

      {/* 2. Top 4 Action Highlight Cards */}
      <div className="container">
        <div className="contact-actions-grid">
          {/* Phone Call */}
          <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="phone" size={22} />
            </div>
            <h3>Telephone / Mobile</h3>
            <div className="contact-action-value">{BUSINESS_INFO.phoneDisplay}</div>
            <p className="contact-action-desc">Immediate call assistance during shop operating hours</p>
          </a>

          {/* WhatsApp */}
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-card whatsapp-card"
          >
            <div className="contact-action-icon">
              <Icon name="whatsapp" size={22} />
            </div>
            <h3>WhatsApp Helpline</h3>
            <div className="contact-action-value" style={{ color: '#16a34a' }}>
              {BUSINESS_INFO.whatsappDisplay}
            </div>
            <p className="contact-action-desc">Fastest reply for document checklists & file dispatches</p>
          </a>

          {/* Location */}
          <div className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="map-pin" size={22} />
            </div>
            <h3>Center Address</h3>
            <div className="contact-action-value" style={{ fontSize: '0.875rem' }}>
              {BUSINESS_INFO.address.line1}
            </div>
            <p className="contact-action-desc">{BUSINESS_INFO.address.landmark}</p>
          </div>

          {/* Hours */}
          <div className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="clock" size={22} />
            </div>
            <h3>Operating Hours</h3>
            <div className="contact-action-value" style={{ fontSize: '0.875rem' }}>
              {BUSINESS_INFO.hours.weekdays}
            </div>
            <p className="contact-action-desc">Sunday: 9:00 AM – 2:00 PM</p>
          </div>
        </div>
      </div>

      {/* 3. Main Form & Map Section */}
      <section className="section" style={{ paddingTop: 0 }} aria-label="Contact Form and Location Map">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form Card */}
            <div className="contact-form-card">
              <div className="form-header">
                <h3>Send an Online Enquiry</h3>
                <p>Fill out the form below with your requirements. We review and respond promptly.</p>
              </div>

              <div className="form-demo-notice">
                <Icon name="info" size={16} />
                <span>
                  <strong>Quick Assistance:</strong> You can submit this enquiry or forward it directly to our WhatsApp with 1 click.
                </span>
              </div>

              {submitted ? (
                <div className="form-alert form-alert-success" role="status">
                  <Icon name="check-circle" size={24} />
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem', color: '#166534', fontSize: '1.05rem' }}>
                      Enquiry Recorded Successfully!
                    </h4>
                    <p style={{ margin: '0 0 0.75rem', color: '#15803d', fontSize: '0.875rem' }}>
                      Thank you, <strong>{formData.name}</strong>. Your enquiry for <strong>{formData.service}</strong> has been logged. For faster processing, you can also forward this exact message directly to our official WhatsApp.
                    </p>

                    <div className="form-alert-actions">
                      <a
                        href={whatsappForwardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                      >
                        <Icon name="whatsapp" size={16} />
                        <span>Forward to WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={handleReset}
                      >
                        Submit Another Query
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="contact-name">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span className="form-error-msg">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="contact-phone">
                      Phone / WhatsApp Number <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="e.g. 9442256007"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                  </div>

                  {/* Service Dropdown */}
                  <div className="form-group">
                    <label htmlFor="contact-service">
                      Required Service <span className="required-star">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      className={`form-select ${errors.service ? 'input-error' : ''}`}
                      value={formData.service}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.service}
                    >
                      <option value="">-- Select a Service --</option>
                      <optgroup label="Government Documentation">
                        {SERVICES.filter((s) => s.category === 'govt').map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Travel & Ticket Booking">
                        {SERVICES.filter((s) => s.category === 'travel').map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Printing & Computer Services">
                        {SERVICES.filter((s) => s.category === 'printing').map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.service && <span className="form-error-msg">{errors.service}</span>}
                  </div>

                  {/* Preferred Reply Mode */}
                  <div className="form-group">
                    <label>Preferred Reply Mode</label>
                    <div className="form-radio-row">
                      <label className="form-radio-label">
                        <input
                          type="radio"
                          name="preferredMode"
                          value="WhatsApp"
                          checked={formData.preferredMode === 'WhatsApp'}
                          onChange={handleChange}
                        />
                        <span>WhatsApp Message</span>
                      </label>
                      <label className="form-radio-label">
                        <input
                          type="radio"
                          name="preferredMode"
                          value="Phone Call"
                          checked={formData.preferredMode === 'Phone Call'}
                          onChange={handleChange}
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="form-radio-label">
                        <input
                          type="radio"
                          name="preferredMode"
                          value="Walk-in Discussion"
                          checked={formData.preferredMode === 'Walk-in Discussion'}
                          onChange={handleChange}
                        />
                        <span>Walk-in Discussion</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="contact-message">
                      Details / Requirements <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="3"
                      className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                      placeholder="Mention your requirements, preferred timing, or questions..."
                      value={formData.message}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <span className="form-error-msg">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Online Enquiry</span>
                        <Icon name="arrow-right" size={17} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Practical Visiting Details Column */}
            <div className="contact-info-col">
              {/* Google Map Card */}
              <div className="map-card">
                <div className="map-header">
                  <span>{BUSINESS_INFO.name} Location</span>
                  <span className="tag">Karungal, Kanyakumari</span>
                </div>
                <div className="map-frame-wrap">
                  <iframe
                    title="Jose Computers and Internet Centre Google Map Location"
                    src={BUSINESS_INFO.mapEmbedUrl}
                    className="map-frame"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen=""
                  />
                </div>
              </div>

              {/* Landmark & Travel Directions Box */}
              <div className="map-directions-box">
                <h4>
                  <Icon name="compass" size={18} />
                  <span>How to Reach Our Center</span>
                </h4>

                <div className="directions-list">
                  <div className="direction-item">
                    <Icon name="map-pin" size={16} />
                    <div>
                      <strong>Landmark: </strong>
                      Near Rajiv Junction, Colachel Road, Karungal, Kanyakumari - 629157.
                    </div>
                  </div>

                  <div className="direction-item">
                    <Icon name="car" size={16} />
                    <div>
                      <strong>Parking: </strong>
                      {BUSINESS_INFO.parking}.
                    </div>
                  </div>

                  <div className="direction-item">
                    <Icon name="credit-card" size={16} />
                    <div>
                      <strong>Accepted Payments: </strong>
                      {BUSINESS_INFO.paymentMethods}.
                    </div>
                  </div>

                  <div className="direction-item">
                    <Icon name="printer" size={16} />
                    <div>
                      <strong>Express Printout Collection: </strong>
                      {BUSINESS_INFO.advancePrintingHint}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Visiting FAQs (The Final Section of Contact Page) */}
      <section className="section section-alt contact-faq-section" aria-label="Visiting Questions & Answers">
        <div className="container">
          <div className="section-header contact-faq-header">
            <span className="section-badge">Common Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers about visiting our centre in Karungal, document submissions, and application processing.
            </p>
          </div>

          <div className="contact-faq-grid">
            <div className="contact-faq-card">
              <h4>
                <Icon name="check-circle" size={18} />
                <span>Do I need to make an appointment before visiting?</span>
              </h4>
              <p>
                No appointment is needed. You are welcome to walk into {BUSINESS_INFO.name} in Karungal any time during business hours ({BUSINESS_INFO.hours.weekdays}). Our staff will assist you directly.
              </p>
            </div>

            <div className="contact-faq-card">
              <h4>
                <Icon name="check-circle" size={18} />
                <span>Can I send files by WhatsApp or Email for printing?</span>
              </h4>
              <p>
                Yes! You can WhatsApp your PDF documents, images, or resume to our helpline or email them to our address. Let us know whether you need B&W or Color prints, and they will be ready when you arrive.
              </p>
            </div>

            <div className="contact-faq-card">
              <h4>
                <Icon name="check-circle" size={18} />
                <span>What payment modes do you accept at the counter?</span>
              </h4>
              <p>
                We accept all major UPI QR options (Google Pay, PhonePe, Paytm, BHIM), Cash, and Debit/Credit cards. Transparent receipts are provided for all transactions.
              </p>
            </div>

            <div className="contact-faq-card">
              <h4>
                <Icon name="check-circle" size={18} />
                <span>Can you help if I do not understand the portal questions?</span>
              </h4>
              <p>
                Absolutely. Our technicians sit with you, translate the questions into your preferred local language, and ensure all entries are verified with you on screen before final submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
