'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IoMail, IoMenu } from 'react-icons/io5';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import { RiArrowDropDownLine, RiCloseLine, RiMenu2Fill } from 'react-icons/ri';
import Link from 'next/link';

import { Logo, MLogo } from '@/utils/logo';
import { useNavbarStore } from '@/app/store/useNavStore';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import SectionContent from '../sectionCont';

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
    transition: { type: 'spring', bounce: 0.4 },
  },
};

// const navItems = [
//   { id: 1, path: '/', name: 'Home' },
//   // { id: 3, path: '/', name: 'Style Guide✨' },
//   { id: 4, path: '#tag', name: '#Tag' },
// ];
const navItems = [
  { name: "LAST GENERATION", key: "last-generation" },
  { name: "SOSIOLOJI", key: "sosioloji" },
  { name: "OUR PURPOSE", key: "purpose" },
  { name: "THE EDITOR", key: "editor" },
  { name: "CONTRIBUTORS", key: "contributors" },
  { name: "JOIN THE MOVEMENT", key: "movement" },
  { name: "FILOSOFI", key: "filosofi" },
  { name: "IDEA IS CAP", key: "ideaiscapital" },
  { name: "CONNECT", key: "connect" },
];
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    menuOpen,
    setMenuOpen,
    isMobile,
    setIsMobile,
    moreOpen,
    setMoreOpen,
  } = useNavbarStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);

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
  }, [setIsMobile, setMenuOpen]);

  const toggleMore = () => {
    setMoreOpen(!moreOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
    setSearchOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path === pathname) {
      closeAllMenus();
      return;
    }

    startTransition(() => {
      router.push(path);
    });

    setTimeout(() => {
      closeAllMenus();
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <div>
      {/* DESKTOP NAV */}
        <>
          <nav className="w-full z-40 relative">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
              <div className="flex items-center justify-between min-h-[100px] md:min-h-[200px] relative">
                <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-800">
                  <Link
                    href="/"
                    className="-translate-y-1/2 absolute left-1/2 -translate-x-1/2"
                  >
                    {isMobile ? <MLogo />
 : <Logo />}
                  </Link>
                </h1>
                <div
                  className="text-3xl text-gray-700 cursor-pointer rotate-90 block md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2"
                  onClick={() => setMenuOpen(true)}
                >
                  <IoMenu size={40} />
                </div>
              </div>
            </div>
          </nav>

   

           
 <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-[#54cbca] z-50
              flex items-center justify-center"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <button
  className="absolute top-5 right-5 text-4xl cursor-pointer z-50"
  onClick={(e) => {
    e.preventDefault();
    setMenuOpen(false);
  }}
>
  <GrClose color="#000000" />
</button>

              <motion.ul
      className="w-full text-xl absolute 
       sm:text-3xl space-y-5
       font-light text-center"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {navItems.map((item, index) => (
                  <motion.li key={item.key} variants={itemVariant}>
                    <button
                      onClick={() => setActiveSection(item.key)}
   className={`hover:text-blue-400 tracking-[3px] uppercase cursor-pointer text-black transition ${
                      index === 0
                        ? "text-2xl md:text-4xl font-bold"
                        : "text-xl font-light"
                    }`}                    >
                      {item.name}
                    </button>
                      {item.name === "LAST GENERATION" && (
                    <div className="h-px w-[80%] font-extrabold
                    md:w-130 mx-auto bg-black mt-9" />
                  )}
                       {item.name === "JOIN THE MOVEMENT" && (
                    <div className="h-px w-[80%]  md:w-80 mx-auto bg-black/20 mt-9" />
                  )}
                  </motion.li>
                ))}
                {/* {!isDesktop && (
                  <motion.li variants={itemVariant}>
                    <div className="flex justify-center gap-6 pt-3 text-3xl text-gray-700">
                      <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariant}
                      >
                        <FaXTwitter />
                      </motion.a>
                      <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariant}
                      >
                        <FaFacebookSquare />
                      </motion.a>
                      <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariant}
                      >
                        <FaInstagram />
                      </motion.a>
                      <motion.a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariant}
                      >
                        <FaTiktok />
                      </motion.a>
                      <motion.a
                        href={`mailto:?subject=Check this out&body=${shareMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariant}
                      >
                        <IoMail />
                      </motion.a>
                    </div>
                  </motion.li>
                )} */}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
        </>

      {/* MOBILE NAV */}
      {/* {isMobile && (
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
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed top-0 left-0 h-full w-[18rem] bg-white z-50"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <ul className="mt-16 px-10 space-y-7">
                  {navItems.map((item) => (
                    <li key={item.key} className="text-[#333] hover:text-pink-600 font-medium">
                      <button
                        onClick={() => handleNavigation(item.key)}
                        className="block w-full text-left bg-transparent border-none"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}

                  <li className="relative">
                    <button
                      onClick={toggleMore}
                      className="flex items-center w-full text-[#333] hover:text-pink-600 font-medium whitespace-nowrap"
                    >
                      <span>More</span>
                      <RiArrowDropDownLine
                        className={`ml-auto text-xl transition-transform ease-in-out duration-300 ${
                          moreOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {moreOpen && (
                      <div className="mt-2 bg-white py-2 w-full">
                        {navItems.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => handleNavigation(sub.key)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-pink-600 w-full text-left bg-transparent border-none"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )} */}
           {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeSection && (
              <SectionContent
                key={activeSection}
                section={activeSection}
                onClose={() => setActiveSection(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Navbar;