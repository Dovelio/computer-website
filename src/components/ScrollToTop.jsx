import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../utils/animations';

/**
 * Automatically scrolls the window to the top and refreshes ScrollTrigger on route change.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
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
  }, [pathname, search]);

  return null;
}
