import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react'
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { TiWorld } from 'react-icons/ti';
import imgSrc from '@/public/images/introImg.avif';
import Image from 'next/image';
import { FaCertificate } from "react-icons/fa6";
import Button from '@/utils/button';
import shortHB from '@/public/images/short-hand-holding-bulb.jpg';
import snailLike from '@/public/images/snail-like.jpg';
import shoeLike from '@/public/images/shoe.jpg';
import starLike from '@/public/images/star.svg';
import smilingImg from '@/public/images/smiling Gee.jpg';
const AboutTheAuthor = () => {
  const secondBar = [
    {
      id: 1,
      img: shortHB,
      h1: 'Building your audience with subscriber signups',
      p: 'Sep 25, 2022',
    },
    {
      id: 2,
      img: snailLike,
      h1: 'Selling memberships with recurring revenue',
      p: 'mar 16, 2021 ',
    },
    {
      id: 3,
      img:shoeLike,
      h1: 'The subline before us was indeed sublime',
      p: 'Apr 26, 2019 ',
    },
  ];
  
  return (
    <section>
      <AboutMeContainer name="About the Author">
        <div className='flex flex-col lg:flex-row items-center gap-[3em]  justify-center'> 
          <div className='flex flex-col items-center mb-8'> 
            <div className="flex flex-row items-center gap-6 mb-4">
              <div className="flex-shrink-0">
                <Image
                  src={smilingImg}
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="rounded-full w-16 h-16 lg:w-20 lg:h-20 object-cover border-2 border-[#333]
                  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
                />
              </div>

              <div className="flex flex-col items-center gap-1 text-center"> {/* Centered content */}
                <h1 className="text-lg font-bold text-[#333]">Jonathan Doe</h1>
                <p className="text-sm text-gray-600">Chile</p>
                <div className="flex gap-3 mt-1">
                  <FaTwitter className="text-[#1DA1F2] text-lg hover:scale-110 transition-transform" />
                  <FaFacebookF className="text-[#4267B2] text-lg hover:scale-110 transition-transform" />
                  <TiWorld className="text-[#333] text-xl hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            <div className="text-[#333] leading-relaxed border-t border-gray-200 pt-3 text-center lg:w-[24rem]">
              <p>
                Hello! My name is Jonathan Doe working from Chile.
                 I <span className='px-1'>create some Ghost and Wordpress themes for </span><br className='hidden lg:flex' />differents markets, 
                 also, i offer live support via our<br className='hidden lg:flex'/> ticket system.


              </p>
            </div>
            <div className='flex justify-center mt-4'>
            {/* <Button name={'View All Articles'} spanBg={''} /> */}
            <button  className='bg-[#fff] border border-[#333] text-[rgb(0,0,0)] px-[1rem] py-[0.2rem] 
      rounded-2xl 
  transition-transform duration-300 ease-in-out hover:shadow-[0px_0px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0 -translate-y-0.5 font-bold'>
                View All Articles
            </button>
            </div>
          </div>
          
          <div className="grid gap-6 items-left lg:items-center">
            <h2 className='mx-auto'>Check the latest article from <span className='font-bold'>this author</span></h2>
            {secondBar.map((item) => (
              <div key={item.id} className="flex flex-row items-start lg:gap-4 gap-3">
                {/* Star Badge & Image */}
                <div className="relative">
                    <div className="absolute w-[4.5rem] h-[4.5rem] -top-4 -left-4">
                    <Image src={starLike} alt='starLikee'/>
                    <span className='absolute bottom-[2.7rem] left-[0.6rem] font-bold'>{item.id}</span>
                  </div>
                  <Image
                    src={item.img}
                    alt="Article thumbnail"
                    width={160}
                    height={160}
                    className="rounded-sm w-[5rem] h-[4rem] object-cover transition-all duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                {/* Article Text - Centered for mobile, left for desktop */}
                <div className="text-left max-w-xs">
                  <h1 className="text-sm text font-bold text-[#333] hover:text-black 
                  hover:underline cursor-pointer">
                    {item.h1}
                  </h1>
                  <p className="text-md text-gray-600 mt-1">{item.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AboutMeContainer>
    </section>
  )
}

export default AboutTheAuthor;