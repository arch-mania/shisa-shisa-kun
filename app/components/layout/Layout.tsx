import { useState, useEffect } from 'react';
import { useLocation } from '@remix-run/react';
import { CoverImage } from '../features/CoverImage';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CoverImage />
      <main
        className={`relative left-1/2 w-full max-w-[390px] -translate-x-1/2 overflow-hidden bg-white pt-6 transition-opacity duration-700 ease-out md:left-[calc(100%-40px)] md:-translate-x-full lg:left-[calc(100%-280px)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `}
      >
        {children}
        <Footer />
      </main>
    </>
  );
};
