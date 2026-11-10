import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../utils/animations';

/**
 * Automatically scrolls the window to the top and refreshes ScrollTrigger on route change.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigation targets a specific section (hash) or service/category deep-link,
    // allow the target page's auto-scroll to handle position smoothly
    const hasTarget = Boolean(
      hash ||
      search.includes('service=') ||
      search.includes('focus=') ||
      (search.includes('cat=') && !search.includes('cat=all'))
    );

    if (hasTarget) {
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timeout);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Allow browser DOM to settle then refresh ScrollTrigger positions
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, search, hash]);

  return null;
}
