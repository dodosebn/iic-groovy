'use client';

import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from '@/utils/logo';
import TransitionLink from '@/utils/transitionLink';
import { useScrollStore } from '@/app/store/useScroll';
import Link from 'next/link';

const Navbar = () => {
  const { hasScrolled, setHasScrolled } = useScrollStore();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setHasScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 999;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMore = () => {
    setMoreOpen(!moreOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const handleMobileClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const navItems = [
    { id: 1, path: '/', name: 'Home' },
    { id: 2, path: 'membership/signUp', name: 'Membership' },
    { id: 3, path: '/', name: 'Style Guide✨' },
    { id: 4, path: '#tag', name: '#Tag' }
  ];

  return (
    <div className="relative cursor-pointer">
      {/* Desktop Navbar - UNCHANGED */}
      {!isMobile && (
        <div className={`w-full ${hasScrolled ? "fixed top-0 left-0 z-50 bg-white" : ""}`}>
          <div className="w-full max-w-[1500px] mx-auto p-1.5">
            <nav className={`transition-all duration-300 ease-in-out flex items-center justify-between bg-white ${
              hasScrolled
                ? "px-[4rem] py-[1rem] rounded-none"
                : "px-[3rem] py-[1.8rem] shadow-sm rounded-[5rem] border border-[#333]"
            }`}>
              {/* ... (rest of desktop navbar remains exactly the same) ... */}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <div className="bg-[#F9F9F9] border-b border-[#333] shadow-lg">
          <nav className="flex items-center justify-between px-4 py-5">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 p-2">
              {menuOpen ? <RiCloseLine size={45} /> : <RiMenu2Fill size={45} />}
            </button>
            {menuOpen ? (
              <button onClick={() => setMenuOpen(false)}>
                <RiCloseLine size={45} className=" text-[#333]" />
              </button>
            ) : (
              <Logo />
            )}
          </nav>

          <div className={`fixed top-0 left-0 h-full w-[18rem] bg-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <ul className="mt-16 px-10 space-y-7">
              {navItems.map(item => (
                <li key={item.id} className="text-[#333] hover:text-pink-600 font-medium">
                  <Link
                    href={item.path}
                    onClick={handleMobileClick} 
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <li className="relative">
                <button
                  onClick={toggleMore}
                  className="flex items-center w-full text-[#333] hover:text-pink-600 font-medium whitespace-nowrap"
                >
                  <span>More</span>
                  <RiArrowDropDownLine
                    className={`ml-auto text-xl transition-transform ease-in-out duration-300 ${moreOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {moreOpen && (
                  <div className="mt-2 bg-white py-2 w-full">
                    {navItems.map(sub => (
                      <Link 
                        key={sub.name} 
                        href={sub.path}
                        onClick={handleMobileClick} 
                      >
                        <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            <div className="mt-6 flex justify-center items-center">
              <Link
                href='/signIn'
                onClick={handleMobileClick} 
              >
                <button className="bg-[#333333] text-white px-8 py-2 font-bold rounded-[5.5rem] hover:bg-white hover:text-[#333] border hover:border-[#333] whitespace-nowrap transition-transform duration-300 ease-in-out hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;