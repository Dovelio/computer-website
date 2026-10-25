import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import '../styles/header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Announcement Bar */}
        <div className="header-top-bar">
          <div className="container top-bar-inner">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <Icon name="clock" size={14} />
                <span>{BUSINESS_INFO.hours.weekdays}</span>
              </span>
              <span className="top-bar-item">
                <Icon name="map-pin" size={14} />
                <span>{BUSINESS_INFO.address.city}</span>
              </span>
            </div>
            <div className="top-bar-right">
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="top-bar-item">
                <Icon name="phone" size={14} />
                <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="top-bar-item"
              >
                <Icon name="whatsapp" size={14} />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container header-main">
          {/* Logo / Brand */}
          <Link to="/" className="brand-link" aria-label={`${BUSINESS_INFO.shortName} Homepage`}>
            <div className="brand-icon-box">
              <Icon name="shield-check" size={24} color="#ffffff" />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">{BUSINESS_INFO.shortName}</span>
              <span className="brand-subtitle">{BUSINESS_INFO.badge}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm btn-desktop"
              id="header-whatsapp-cta"
            >
              <Icon name="whatsapp" size={16} />
              <span>Chat on WhatsApp</span>
            </a>

            <Link to="/contact" className="btn-visit-shop btn-desktop">
              <span>Visit Shop</span>
              <Icon name="arrow-right" size={14} />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-drawer-header">
          <div className="brand-text-wrap">
            <span className="brand-title" style={{ fontSize: '1.05rem' }}>
              {BUSINESS_INFO.shortName}
            </span>
            <span className="brand-subtitle">{BUSINESS_INFO.badge}</span>
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
              end={item.to === '/'}
            >
              <span>{item.label}</span>
              <Icon name="chevron-right" size={16} color="var(--color-text-muted)" />
            </NavLink>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            onClick={closeMenu}
          >
            <Icon name="whatsapp" size={18} />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="btn btn-outline"
            onClick={closeMenu}
          >
            <Icon name="phone" size={18} />
            <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
          </a>
          <Link
            to="/contact"
            className="btn btn-primary"
            onClick={closeMenu}
          >
            <Icon name="map-pin" size={18} />
            <span>Find Our Shop Location</span>
          </Link>
          <div className="mobile-contact-snippet">
            {BUSINESS_INFO.hours.weekdays}
          </div>
        </div>
      </div>
    </>
  );
}
