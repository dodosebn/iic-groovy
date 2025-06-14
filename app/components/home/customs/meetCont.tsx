
import React, { useState } from 'react';
import smiling from '@/public/authors/auth-smilingGee.jpg';
import Imager from '@/utils/imager';
import purpler from '@/public/authors/auth-purple.jpg';
import dreader from '@/public/authors/auth-dread.jpg';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import headSet from '@/public/authors/auth-headset.jpg';
import portTray from '@/public/authors/auth-portrait.jpg';
import yellow from '@/public/authors/auth-yelo.jpg';
import { StaticImageData } from 'next/image';

interface Author {
  id: number;
  imgSrc: StaticImageData;
  name: string;
}

const MeetCont: React.FC<{ currentIndex: number }> = ({ currentIndex }) => {
  const meetAuthorMap: Author[] = [
    { id: 1, imgSrc: smiling, name: 'Jonathan Doe' },
    { id: 2, imgSrc: purpler, name: 'Mary Buzard' },
    { id: 3, imgSrc: dreader, name: 'James Brawson' },
    { id: 4, imgSrc: headSet, name: 'Joseph Fransics' },
    { id: 5, imgSrc: portTray, name: 'Brenda Hitchell' },
    { id: 6, imgSrc: yellow, name: 'Brenda Hitchell' },
  ];

  // For desktop, show 5 authors, for mobile show 2
  const itemsToShow = typeof window !== 'undefined' ? 
    (window.innerWidth >= 768 ? 5 : 2) : 5;

  // Calculate which authors to show based on currentIndex
  const visibleAuthors = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentIndex + i) % meetAuthorMap.length;
    visibleAuthors.push(meetAuthorMap[index]);
  }

  return (
    <div className='flex md:space-x-7 justify-between md:justify-center overflow-x-hidden'>
      {visibleAuthors.map((item) => (
        <div key={item.id} className='relative mt-6 flex-shrink-0'>
          <div>
            <Imager 
              src={item.imgSrc} 
              alt="ohms" 
              className='md:w-[12.6rem] w-[10rem] md:h-[18rem] h-[10rem] object-cover rounded-md border-1 border-[#333]' 
            />
            <div>
              <div className='absolute bottom-[15rem] left-[7rem]'>
                <div className='flex space-x-3'>
                  <div className="w-9 h-9 bg-white border-1 border-[#1da1f2] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
                    <FaTwitter color='#1da1f2' />
                  </div>
                  <div className="w-9 h-9 bg-white border-1 border-[#175beb] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
                    <FaFacebookF color='#175beb' />
                  </div>
                </div>
              </div>
              <div className='absolute bottom-[1.1rem] md:left-[1.3rem] left-[1.1rem]'>
                <button className='px-5 py-1 bg-[#fff] text-[rgb(51,51,51)] border border-[#333]
                 rounded-3xl font-bold md:text-lg text-[9px]'>
                  {item.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetCont;