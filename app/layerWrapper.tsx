'use client';

import { useEffect } from 'react';

import BackgroundDecor from '@/utils/bgDecor';
import { useNavbarStore } from './store/useNavStore';
import Navbar from './components/home/customs/navbar';
import Sroll from './components/desktop/sroll';
import Footer from './components/home/customs/footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { menuOpen, isMobile } = useNavbarStore();

  // Lock scroll when menu is open (already good)
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
    <>
      <BackgroundDecor />
      <Navbar />

      <main className="relative lg:px-[4rem] lg:w-full max-w-[1500px] flex flex-col 
      justify-center mx-auto">
        <div className="lg:mt-[5rem] mt-[3rem]">
          {children}
        </div>
      </main>

      <Sroll />

      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
