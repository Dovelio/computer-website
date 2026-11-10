import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import ServiceCard from '../components/ServiceCard';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  SERVICE_CHECKLISTS
} from '../data/services';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  createPageAnimation,
  animateSectionHeader,
  animateStaggerCards,
  isReducedMotion,
  gsap
} from '../utils/animations';

import '../styles/servicesPage.css';

export default function ServicesPage() {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCat = searchParams.get('cat') || 'all';
  const activeCategory = ['all', 'govt', 'travel', 'education', 'printing'].includes(rawCat) ? rawCat : 'all';

  const [searchQuery, setSearchQuery] = useState('');

  // Small screen detection (mobile breakpoint <= 768px)
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const [visibleCount, setVisibleCount] = useState(10);
  const prevCountRef = useRef(10);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Reset pagination count on category or search change
  useEffect(() => {
    setVisibleCount(10);
    prevCountRef.current = 10;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: catId });
    }
  };

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: SERVICES.length };
    SERVICE_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = SERVICES.filter((s) => s.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter services by category and search term
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = service.title.toLowerCase().includes(q);
      const inDesc = service.description.toLowerCase().includes(q);
      const inTag = service.tag.toLowerCase().includes(q);
      const inReq = service.requirements?.toLowerCase().includes(q);

      return inTitle || inDesc || inTag || inReq;
    });
  }, [activeCategory, searchQuery]);

  // Handle deep-link to service: if target is beyond current visibleCount on mobile, expand to show it
  useEffect(() => {
    const focusService = searchParams.get('service') || searchParams.get('focus');
    if (focusService) {
      const targetIndex = filteredServices.findIndex((s) => s.id === focusService);
      if (targetIndex >= 0 && targetIndex >= visibleCount) {
        const needed = Math.ceil((targetIndex + 1) / 10) * 10;
        setVisibleCount(needed);
      }
    }
  }, [searchParams, filteredServices, visibleCount]);

  // Compute displayed services (batches of 10 on mobile, full list on desktop)
  const displayedServices = useMemo(() => {
    if (!isSmallScreen) {
      return filteredServices;
    }
    return filteredServices.slice(0, visibleCount);
  }, [filteredServices, isSmallScreen, visibleCount]);

  const hasMoreServices = isSmallScreen && visibleCount < filteredServices.length;

  // Page ScrollTrigger Setup
  useEffect(() => {
    return createPageAnimation(pageRef, () => {
      // 1. Header Banner Entrance
      gsap.fromTo(
        '.services-banner-content > *',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );

      // 2. Filter Controls Entrance
      gsap.fromTo(
        '.services-controls',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-controls',
            start: 'top 88%'
          }
        }
      );

      // 3. Section Headers
      animateSectionHeader('.services-section-header');

      // 4. Document Checklists Cards
      animateStaggerCards('.doc-checklists-grid', '.checklist-cat-card', 0.12);

      // 5. Pricing Guide Cards
      animateStaggerCards('.pricing-guide-grid', '.pricing-guide-card', 0.1);

      // 6. Bottom Help Strip
      gsap.fromTo(
        '.services-cta-strip',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-cta-strip',
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  // Animate service cards on filter/search change
  useEffect(() => {
    if (!gridRef.current || isReducedMotion()) return;

    const cards = gridRef.current.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out'
      }
    );
  }, [activeCategory, searchQuery]);

  // Animate newly revealed cards on small screen when clicking "See More"
  useEffect(() => {
    if (!gridRef.current || isReducedMotion()) return;
    if (visibleCount > prevCountRef.current) {
      const cards = gridRef.current.querySelectorAll('.service-card');
      const newCards = Array.from(cards).slice(prevCountRef.current);
      if (newCards.length) {
        gsap.fromTo(
          newCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out'
          }
        );
      }
    }
    prevCountRef.current = visibleCount;
  }, [visibleCount]);

  // Auto-scroll and highlight target service when arriving with ?service=... or ?focus=...
  // Or auto-scroll to the services catalog when arriving with a category filter or #catalog hash
  useEffect(() => {
    const focusService = searchParams.get('service') || searchParams.get('focus');

    if (focusService) {
      const timer = setTimeout(() => {
        const targetCard = document.getElementById(`service-${focusService}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.classList.add('service-card-focused');
          const removeTimer = setTimeout(() => {
            targetCard.classList.remove('service-card-focused');
          }, 3200);
          return () => clearTimeout(removeTimer);
        }
      }, 450);

      return () => clearTimeout(timer);
    }

    // When navigating with a category filter (e.g. from Home page cards) or #catalog hash
    const hasCategoryParam = searchParams.has('cat') && searchParams.get('cat') !== 'all';
    const hasCatalogHash = typeof window !== 'undefined' && window.location.hash === '#catalog';

    if (hasCategoryParam || hasCatalogHash) {
      const timer = setTimeout(() => {
        const catalogEl = document.getElementById('catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [searchParams, activeCategory]);

  return (
    <div className="services-page" ref={pageRef}>
      {/* 1. Page Header Banner (No Breadcrumbs) */}
      <section className="page-hero-banner" aria-label="Services Page Introduction">
        <div className="container services-banner-content">
          <span className="section-badge">Comprehensive Catalog</span>
          <h1 className="page-hero-title">
            Our Digital, Travel, Education & Printing Services
          </h1>
          <p className="page-hero-subtitle">
            Explore 40+ professional services across government documentation, Jose Tours & Travels (Passport, Visa, Stamping, Attestation, Tickets), education admissions & competitive exams, and high-speed laser printing at Rajiv Junction, Karungal. Every service is backed by verified checklists and patient 1-on-1 assistance.
          </p>
        </div>
      </section>

      {/* 2. Main Services Catalog with Search & Filter */}
      <section className="section" id="catalog" aria-label="All Services Catalog">
        <div className="container">
          {/* Controls: Category Tabs & Search Bar */}
          <div className="services-controls">
            <div className="category-tabs" role="tablist" aria-label="Service categories">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <Icon name={cat.icon} size={15} />
                  <span>{cat.label}</span>
                  <span className="tab-count">{categoryCounts[cat.id] || 0}</span>
                </button>
              ))}
            </div>

            <div className="services-search-row">
              <div className="search-input-wrap">
                <Icon name="search" size={18} className="search-icon" />
                <input
                  type="search"
                  className="services-search-input"
                  placeholder="Search by keyword (e.g. Patta, Welfare, Nursing, Bank exam, Passport, Visa, Aadhaar, PAN, Binding)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search all services"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <Icon name="x" size={16} />
                  </button>
                )}
              </div>

              <span className="services-count-text">
                Showing <strong>{isSmallScreen ? displayedServices.length : filteredServices.length}</strong> of {filteredServices.length} services
              </span>
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <>
              <div className="services-grid" ref={gridRef}>
                {displayedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Mobile "See More" Pagination Button */}
              {hasMoreServices && (
                <div className="services-see-more-wrap">
                  <button
                    type="button"
                    className="btn btn-primary services-see-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    aria-label="See More Services"
                  >
                    <span>See More</span>
                    <Icon name="chevron-right" size={16} className="see-more-icon" />
                  </button>
                  <span className="services-see-more-hint">
                    Showing {displayedServices.length} of {filteredServices.length} services
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="services-empty-state">
              <Icon name="search" size={36} color="var(--color-text-muted)" />
              <h3>No matching services found</h3>
              <p>We couldn't find any services matching "{searchQuery}". Try a different keyword or reset filters.</p>
              <button
                type="button"
                className="btn btn-outline-brand btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Quick Notice */}
          <div className="compliance-banner" style={{ marginTop: '2.5rem' }}>
            <Icon name="info" size={18} className="notice-icon" />
            <div>
              <strong>Service Availability: </strong>
              All services listed above are available on a direct walk-in basis during regular store hours (9:00 AM – 9:00 PM). For complex applications requiring appointment slots (such as Passport PSK or Driving Licence tests), we provide same-day booking printouts.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Structured Document Checklist Reference Guide */}
      <section className="section section-alt" aria-label="What Documents to Bring Guide">
        <div className="container">
          <div className="section-header services-section-header">
            <span className="section-badge">Preparation Guide</span>
            <h2 className="section-title">What Documents to Bring</h2>
            <p className="section-subtitle">
              Avoid repeated trips. Review this handy document checklist for our most common service categories before heading out to Karungal.
            </p>
          </div>

          <div className="doc-checklists-grid">
            {SERVICE_CHECKLISTS.map((cat, idx) => (
              <div key={idx} className="checklist-cat-card">
                <div className="checklist-cat-header">
                  <div className="checklist-cat-icon">
                    <Icon name={cat.icon} size={20} />
                  </div>
                  <h3>{cat.category}</h3>
                </div>

                <div className="checklist-cat-list">
                  {cat.items.map((sub, sIdx) => (
                    <div key={sIdx} className="checklist-sub-item">
                      <h4>{sub.service}</h4>
                      <ul className="checklist-sub-docs">
                        {sub.documents.map((doc, dIdx) => (
                          <li key={dIdx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing & Process Transparency */}
      <section className="section" aria-label="Transparent Pricing & Process">
        <div className="container">
          <div className="section-header services-section-header">
            <span className="section-badge">Fair & Honest</span>
            <h2 className="section-title">Transparent Pricing & Official Receipts</h2>
            <p className="section-subtitle">
              We believe in complete honesty. Here is how service fees work at our center:
            </p>
          </div>

          <div className="pricing-guide-grid">
            <div className="pricing-guide-card">
              <h4>
                <Icon name="check-circle" size={18} color="var(--color-brand)" />
                <span>Government Statutory Fees</span>
              </h4>
              <p>
                All official challans, portal fees, or registration charges set by UIDAI, NSDL, Passport Seva, or IRCTC are paid directly to the portal. You receive official digital and printed receipts for every single rupee paid.
              </p>
            </div>

            <div className="pricing-guide-card">
              <h4>
                <Icon name="check-circle" size={18} color="var(--color-brand)" />
                <span>Modest Facilitation Charges</span>
              </h4>
              <p>
                Our personal form-filling and assistance fee is modest and communicated upfront before we begin entering any details. There are never any surprise charges or hidden extras.
              </p>
            </div>

            <div className="pricing-guide-card">
              <h4>
                <Icon name="check-circle" size={18} color="var(--color-brand)" />
                <span>Commercial Printing Rates</span>
              </h4>
              <p>
                Laser printouts, bulk photocopying, color prints, and lamination are charged at standard, competitive local rates with clear per-page pricing displayed prominently at our shop counter.
              </p>
            </div>
          </div>

          {/* Bottom Help Strip */}
          <div className="home-cta-strip services-cta-strip">
            <div className="home-cta-content">
              <h3>Have a Question About a Specific Service?</h3>
              <p>
                Send us a direct WhatsApp text with the service you need, or visit our shop during operating hours.
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
                <span>Enquire on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <Icon name="map-pin" size={18} />
                <span>Contact & Location</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
