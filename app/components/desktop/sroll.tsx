'use client';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
const Sroll = () => {
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
    <>
     {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-[#fff] text-[#333] border border-[#333] px-4 py-4 rounded-full transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
          >
            <MdKeyboardArrowUp size={24} />
          </button>
        )}
        </>
  )
}

export default Sroll;
