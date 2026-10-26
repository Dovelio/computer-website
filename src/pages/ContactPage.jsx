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

/**
 * Generates a simple random addition challenge for spam protection (e.g. 3 + 5, 7 + 2, 4 + 9)
 */
function generateMathCaptcha() {
  const num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
  const num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
  const answer = num1 + num2;

  return {
    expression: `${num1} + ${num2}`,
    answer
  };
}

export default function ContactPage() {
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    _botField: ''
  });

  const [captcha, setCaptcha] = useState(() => generateMathCaptcha());
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateMathCaptcha());
    setCaptchaAnswer('');
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.captcha;
      return copy;
    });
  };

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

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select the required service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details or query regarding your requirement';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long';
    }

    // Mathematical CAPTCHA validation (Simple addition)
    if (!captchaAnswer.trim()) {
      newErrors.captcha = 'Please solve the addition question';
    } else if (parseInt(captchaAnswer.trim(), 10) !== captcha.answer) {
      newErrors.captcha = 'Incorrect answer. Please solve the addition question.';
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

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to deliver enquiry email. Please call us directly or message via WhatsApp.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      handleRefreshCaptcha();
    } catch (err) {
      console.error('Contact form submission error:', err);
      setIsSubmitting(false);
      setSubmitError(err.message || 'Unable to send enquiry at this time. Please contact us directly by phone or WhatsApp.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      _botField: ''
    });
    setErrors({});
    handleRefreshCaptcha();
  };

  const whatsappForwardUrl = getWhatsAppUrl(
    `Hello, my name is ${formData.name}. Phone: ${formData.phone}. Email: ${formData.email || 'N/A'}. Service Needed: ${formData.service || 'General'}. Query Details: ${formData.message}`
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
            Located at Rajiv Junction, Karungal - 629157, Kanyakumari District. Walk in directly, call our desk, or submit an online enquiry below.
          </p>
        </div>
      </section>

      {/* 2. Top 4 Action Highlight Cards */}
      <div className="container">
        <div className="contact-actions-grid">
          {/* Phone Call */}
          <div className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="phone" size={22} />
            </div>
            <h3>Call Our Desk</h3>
            <div className="contact-action-value">
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <a href={`tel:${BUSINESS_INFO.phoneSecondaryRaw}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block', fontSize: '0.88rem' }}>
                {BUSINESS_INFO.phoneSecondary}
              </a>
              <a href={`tel:${BUSINESS_INFO.phoneLandlineRaw}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Landline: {BUSINESS_INFO.phoneLandline}
              </a>
            </div>
            <p className="contact-action-desc">Direct phone assistance during business hours</p>
          </div>

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
            <h3>WhatsApp & Email</h3>
            <div className="contact-action-value" style={{ color: '#16a34a' }}>
              {BUSINESS_INFO.whatsappDisplay}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.35rem', wordBreak: 'break-all' }}>
              {BUSINESS_INFO.email}
            </div>
            <p className="contact-action-desc">Fast replies for document checklists & inquiries</p>
          </a>

          {/* Location */}
          <div className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="map-pin" size={22} />
            </div>
            <h3>Center Location</h3>
            <div className="contact-action-value" style={{ fontSize: '0.875rem' }}>
              {BUSINESS_INFO.address.line1}
            </div>
            <p className="contact-action-desc">Karungal - 629157, Kanyakumari District</p>
          </div>

          {/* Hours & Management */}
          <div className="contact-action-card">
            <div className="contact-action-icon">
              <Icon name="clock" size={22} />
            </div>
            <h3>Proprietor & Hours</h3>
            <div className="contact-action-value" style={{ fontSize: '0.875rem' }}>
              {BUSINESS_INFO.proprietor}
            </div>
            <p className="contact-action-desc">
              {BUSINESS_INFO.hours.weekdays}<br />
              Sunday: 9:00 AM – 2:00 PM
            </p>
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
                  <strong>Quick Delivery:</strong> Your enquiry will be emailed directly to our desk and our team will get in touch promptly.
                </span>
              </div>

              {submitError && (
                <div className="form-alert form-alert-error" role="alert" style={{ marginBottom: '1.25rem' }}>
                  <Icon name="info" size={20} color="#b91c1c" />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Could Not Send Email:</strong>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="form-alert form-alert-success" role="status">
                  <Icon name="check-circle" size={24} />
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem', color: '#166534', fontSize: '1.05rem' }}>
                      Enquiry Sent Successfully!
                    </h4>
                    <p style={{ margin: '0 0 0.75rem', color: '#15803d', fontSize: '0.875rem' }}>
                      Thank you, <strong>{formData.name}</strong>. Your enquiry regarding <strong>{formData.service}</strong> has been emailed directly to our desk. We will review your requirements and respond promptly.
                    </p>

                    <div className="form-alert-actions">
                      <a
                        href={whatsappForwardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                      >
                        <Icon name="whatsapp" size={16} />
                        <span>Also Message on WhatsApp</span>
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
                  {/* Anti-spam honeypot field (hidden from users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="_botField"
                      tabIndex="-1"
                      autoComplete="off"
                      value={formData._botField}
                      onChange={handleChange}
                    />
                  </div>

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

                  {/* Email Address */}
                  <div className="form-group">
                    <label htmlFor="contact-email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="e.g. yourname@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
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
                      placeholder="e.g. 9442358907"
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
                      <optgroup label="Government & CSC Documentation">
                        {SERVICES.filter((s) => s.category === 'govt').map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Jose Tours & Travel Services">
                        {SERVICES.filter((s) => s.category === 'travel').map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Education & Admission Services">
                        {SERVICES.filter((s) => s.category === 'education').map((s) => (
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

                  {/* Anti-Spam Simple Addition CAPTCHA */}
                  <div className="form-group captcha-form-group">
                    <label htmlFor="contact-captcha">
                      Spam Protection: Solve the simple addition <span className="required-star">*</span>
                    </label>
                    <div className="captcha-widget-row">
                      <div className="captcha-display-badge" aria-label={`Addition question: ${captcha.expression} equals`}>
                        <span className="captcha-equation">{captcha.expression}</span>
                        <span className="captcha-equals">=</span>
                      </div>
                      <input
                        type="number"
                        id="contact-captcha"
                        name="captcha"
                        className={`form-input captcha-input ${errors.captcha ? 'input-error' : ''}`}
                        placeholder="?"
                        value={captchaAnswer}
                        onChange={(e) => {
                          setCaptchaAnswer(e.target.value);
                          if (errors.captcha) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.captcha;
                              return copy;
                            });
                          }
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.captcha}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="btn-captcha-refresh"
                        onClick={handleRefreshCaptcha}
                        title="Generate a new addition question"
                        aria-label="Refresh addition question"
                      >
                        <Icon name="refresh" size={15} />
                        <span>Refresh</span>
                      </button>
                    </div>
                    {errors.captcha && <span className="form-error-msg">{errors.captcha}</span>}
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
                      <strong>Address / Landmark: </strong>
                      Rajiv Junction, Karungal - 629157, Kanyakumari District.
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
