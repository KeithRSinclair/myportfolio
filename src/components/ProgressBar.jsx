import { useEffect, useRef } from 'react'; // 👈 Added useRef
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure the visual style
NProgress.configure({ showSpinner: false });

export const ProgressBar = () => {
  const location = useLocation();
  // Keep track of the last path string across renders
  const prevPathRef = useRef('');

  useEffect(() => {
    // Generate a unique string representing the current page route
    const currentPath = location.pathname + location.search;

    // Only fire NProgress if the user actually navigated to a DIFFERENT page
    if (currentPath !== prevPathRef.current) {
      NProgress.start();

      const timer = setTimeout(() => NProgress.done(), 300);

      // Update the reference to the current page path
      prevPathRef.current = currentPath;

      return () => {
        clearTimeout(timer);
        NProgress.done();
      };
    }
  }, [location]);

  return null;
};