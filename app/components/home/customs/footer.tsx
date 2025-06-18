import React from 'react';
import HorizontalDivider from '@/utils/horizontal';
import flyer from '@/public/images/subscribe-airplane.png';
import Image from 'next/image';
import FooterLevel from '../../desktop/footerLevel';

const Footer = () => {
  return (
    <footer className="relative z-0">
  <div className="bg-[#fffacd] w-full min-h-screen overflow-visible">
        <main className="md:px-[4rem] px-4 w-full max-w-[1500px] mx-auto relative">
          
          <section className="md:flex gap-10 md:flex-row flex-col hidden relative z-20">
            <div className="flex-1 mt-9">
              <FooterLevel />
            </div>
            <div className="md:block hidden w-[300px]" />
          </section>

          {/* Divider */}
          <HorizontalDivider />

          {/* Newsletter Section */}
      <section className="py-8 relative z-10">
  <div className="text-center space-y-6">
    <h2 className="text-xl font-semibold text-gray-700 ">Like what you read?</h2>

    <div className="flex justify-center items-center gap-6 flex-wrap">
      <div className="hidden md:block">
        <Image src={flyer} alt="Flyer" className="w-[6rem] h-[6rem]" />
      </div>

      <div className="w-full max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Subscribe to our Newsletter
        </h1>

        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-white px-6 py-4 pr-36 rounded-full border border-[#333] text-base
              focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff4c60] text-white px-5 py-2 rounded-full text-sm font-medium 
              transition-shadow duration-200 ease-out hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
<div className='absolute left-[40%]'>
    <p className="text-gray-600 max-w-2xl mx-auto px-6 md:px-0">
      Subscribe to our email newsletter and unlock access to
      <br className="hidden md:block" />
      <span className="font-bold"> members-only </span> content and
      <span className="font-bold"> exclusive updates.</span>
    </p>
    </div>
  </div>
</section>




        </main>
      </div>
    </footer>
  );
};

export default Footer;
