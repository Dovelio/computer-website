import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Icon from './Icon';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl, getWhatsAppUrl } from '../utils/whatsapp';

// High-resolution photography for each service
import serviceGovtImg from '../assets/images/service-govt.jpg';
import servicePrintingImg from '../assets/images/service-printing.jpg';
import serviceTravelImg from '../assets/images/service-travel.jpg';

import '../styles/heroCarousel.css';

const SLIDE_DURATION = 5000; // 5 seconds per slide

const BANNER_SLIDES = [
  {
    id: 'banner-govt',
    tabTitle: 'Government Services',
    tabIcon: 'shield',
    tag: 'E-Governance & Documentation',
    title: 'Aadhaar, PAN & Passport Portal Filing',
    shortHook: 'Official online applications with error-free personal verification.',
    highlights: ['1-on-1 Personal Assistance', 'Official Portal Receipts', 'Strict Privacy Guaranteed'],
    primaryBtn: {
      text: 'Explore Documentation',
      to: '/services?cat=govt'
    },
    secondaryBtn: {
      text: 'WhatsApp Assistance',
      href: getWhatsAppUrl('Hello, I need assistance with government document filing at Jose Computers Karungal.')
    },
    image: serviceGovtImg,
    alt: 'Government document filing, passport application, and portal verification desk at Jose Computers'
  },
  {
    id: 'banner-printing',
    tabTitle: 'Laser Printing & Xerox',
    tabIcon: 'printer',
    tag: 'Laser Xerox & Document Finishing',
    title: 'High-Speed Commercial Laser Printing & Scanning',
    shortHook: '1200 DPI crisp prints, high-volume copies, and spiral binding.',
    highlights: ['1200 DPI Laser Prints', '600 DPI Document Scanning', 'Send PDF via WhatsApp'],
    primaryBtn: {
      text: 'View Printing Services',
      to: '/services?cat=printing'
    },
    secondaryBtn: {
      text: 'Send Files to Print',
      href: getWhatsAppUrl('Hello, I want to send a PDF document for printing at Jose Computers Karungal.')
    },
    image: servicePrintingImg,
    alt: 'High-speed commercial Canon laser printer, bulk photocopy station, and scanning setup at Jose Computers'
  },
  {
    id: 'banner-travel',
    tabTitle: 'Travel & Ticket Booking',
    tabIcon: 'map-pin',
    tag: 'Instant Travel Ticketing',
    title: 'Confirmed Train, Bus & Flight Bookings',
    shortHook: 'IRCTC Tatkaal assistance, AC sleeper buses, and air tickets.',
    highlights: ['IRCTC Train & Tatkaal Help', 'All Major Sleeper Buses', 'Instant Boarding Passes'],
    primaryBtn: {
      text: 'Book Travel Tickets',
      to: '/services?cat=travel'
    },
    secondaryBtn: {
      text: 'Check Availability',
      href: getWhatsAppUrl('Hello, I want to check train or bus ticket availability at Jose Computers.')
    },
    image: serviceTravelImg,
    alt: 'Travel reservation counter, airline flight ticketing, and IRCTC train booking desk at Jose Computers'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerContainerRef = useRef(null);
  const actionCardRef = useRef(null);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);

  const totalSlides = BANNER_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx) => {
    if (idx !== currentSlide) {
      setCurrentSlide(idx);
    }
  };

  // Automatic timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentSlide]);

  // GSAP animation on slide change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 1. Animate active banner caption & image
    if (bannerContainerRef.current) {
      const activeSlideEl = bannerContainerRef.current.querySelector(
        `[data-slide-index="${currentSlide}"]`
      );
      if (activeSlideEl) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            activeSlideEl.querySelectorAll('.hero-banner-tag, .hero-banner-title, .hero-banner-hook'),
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out'
            }
          );

          gsap.fromTo(
            activeSlideEl.querySelector('.hero-banner-bg-img'),
            { scale: 1.05 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out'
            }
          );
        }, activeSlideEl);

        return () => ctx.revert();
      }
    }

    // 2. Animate slide-specific action card below banner
    if (actionCardRef.current) {
      const ctxCard = gsap.context(() => {
        gsap.fromTo(
          actionCardRef.current.querySelectorAll('.hero-slide-chip, .hero-slide-buttons-col .btn'),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out'
          }
        );
      }, actionCardRef.current);

      return () => ctxCard.revert();
    }
  }, [currentSlide]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const activeSlideData = BANNER_SLIDES[currentSlide];

  return (
    <section className="hero-section" aria-label="Jose Computers Services Introduction & Carousel">
      <div className="container hero-inner-container">
        {/* Screen-reader accessible H1 for proper page heading hierarchy */}
        <h1 className="sr-only">Jose Computers - Premier Digital Services & Internet Centre Karungal</h1>

        {/* ========================================================
            LARGE ATTRACTIVE AUTOMATIC CAROUSEL BANNER
            ======================================================== */}
        <div
          className="hero-banner-viewport"
          ref={bannerContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-live="polite"
        >
          {BANNER_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                data-slide-index={index}
                className={`hero-banner-slide ${isActive ? 'active-banner' : ''}`}
                aria-hidden={!isActive}
                role="group"
                aria-roledescription="slide"
                aria-label={`Banner ${index + 1} of ${totalSlides}: ${slide.title}`}
              >
                {/* Full-width High Resolution Banner Photograph */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-banner-bg-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Soft, non-intrusive gradient overlay - keeps the image vivid and open */}
                <div className="hero-banner-scrim" />

                {/* Minimal, Clean Content Overlay with Ample Breathing Space */}
                <div className="hero-banner-caption">
                  <span className="hero-banner-tag">
                    <Icon name={slide.tabIcon} size={14} />
                    <span>{slide.tag}</span>
                  </span>

                  <h2 className="hero-banner-title">{slide.title}</h2>

                  <p className="hero-banner-hook">{slide.shortHook}</p>
                </div>
              </div>
            );
          })}

          {/* Left Arrow */}
          <button
            type="button"
            className="banner-nav-btn banner-nav-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
            id="hero-banner-prev"
          >
            <Icon name="chevron-left" size={20} />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            className="banner-nav-btn banner-nav-next"
            onClick={nextSlide}
            aria-label="Next slide"
            id="hero-banner-next"
          >
            <Icon name="chevron-right" size={20} />
          </button>

          {/* Clean Slide Status Indicator */}
          <div className="banner-status-badge">
            <div className="banner-dots-row">
              {BANNER_SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  className={`banner-dot-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <span className="banner-counter-text">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>
        </div>

        {/* ========================================================
            3. MINIMAL SLIDE-SPECIFIC CONTENT / CTA (BOTTOM)
            ======================================================== */}
        <div className="hero-slide-cta-wrapper">
          {/* Service Switcher Tabs */}
          <div className="hero-slide-tabs" role="tablist" aria-label="Service carousel navigation">
            {BANNER_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`hero-slide-tab-btn ${isActive ? 'active-tab' : ''}`}
                  onClick={() => goToSlide(index)}
                  id={`hero-tab-${index}`}
                >
                  <div className="hero-tab-icon-wrap">
                    <Icon name={slide.tabIcon} size={18} />
                  </div>
                  <div className="hero-tab-text">
                    <span className="hero-tab-num">0{index + 1}</span>
                    <span className="hero-tab-title">{slide.tabTitle}</span>
                  </div>
                  {isActive && (
                    <span
                      className={`hero-tab-progress-bar ${isPaused ? 'is-paused' : ''}`}
                      key={`progress-${currentSlide}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Slide-Specific Highlights & Action Buttons */}
          <div className="hero-slide-action-card" ref={actionCardRef}>
            <div className="hero-slide-highlights-col">
              <span className="hero-slide-service-name">
                {activeSlideData.tag}
              </span>
              <div className="hero-slide-chips">
                {activeSlideData.highlights.map((item, idx) => (
                  <span key={idx} className="hero-slide-chip">
                    <Icon name="check-circle" size={14} color="var(--color-brand)" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-slide-buttons-col">
              <Link
                to={activeSlideData.primaryBtn.to}
                className="btn btn-primary"
                id={`hero-action-primary-${currentSlide}`}
              >
                <span>{activeSlideData.primaryBtn.text}</span>
                <Icon name="arrow-right" size={16} />
              </Link>

              <a
                href={activeSlideData.secondaryBtn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                id={`hero-action-wa-${currentSlide}`}
              >
                <Icon name="whatsapp" size={17} />
                <span>{activeSlideData.secondaryBtn.text}</span>
              </a>
            </div>
          </div>

          {/* Bottom Fast Info Strip */}
          <div className="hero-bottom-strip">
            <div className="hero-bottom-item">
              <div className="hero-bottom-icon">
                <Icon name="clock" size={18} />
              </div>
              <div className="hero-bottom-text">
                <span className="hero-bottom-label">Opening Hours</span>
                <span className="hero-bottom-val">{BUSINESS_INFO.hours.weekdays}</span>
              </div>
            </div>

            <div className="hero-bottom-item">
              <div className="hero-bottom-icon">
                <Icon name="map-pin" size={18} />
              </div>
              <div className="hero-bottom-text">
                <span className="hero-bottom-label">Karungal Center</span>
                <span className="hero-bottom-val">Colachel Road, Near Rajiv Junction</span>
              </div>
            </div>

            <div className="hero-bottom-item">
              <div className="hero-bottom-icon">
                <Icon name="user-check" size={18} />
              </div>
              <div className="hero-bottom-text">
                <span className="hero-bottom-label">Personal Service</span>
                <span className="hero-bottom-val">Walk-In Welcome • 1-on-1 Guidance</span>
              </div>
            </div>

            <div className="hero-bottom-action">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <Icon name="message-square" size={15} />
                <span>Quick Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
