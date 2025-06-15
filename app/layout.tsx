'use client';
import React, { useEffect, useState } from 'react';
import Footer from './components/home/customs/footer';
import Navbar from './components/home/customs/navbar';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && window.innerWidth >= 1024) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="md:px-[4rem] md:py-[2rem] lg:w-full max-w-[1500px] flex flex-col justify-center mx-auto">
          <Navbar />
          <div className="md:mt-[5rem] mt-[3rem] relative">
            <div className="absolute"></div>
            {children}
          </div>
        </div>

        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-[#fff] text-[#333] border border-[#333] px-4 py-4 rounded-full transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
          >
            <MdKeyboardArrowUp size={24} />
          </button>
        )}

        <div className="pt-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
