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

const navItems = [
  { name: "LAST GENERATION", key: "last-generation" },
  { name: "IDEA IS CAP SURVEYS", key: "sosioloji" },
  { name: "OUR PURPOSE", key: "purpose" },
  // { name: "THE EDITOR", key: "editor" },
  // { name: "CONTRIBUTORS", key: "contributors" },
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
const [bacck, setBacck] = useState(false);
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
        <>
          <nav className="w-full z-40 relative">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
            
          {(pathname !== '/' && pathname !== '/page2') && (
  <Link href={'/'}>
    <div className="absolute top-4 left-5 z-50">
      <button className="text-black underline text-sm md:text-lg font-medium hover:text-blue-700 transition">
        ← Back to Survey List
      </button>
    </div>
  </Link>
)}

              <div className="flex items-center top-7 md:top-0 justify-between min-h-[100px] md:min-h-[200px] relative">
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
                      onClick={() => 
                        setActiveSection(item.key)}
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
             
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
        </>

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