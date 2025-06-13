'use client';
import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { IoSearchSharp, IoLogoTwitter } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineNetworkCheck } from "react-icons/md";
import Logo from '@/utils/logo';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

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

  return (
    <div className="relative cursor-pointer"> 
      {/* Overlay for search only */}
      {searchOpen && (
        <div 
          className="fixed inset-0  bg-opacity-20 z-40"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {!isMobile ? (
        <div className='flex justify-center w-full px-4'>
          <nav className="flex items-center justify-between px-8 py-[1.8rem] border-1 border-[#333] 
       bg-white shadow-sm rounded-[5rem] w-full max-w-[1500px]">
            {/* Logo */}
            <div>
              <Logo/>
            </div>

            {/* All navigation items in one continuous row */}
            <div className="flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {["Home", "Membership", "Style Guide✨", "#Tag"].map((item, index) => (
                  <li key={index} className="text-gray-700 hover:text-pink-600 font-medium whitespace-nowrap">
                    {item}
                  </li>
                ))}
                
                {/* More Dropdown - No overlay */}
                <li className="relative">
                  <button 
                    onClick={toggleMore}
                    className="flex items-center text-gray-700 hover:text-pink-600 font-medium whitespace-nowrap"
                  >
                    More <RiArrowDropDownLine className={`text-xl transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {moreOpen && (
                    <div className="absolute left-0 top-full mt-2 z-50 bg-white shadow-lg rounded-md py-2 w-48">
                      {["About", "Contact", "Blog", "FAQ"].map((item, index) => (
                        <a 
                          key={index} 
                          href="#" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </li>

                {/* Search */}
                <li className="relative">
                  <button 
                    onClick={toggleSearch}
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <IoSearchSharp className="text-xl" />
                  </button>
                  {searchOpen && (
                    <div className="absolute right-0 top-full mt-2 z-50">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="py-2 px-4 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        autoFocus
                      />
                    </div>
                  )}
                </li>

                {/* Sign In */}
                <li>
                  <button className="bg-[#333333] text-white px-6 py-2 rounded-[5rem] hover:bg-[#444] transition-colors whitespace-nowrap">
                    Sign In
                  </button>
                </li>

                {/* Social Icons */}
                <li className="flex items-center gap-3">
                  <FaFacebookF className="text-blue-600 hover:text-blue-700 cursor-pointer" size={20}/>
                  <IoLogoTwitter className="text-blue-500 hover:text-blue-600 cursor-pointer" size={20}/>
                  <FaInstagram className="text-pink-600 hover:text-pink-700 cursor-pointer" size={20}/>
                  <MdOutlineNetworkCheck className="text-green-600 hover:text-green-700 cursor-pointer" size={20}/>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        // Mobile Navigation
        <div className="bg-white shadow-sm">
          <nav className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 p-2"
            >
              {menuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenu2Fill className="text-2xl" />}
            </button>
            
            <div className="flex-1 flex justify-center">
              <Logo />
            </div>
            
            <button 
              onClick={toggleSearch}
              className="text-gray-700 p-2"
            >
              <IoSearchSharp className="text-xl" />
            </button>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 h-screen bg-white shadow-lg z-50 p-4 w-[14rem]">
              <ul className="space-y-4">
                {["Home", "Membership", "Style Guide✨", "#Tag"].map((item, index) => (
                  <li key={index} className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-gray-100">
                    {item}
                  </li>
                ))}
                <li className="flex items-center justify-between text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-gray-100">
                  More <RiArrowDropDownLine className="text-xl" />
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-[70%] bg-[#333333] text-white px-6 py-2 rounded-[5rem] transition-colors">
                  Sign In
                </button>
                
                <div className="flex justify-center space-x-6 mt-4">
                  <FaFacebookF className="text-blue-600 cursor-pointer text-xl" />
                  <IoLogoTwitter className="text-blue-500 cursor-pointer text-xl" />
                  <FaInstagram className="text-pink-600 cursor-pointer text-xl" />
                  <MdOutlineNetworkCheck className="text-green-600 cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search */}
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