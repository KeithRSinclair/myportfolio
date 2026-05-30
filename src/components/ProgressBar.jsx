import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure the visual style
NProgress.configure({ showSpinner: false });

export const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start the bar when the route changes
    NProgress.start();

    // Finish the bar when the component re-renders (navigation complete)
    const timer = setTimeout(() => NProgress.done(), 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null; // This component doesn't render visual elements directly
};