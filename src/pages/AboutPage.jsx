import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { BUSINESS_INFO } from '../data/businessInfo';
import { ABOUT_MILESTONES, ABOUT_VALUES, ABOUT_EQUIPMENT } from '../data/services';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  createPageAnimation,
  animateSectionHeader,
  animateStaggerCards,
  animateFadeSlide,
  gsap
} from '../utils/animations';

import aboutImage from '../assets/images/about-center.jpg';
import '../styles/aboutPage.css';

export default function AboutPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    return createPageAnimation(pageRef, () => {
      // 1. Header Banner Reveal
      gsap.fromTo(
        '.about-banner-content > *',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power2.out'
        }
      );

      // 2. Story Grid Reveal
      animateFadeSlide('.about-story-grid', '.about-story-visual', -25);
      animateFadeSlide('.about-story-grid', '.about-story-content', 25, 0.1);

      // 3. Section Headers
      animateSectionHeader('.about-section-header');

      // 4. Milestone Stats Cards
      animateStaggerCards('.about-stats-grid', '.about-stat-card', 0.1);

      // 5. Core Values Cards
      animateStaggerCards('.about-values-grid', '.about-value-card', 0.12);

      // 6. Commitment Quote Box
      gsap.fromTo(
        '.about-quote-box',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-quote-box',
            start: 'top 85%'
          }
        }
      );

      // 7. Equipment Cards
      animateStaggerCards('.about-equip-grid', '.about-equip-card', 0.08);

      // 8. Bottom CTA Banner
      gsap.fromTo(
        '.about-cta-strip',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-cta-strip',
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  return (
    <div className="about-page" ref={pageRef}>
      {/* 1. Page Header Banner (No Breadcrumbs) */}
      <section className="page-hero-banner" aria-label="About Page Introduction">
        <div className="container about-banner-content">
          <span className="section-badge">About Our Center</span>
          <h1 className="page-hero-title">
            Bridging the Digital Divide with Patient, Dependable Service
          </h1>
          <p className="page-hero-subtitle">
            Founded in {BUSINESS_INFO.establishedYear}, {BUSINESS_INFO.name} was built with a single goal: to make government portals, online documentation, travel ticketing, and high-speed printing accessible, stress-free, and mistake-free for every resident.
          </p>
        </div>
      </section>

      {/* 2. Authentic Story & Origin */}
      <section className="section" aria-label="Our Story & Background">
        <div className="container">
          <div className="about-story-grid">
            {/* Visual Frame */}
            <div className="about-story-visual">
              <div className="about-story-img-card">
                <img
                  src={aboutImage}
                  alt="Customer assistance desk, high-speed printers, and workstations at Jose Computers Karungal"
                  className="about-story-img"
                  width="560"
                  height="440"
                  loading="eager"
                />
              </div>

              <div className="about-story-floating-badge">
                <span className="about-story-floating-years">{BUSINESS_INFO.experienceYears}</span>
                <span className="about-story-floating-lbl">Years In Karungal</span>
              </div>
            </div>

            {/* Story Narrative */}
            <div className="about-story-content">
              <span className="section-badge">How We Began</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.15rem' }}>
                From a Single Computer to Your Neighborhood Digital Center
              </h2>

              <p className="about-story-lead">
                Over the last decade, government departments, examination boards, and travel operators moved almost entirely online. For many in Karungal and nearby villages, this created confusion with complex English forms, strict file size limits, and portal payment gateway failures.
              </p>

              <p className="about-story-paragraph">
                In 2014, we opened our doors at Rajiv Junction, Karungal to change that. Instead of treating customers like numbers in a queue, we sit with every individual side-by-side. We verify every name spelling against your original ID cards, ensure passport photos meet exact dimension requirements, and make sure that you walk out with verified acknowledgement receipts.
              </p>

              <p className="about-story-paragraph">
                Today, whether you are a college student submitting a competitive exam application, a family planning a train journey, or a senior citizen verifying pension documentation, our experienced technicians treat your work with utmost care.
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-primary">
                  <span>Explore What We Do</span>
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  <span>Find Our Location</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Milestones & Proven Track Record */}
      <section className="section section-alt" aria-label="Key Milestones & Track Record">
        <div className="container">
          <div className="section-header about-section-header">
            <span className="section-badge">Proven Track Record</span>
            <h2 className="section-title">A Decade of Real Results</h2>
            <p className="section-subtitle">
              We take pride in our accuracy and consistent service to Karungal and neighboring villages across Kanyakumari.
            </p>
          </div>

          <div className="about-stats-grid">
            {ABOUT_MILESTONES.map((stat, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="about-stat-val">{stat.value}</div>
                <div className="about-stat-lbl">{stat.label}</div>
                <p className="about-stat-hint">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Operating Standards & Values */}
      <section className="section" aria-label="Our Operating Standards">
        <div className="container">
          <div className="section-header about-section-header">
            <span className="section-badge">How We Operate</span>
            <h2 className="section-title">Our Commitments to You</h2>
            <p className="section-subtitle">
              We run our computer centre on simple, transparent principles that put your peace of mind first.
            </p>
          </div>

          <div className="about-values-grid">
            {ABOUT_VALUES.map((val) => (
              <div key={val.id} className="about-value-card">
                <div className="about-value-icon">
                  <Icon name={val.icon} size={24} />
                </div>
                <div className="about-value-body">
                  <h3>{val.title}</h3>
                  <p>{val.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Founder Commitment Quote Box */}
          <div className="about-quote-box">
            <div className="about-quote-text">
              “Our promise is simple: we never rush an application. We understand how important a job form, passport slot, student admission, or travel ticket is to your family. If something is unclear, we take the extra time to verify it with you before clicking submit.”
            </div>
            <div className="about-quote-author">
              <div className="about-quote-avatar">TJ</div>
              <div>
                <div className="about-quote-name">{BUSINESS_INFO.proprietor}</div>
                <div className="about-quote-role">{BUSINESS_INFO.name} & {BUSINESS_INFO.travelDivisionName} • Rajiv Junction, Karungal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Center Hardware & Facilities */}
      <section className="section section-alt" aria-label="Center Equipment and Facilities">
        <div className="container">
          <div className="section-header about-section-header">
            <span className="section-badge">Our Infrastructure</span>
            <h2 className="section-title">Commercial Hardware for Quality & Speed</h2>
            <p className="section-subtitle">
              We invest in professional-grade machines so your printouts, scans, and portal submissions are completed without delays or poor quality.
            </p>
          </div>

          <div className="about-equip-grid">
            {ABOUT_EQUIPMENT.map((item, idx) => (
              <div key={idx} className="about-equip-card">
                <h4>
                  <Icon name="check-circle" size={16} color="var(--color-brand)" />
                  <span>{item.name}</span>
                </h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Regulatory Notice & Contact Invitation */}
      <section className="section" aria-label="Get In Touch">
        <div className="container">
          <div className="compliance-banner" style={{ marginTop: 0, marginBottom: '2.5rem' }}>
            <Icon name="info" size={20} className="notice-icon" />
            <div>
              <strong>Public Compliance Disclosure: </strong>
              {BUSINESS_INFO.complianceNotice}
            </div>
          </div>

          <div className="home-cta-strip about-cta-strip">
            <div className="home-cta-content">
              <h3>Have Questions or Need Assistance?</h3>
              <p>
                Drop by our centre at Rajiv Junction, Karungal - 629157, Kanyakumari District, or chat with our team on WhatsApp.
              </p>
            </div>

            <div className="home-cta-buttons">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <Icon name="whatsapp" size={18} />
                <span>Message on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <Icon name="map-pin" size={18} />
                <span>Visit Contact Page</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
