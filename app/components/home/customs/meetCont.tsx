'use client';
import React from 'react';
import smiling from '@/public/authors/auth-smilingGee.jpg';
import Imager from '@/utils/imager';
import purpler from '@/public/authors/auth-purple.jpg';
import dreader from '@/public/authors/auth-dread.jpg';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import headSet from '@/public/authors/auth-headset.jpg';
import { StaticImageData } from 'next/image';
import TransitionLink from '@/utils/transitionLink';

interface Author {
  id: number;
  imgSrc: StaticImageData;
  name: string;
  info: string;
  path: string;
}

const MeetCont = () => {
  const meetAuthorMap: Author[] = [
    {
      id: 1,
      imgSrc: smiling,
      name: 'Jonathan Doe',
      info:
        'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, I offer live support via our ticket system.',
       path: '/Authors/jonathan-doe'
 },
    {
      id: 2,
      imgSrc: purpler,
      name: 'Mary Buzard',
      info:
        'Hello! My name is Mary Buzard! Actively writing articles for this website. I really like tutorials and illustrations, so stay alert for my next tutorials.',
           path: '/Authors/mary-buzard'

      },
    {
      id: 3,
      imgSrc: dreader,
      name: 'James Brawson',
      info:
        'Actively writing articles for this website. I really like traveling and photography. Follow me on @Twitter, I share content there every day.',
             path: '/Authors/james-brawson'

      },
    {
      id: 4,
      imgSrc: headSet,
      name: 'Joseph Fransics',
      info:
        'Friendly social media specialist. Professional introvert. Just love to write on this platform.',
                path: '/Authors/joseph-fransics'

      },
  ];

  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-center items-stretch gap-2 lg:gap-3 py-5">
      {meetAuthorMap.map((item) => (
        <div
          key={item.id}
          className="lg:w-[24%] w-full lg:flex flex-col lg:justify-between p-2"
        >
          {/* Image + Buttons */}
          <div className="relative overflow-hidden rounded-md">
                        <TransitionLink href={item.path}>

          <Imager
  src={item.imgSrc}
  alt="author"
  className="w-full h-[250px] lg:h-[80%] border border-[#333] object-cover rounded-md transition-all duration-300 ease-in-out"
/>
</TransitionLink>
     

            <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2">
            <TransitionLink href={item.path}>
              <button className="px-3 py-1 bg-white text-[#333] border border-[#333] rounded-3xl font-bold text-[10px] lg:text-sm">
                {item.name}
              </button>
              </TransitionLink>
            </div>
          </div>

          {/* Text Info */}
<div className="text-sm lg:-mt-11 text-gray-700 text-center flex items-start justify-center min-h-[100px]">
            <p className="px-1 max-w-[23rem]">{item.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetCont;