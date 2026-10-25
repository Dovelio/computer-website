import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import '../styles/footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="container">
        {/* Main Footer Columns */}
        <div className="footer-grid">
          {/* Brand & Bio */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Icon name="shield-check" size={20} />
              </div>
              <span className="footer-brand-title">{BUSINESS_INFO.shortName}</span>
            </Link>

            <p className="footer-desc">
              {BUSINESS_INFO.shortBio}
            </p>

            <div className="footer-experience-tag">
              <Icon name="award" size={15} />
              <span>{BUSINESS_INFO.badge}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-col">
            <h4>Website Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>All Services</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>About Our Center</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="footer-col">
            <h4>Key Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services?cat=govt" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Aadhaar Portal Assistance</span>
                </Link>
              </li>
              <li>
                <Link to="/services?cat=govt" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>PAN Card Applications</span>
                </Link>
              </li>
              <li>
                <Link to="/services?cat=govt" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Passport Seva Appointments</span>
                </Link>
              </li>
              <li>
                <Link to="/services?cat=travel" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Bus & IRCTC Train Tickets</span>
                </Link>
              </li>
              <li>
                <Link to="/services?cat=printing" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Laser Printing & Xerox</span>
                </Link>
              </li>
              <li>
                <Link to="/services?cat=printing" className="footer-link">
                  <Icon name="chevron-right" size={14} />
                  <span>Online Exam & Job Form Filing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Center Details</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <Icon name="map-pin" size={16} />
                <span>{BUSINESS_INFO.address.fullDisplay}</span>
              </div>
              <div className="footer-contact-item">
                <Icon name="phone" size={16} />
                <span>
                  Phone: <a href={`tel:${BUSINESS_INFO.phoneRaw}`}>{BUSINESS_INFO.phoneDisplay}</a>
                </span>
              </div>
              <div className="footer-contact-item">
                <Icon name="whatsapp" size={16} />
                <span>
                  WhatsApp: <a href={getGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer">{BUSINESS_INFO.whatsappDisplay}</a>
                </span>
              </div>
              <div className="footer-contact-item">
                <Icon name="mail" size={16} />
                <span>
                  Email: <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
                </span>
              </div>
              <div className="footer-contact-item">
                <Icon name="clock" size={16} />
                <span>{BUSINESS_INFO.hours.weekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="footer-disclaimer-box">
          <strong>Important Regulatory Disclaimer: </strong>
          {BUSINESS_INFO.complianceNotice}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>
            © {CURRENT_YEAR} {BUSINESS_INFO.shortName}. All rights reserved. Providing trusted digital guidance and printing services in Karungal.
          </span>
          <div className="footer-bottom-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
