import React from 'react';
import Image from 'next/image';
import imgSrc from '@/public/images/introImg.avif';
import AboutMeContainer from '@/utils/aboutMeContainer';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { TiWorld } from 'react-icons/ti';
import ThirdIt from './thirdIt';
import FourIt from './fourIt';

const SideBar = () => {
  const secondBar = [
    {
      id: 1,
      img: imgSrc,
      h1: 'Building your audience with subscriber signups',
      p: 'Sep 25, 2022',
    },
    {
      id: 2,
      img: imgSrc,
      h1: 'Selling memberships with recurring revenue',
      p: 'mar 16, 2021 ',
    },
    {
      id: 3,
      img: imgSrc,
      h1: 'The subline before us was indeed sublime',
      p: 'Apr 26, 2019 ',
    },
  ];

  
  return (
    <div className="flex flex-col gap-[3rem]">
      {/* About Me Section */}
      <section>
        <AboutMeContainer name="About Me">
          <div className="flex gap-4 items-start mb-4">
            <div className="flex-shrink-0">
              <Image
                src={imgSrc}
                alt="Profile picture"
                width={80}
                height={80}
                className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover border-2 border-[#333]
                transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold text-[#333]">Jonathan Doe</h1>
              <p className="text-sm text-gray-600">Chile</p>
              <div className="flex gap-3 mt-1">
                <FaTwitter className="text-[#1DA1F2] text-lg hover:scale-110 transition-transform" />
                <FaFacebookF className="text-[#4267B2] text-lg hover:scale-110 transition-transform" />
                <TiWorld className="text-[#333] text-xl hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          <div className="text-[#333] leading-relaxed border-t border-gray-200 pt-3">
            <p className="w-[15rem]">
              Hello! My name is Jonathan Doe working from Chile. I create some
              Ghost and WordPress themes for different markets, also, I offer
              live support via our ticket system.
            </p>
          </div>
        </AboutMeContainer>
      </section>

      <section>
        <AboutMeContainer name="Featured Articles">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
            {secondBar.map((item) => (
              <React.Fragment key={item.id}>
                {/* Star Badge & Image */}
                <div className="relative">
                  <div className="absolute w-[4.5rem] h-[4.5rem] -top-4 -left-8">
                    <div className="star-13 bg-black absolute inset-0"></div>
                    <div className="star-13 bg-[#fff] absolute inset-[2px] flex items-center justify-center text-[#333] text-xs font-bold z-10">
                      {item.id}
                    </div>
                  </div>
                  <Image
                    src={item.img}
                    alt="Article thumbnail"
                    width={120}
                    height={120}
                    className="rounded-sm w-13 h-17 object-cover transition-all duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                {/* Article Text */}
                <div>
                  <h1 className="text-md font-bold w-[11rem] text-[#333] hover:text-black hover:underline cursor-pointer">
                    {item.h1}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">{item.p}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </AboutMeContainer>
      </section>

     <ThirdIt />
     <FourIt />
    </div>
  );
};

export default SideBar;
