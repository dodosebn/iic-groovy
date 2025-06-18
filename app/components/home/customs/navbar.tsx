'use client';
import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from '@/utils/logo';
import TransitionLink from '@/utils/transitionLink';
import { useScrollStore } from '@/app/store/useScroll';

const Navbar = () => {
  const { hasScrolled, setHasScrolled } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setHasScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    setMounted(true);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (menuOpen) setMenuOpen(false);
    if (moreOpen) setMoreOpen(false);
  };

  const toggleMore = () => {
    setMoreOpen(!moreOpen);
    if (searchOpen) setSearchOpen(false);
  };

  if (!mounted) return null;

  const navItems = [
    { id: 1, path: '/', name: 'Home' },
    { id: 2, path: 'membership/signUp', name: 'Membership' },
    { id: 3, path: '/', name: 'Style Guide✨' },
    { id: 4, path: '#tag', name: '#Tag' }
  ];

  return (
    <div className="relative cursor-pointer">
      {searchOpen && (
        <div className="inset-0 bg-opacity-20 z-40" onClick={() => setSearchOpen(false)} />
      )}

      {!isMobile && (
        <div className={`w-full ${hasScrolled ? "fixed top-0 left-0 z-50 bg-white" : ""}`}>
          <div className="w-full max-w-[1500px] mx-auto p-1.5">
            <nav
              className={`${
                hasScrolled
                  ? "px-[4rem] py-[1rem] rounded-none"
                  : "px-[3rem] py-[1.8rem] shadow-sm rounded-[5rem] border   border-[#333]"
              } transition-all duration-300 ease-in-out flex items-center justify-between  bg-white`}
            >
              <div><Logo /></div>
              <div className="flex items-center gap-8">
                <ul className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <li key={item.id} className="text-gray-700 hover:text-pink-600 font-medium whitespace-nowrap">
                      <TransitionLink href={item.path}>{item.name}</TransitionLink>
                    </li>
                  ))}
                  <li className="relative">
                    <button
                      onClick={toggleMore}
                      className="flex items-center text-gray-700 hover:text-pink-600 font-medium whitespace-nowrap"
                    >
                      More <RiArrowDropDownLine className={`text-xl transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {moreOpen && (
                      <div className="absolute left-0 top-full mt-2 z-50 bg-white shadow-lg rounded-md py-2 w-48">
                        {navItems.map((item) => (
                          <span
                            key={item.name}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600"
                          >
                            <TransitionLink href={item.path}>{item.name}</TransitionLink>
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleSearch}
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <IoSearchSharp className="text-xl" />
                    </button>
                    {searchOpen && (
                      <div className="absolute right-0 top-full bottom-[7rem] z-50">
                        <input
                          type="text"
                          placeholder="Search posts, authors and tags"
                          className="py-3 px-4 rounded-md bg-[#fff] focus:outline-none focus:ring-2 w-96"
                          autoFocus
                        />
                      </div>
                    )}
                  </li>
                  <li>
                    <TransitionLink href='/signIn'>
                      <button className="bg-[#333333] text-white px-6 py-1 font-bold rounded-[5.5rem] hover:bg-[#fff] hover:text-[#333] border hover:border-[#333] whitespace-nowrap transition-transform duration-300 ease-in-out hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.9">
                        Sign In
                      </button>
                    </TransitionLink>
                  </li>
                  {!hasScrolled && (
                    <li className="flex items-center gap-3">
                      <TransitionLink href='https://x.com/ideaischange'>
                        <FaXTwitter className="text-black hover:text-gray-800 cursor-pointer" size={24} />
                      </TransitionLink>
                      <TransitionLink href='https://www.instagram.com/ideaischange/'>
                        <FaInstagram className="text-pink-600 hover:text-pink-700 cursor-pointer" size={24} />
                      </TransitionLink>
                      <TransitionLink href='https://www.tiktok.com/@ideaischange'>
                        <FaTiktok className="text-gray-900 hover:text-gray-700 cursor-pointer" size={24} />
                      </TransitionLink>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="bg-white shadow-sm">
          <nav className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 p-2">
              {menuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenu2Fill className="text-2xl" />}
            </button>
            <div className="flex-1 flex justify-center"><Logo /></div>
            <button onClick={toggleSearch} className="text-gray-700 p-2">
              <IoSearchSharp className="text-xl" />
            </button>
          </nav>

          {menuOpen && (
            <div className="absolute top-full left-0 right-0 h-screen bg-white shadow-lg z-50 p-4 w-[14rem]">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id} className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-gray-100">
                    {item.name}
                  </li>
                ))}
                <li className="flex items-center justify-between text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-gray-100">
                  More <RiArrowDropDownLine className="text-xl" />
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <TransitionLink href='signIn'>
                  <button className="w-[70%] bg-[#333333] text-white px-6 py-2 rounded-[5rem] transition-colors">
                    Sign In
                  </button>
                </TransitionLink>
                <div className="flex justify-center space-x-6 mt-4">
                  <TransitionLink href='https://x.com/ideaischange'>
                    <FaXTwitter className="text-black hover:text-gray-800 cursor-pointer" size={24} />
                  </TransitionLink>
                  <TransitionLink href='https://www.instagram.com/ideaischange/'>
                    <FaInstagram className="text-pink-600 hover:text-pink-700 cursor-pointer" size={24} />
                  </TransitionLink>
                  <TransitionLink href='https://www.tiktok.com/@ideaischange'>
                    <FaTiktok className="text-gray-900 hover:text-gray-700 cursor-pointer" size={24} />
                  </TransitionLink>
                </div>
              </div>
            </div>
          )}

          {searchOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
