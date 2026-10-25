import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Checks if the user prefers reduced motion
 * @returns {boolean}
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Creates a clean GSAP context with ScrollTrigger support and automatic cleanup
 * @param {React.RefObject} containerRef - Container element reference
 * @param {Function} setupAnimations - Callback where GSAP animations are configured
 * @returns {Function} Cleanup function for useEffect
 */
export function createPageAnimation(containerRef, setupAnimations) {
  if (isReducedMotion() || !containerRef.current) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    setupAnimations();
  }, containerRef);

  return () => {
    ctx.revert();
  };
}

/**
 * Animate a section header (badge, title, subtitle) on scroll
 * @param {Element|string} headerSelector
 */
export function animateSectionHeader(headerSelector) {
  if (isReducedMotion()) return;

  const elements = gsap.utils.toArray(headerSelector);
  elements.forEach((header) => {
    gsap.fromTo(
      header.querySelectorAll('.section-badge, .section-title, .section-subtitle'),
      {
        opacity: 0,
        y: 24
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Animate a list of cards with subtle staggered entrance
 * @param {Element|string} containerSelector
 * @param {string} cardSelector
 * @param {number} stagger
 */
export function animateStaggerCards(containerSelector, cardSelector, stagger = 0.1) {
  if (isReducedMotion()) return;

  const containers = gsap.utils.toArray(containerSelector);
  containers.forEach((container) => {
    const cards = container.querySelectorAll(cardSelector);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Smooth entrance for split elements (left/right columns)
 * @param {Element|string} triggerEl
 * @param {Element|string} targetEl
 * @param {number} xOffset
 */
export function animateFadeSlide(triggerEl, targetEl, xOffset = -25, delay = 0) {
  if (isReducedMotion()) return;

  gsap.fromTo(
    targetEl,
    {
      opacity: 0,
      x: xOffset,
      y: 0
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.65,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );
}

export { gsap, ScrollTrigger };
