import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import HeroCarousel from '../components/HeroCarousel';
import { BUSINESS_INFO } from '../data/businessInfo';
import { FEATURED_CATEGORIES, POPULAR_HOME_SERVICES } from '../data/services';
import { getGeneralWhatsAppUrl, getWhatsAppUrl } from '../utils/whatsapp';
import {
  createPageAnimation,
  animateSectionHeader,
  animateStaggerCards,
  animateFadeSlide,
  gsap
} from '../utils/animations';

import serviceGovtImg from '../assets/images/service-govt.jpg';
import serviceTravelImg from '../assets/images/service-travel.jpg';
import serviceEducationImg from '../assets/images/service-education.jpg';
import servicePrintingImg from '../assets/images/service-printing.jpg';
import '../styles/home.css';

export default function HomePage() {
  const pageRef = useRef(null);

  const categoryImages = {
    govt: serviceGovtImg,
    travel: serviceTravelImg,
    education: serviceEducationImg,
    printing: servicePrintingImg
  };

  useEffect(() => {
    return createPageAnimation(pageRef, () => {
      // 1. Hero Bottom Highlight Strip Entrance
      gsap.fromTo(
        '.hero-bottom-item, .hero-bottom-action',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-bottom-strip',
            start: 'top 90%'
          }
        }
      );

      // 2. Section Headers
      animateSectionHeader('.home-section-header');

      // 3. Category Showcase Cards
      animateStaggerCards('.home-showcase-grid', '.home-showcase-card', 0.12);

      // 4. Popular Walk-in Services Grid
      animateStaggerCards('.popular-services-grid', '.popular-service-card', 0.08);

      // 5. Visitor Checklist Section
      animateFadeSlide('.checklist-grid', '.checklist-items-wrap', -25);
      animateFadeSlide('.checklist-grid', '.checklist-sidebar-card', 25, 0.15);

      // 6. Bottom Visit Strip
      gsap.fromTo(
        '.home-cta-strip',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.home-cta-strip',
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  return (
    <div className="home-page" ref={pageRef}>
      {/* 1. Hero Section with Top Intro, Large Banner Carousel & Bottom Strip */}
      <HeroCarousel />

      {/* 2. Core Departments / Visual Service Categories */}
      <section className="section section-alt" aria-label="Major Service Categories">
        <div className="container">
          <div className="section-header home-section-header">
            <span className="section-badge">Service Overview</span>
            <h2 className="section-title">Everything Handled In One Visit</h2>
            <p className="section-subtitle">
              Whether you need urgent document filing, bus and train tickets, or commercial laser printing, our centre in Karungal has you covered.
            </p>
          </div>

          <div className="home-showcase-grid">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?cat=${cat.id}`}
                className="home-showcase-card"
                aria-label={`Explore ${cat.title}`}
              >
                <div className="home-showcase-img-wrap">
                  <img
                    src={categoryImages[cat.imageKey]}
                    alt={cat.title}
                    className="home-showcase-img"
                    loading="lazy"
                  />
                  <span className="home-showcase-badge">{cat.count}</span>
                </div>
                <div className="home-showcase-body">
                  <span className="home-showcase-tag">{cat.tag}</span>
                  <h3 className="home-showcase-title">{cat.title}</h3>
                  <p className="home-showcase-desc">{cat.description}</p>
                  <div className="home-showcase-link">
                    <span>View Category Services</span>
                    <Icon name="arrow-right" size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn btn-primary btn-lg">
              <span>View All 35+ Professional Services</span>
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Popular Walk-in Services (Quick Finder) */}
      <section className="section" aria-label="Most Requested Daily Services">
        <div className="container">
          <div className="section-header home-section-header">
            <span className="section-badge">Frequent Requests</span>
            <h2 className="section-title">Most Popular Walk-In Services</h2>
            <p className="section-subtitle">
              Fast, accurate processing with clear turnarounds and upfront requirements before you visit.
            </p>
          </div>

          <div className="popular-services-grid">
            {POPULAR_HOME_SERVICES.map((item) => (
              <div key={item.id} className="popular-service-card">
                <div className="popular-card-top">
                  <div className="popular-icon-box">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <span className="popular-time-pill">{item.turnaround}</span>
                </div>

                <h3 className="popular-card-title">{item.title}</h3>
                <p className="popular-card-desc">{item.description}</p>

                <div className="popular-requirement-box">
                  <Icon name="check-circle" size={14} color="var(--color-brand)" />
                  <div>
                    <strong>Bring: </strong>
                    <span>{item.requirement}</span>
                  </div>
                </div>

                <div className="popular-card-footer">
                  <span className="tag">{item.category}</span>
                  <a
                    href={getWhatsAppUrl(`Hello, I would like to enquire about ${item.title} at Jose Computers Karungal.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <Icon name="whatsapp" size={14} />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What to Bring Checklist - Helpful & Authentic */}
      <section className="section section-alt" aria-label="Customer Preparation Guide">
        <div className="container">
          <div className="checklist-grid">
            {/* Checklist items */}
            <div>
              <span className="section-badge">Save Time On Your Visit</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                Simple Checklist Before You Visit
              </h2>
              <p className="about-text" style={{ marginBottom: '1.75rem' }}>
                To complete your government forms, certificate applications, or ticket bookings on your first visit without delays, keep these essentials ready:
              </p>

              <div className="checklist-items-wrap">
                <div className="checklist-item">
                  <div className="checklist-icon-box">
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <h4>Active Mobile with Aadhaar Link</h4>
                    <p>Nearly all government portals require an instant SMS OTP. Please ensure your registered mobile is with you and charged.</p>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="checklist-icon-box">
                    <Icon name="file-text" size={18} />
                  </div>
                  <div>
                    <h4>Original Identity & Address Proofs</h4>
                    <p>Keep original Aadhaar card, PAN card, or marks card handy for high-resolution 600 DPI scanning and verification.</p>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="checklist-icon-box">
                    <Icon name="camera" size={18} />
                  </div>
                  <div>
                    <h4>Recent Passport Photographs</h4>
                    <p>Keep 2 to 4 recent passport photos. Don't have one? We take and print studio-quality passport photos instantly at our shop.</p>
                  </div>
                </div>

                <div className="checklist-item">
                  <div className="checklist-icon-box">
                    <Icon name="printer" size={18} />
                  </div>
                  <div>
                    <h4>Send Files in Advance for Printing</h4>
                    <p>You can email your PDFs or send them to our official WhatsApp beforehand so your prints are ready when you arrive.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Notice Card */}
            <div className="checklist-sidebar-card">
              <span className="tag" style={{ background: 'rgba(32, 167, 219, 0.25)', color: '#7ce2ff', border: '1px solid rgba(124, 226, 255, 0.3)', width: 'fit-content', marginBottom: '1rem' }}>
                Karungal Community Centre
              </span>
              <h3>Need Help Before Leaving Home?</h3>
              <p>
                Unsure which specific documents are needed for your application? Send us a quick WhatsApp text or call our desk before walking in.
              </p>

              <div className="checklist-contact-points">
                <div className="checklist-point">
                  <Icon name="check-circle" size={16} />
                  <span>Immediate document checklist on WhatsApp</span>
                </div>
                <div className="checklist-point">
                  <Icon name="check-circle" size={16} />
                  <span>Transparent portal fee estimates</span>
                </div>
                <div className="checklist-point">
                  <Icon name="check-circle" size={16} />
                  <span>Parking available at Rajiv Junction, Karungal</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Icon name="whatsapp" size={18} />
                  <span>Message Us On WhatsApp</span>
                </a>
                <Link to="/contact" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)', background: 'transparent' }}>
                  <span>View Map & Directions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Invitation Banner */}
      <section className="section" aria-label="Visit Our Center">
        <div className="container">
          <div className="home-cta-strip">
            <div className="home-cta-content">
              <h3>Visit {BUSINESS_INFO.name} Today</h3>
              <p>
                {BUSINESS_INFO.address.fullDisplay} • Open {BUSINESS_INFO.hours.weekdays}. Walk in directly or reach us anytime for assistance.
              </p>
            </div>

            <div className="home-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <Icon name="map-pin" size={18} />
                <span>Get Center Directions</span>
              </Link>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn btn-outline btn-lg">
                <Icon name="phone" size={18} />
                <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
