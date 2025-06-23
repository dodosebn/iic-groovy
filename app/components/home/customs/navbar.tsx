'use client';
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import TransitionLink from "@/utils/transitionLink";
import { RiArrowDropDownLine, RiCloseLine, RiMenu2Fill } from "react-icons/ri";
import {Logo, MLogo} from "@/utils/logo";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.7 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4 },
  },
};

const navItems = [
  { id: 1, path: '/', name: 'Home' },
  { id: 2, path: '/membership/signUp', name: 'Membership' },
  { id: 3, path: '/', name: 'Style Guide✨' },
  { id: 4, path: '#tag', name: '#Tag' }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

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

  // Prevent scrolling when menu is open on desktop
  useEffect(() => {
    if (!isMobile && menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen, isMobile]);

  return (
    <div>
      {!isMobile && (
        <>
          {/* Only show the regular nav when menu is closed */}
          {!menuOpen && (
            <nav className="w-full z-40 relative mb-4">
              <div className="max-w-7xl mx-auto px-8 md:px-12">
                <div className="flex items-center justify-between min-h-[100px] md:min-h-[200px] mx-auto relative">
                  <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-800">
                    <Link href='/' className="hidden md:block md:-translate-y-1/2 absolute left-1/2 -translate-x-1/2">
                      <Logo />
                    </Link>
                  </h1>

                  {/* Menu icon */}
                  <div
                    className="text-3xl text-gray-700 cursor-pointer rotate-90 block md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2"
                    onClick={() => setMenuOpen(true)}
                  >
                    <IoMenu />
                  </div>
                </div>
              </div>
            </nav>
          )}

          {/* Full-screen menu overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 bg-nav z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close icon */}
                <div
                  className="absolute top-5 right-5 text-3xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <GrClose color="#000000" />
                </div>

                {/* Menu items */}
                <motion.ul
                  className="w-full text-xl sm:text-3xl space-y-6 text-center"
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.id} variants={itemVariant}>
                      <TransitionLink 
                        href={item.path}
                        onClick={handleMobileClick}
                      >
                        <span className="hover:text-blue-400 tracking-[3px] text-xl text-black transition">
                          {item.name}
                        </span>
                      </TransitionLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {isMobile && (
        <div className="bg-[#F9F9F9] border-b border-[#333] shadow-lg">
          <nav className="flex items-center justify-between px-4 py-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 p-2">
              {menuOpen ? <RiCloseLine size={37} /> : <RiMenu2Fill size={37} />}
            </button>
            {menuOpen ? (
              <button onClick={() => setMenuOpen(false)}>
                <RiCloseLine size={37} className="text-[#333]" />
              </button>
            ) : (
              <MLogo />
            )}
          </nav>

          <div className={`fixed top-0 left-0 h-full w-[18rem] bg-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <ul className="mt-16 px-10 space-y-7">
              {navItems.map(item => (
                <li key={item.id} className="text-[#333] hover:text-pink-600 font-medium">
                  <TransitionLink 
                    href={item.path}
                    onClick={handleMobileClick}
                  >
                    {item.name}
                  </TransitionLink>
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
                      <TransitionLink
                        key={sub.name}
                        href={sub.path}
                        onClick={handleMobileClick}
                      >
                        <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600">
                          {sub.name}
                        </span>
                      </TransitionLink>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            <div className="mt-6 flex justify-center items-center">
              <TransitionLink
                href='/signIn'
                onClick={handleMobileClick}
              >
                <button className="bg-[#333333] text-white px-8 py-2 font-bold rounded-[5.5rem] hover:bg-white hover:text-[#333] border hover:border-[#333] whitespace-nowrap transition-transform duration-300 ease-in-out hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5">
                  Sign In
                </button>
              </TransitionLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;