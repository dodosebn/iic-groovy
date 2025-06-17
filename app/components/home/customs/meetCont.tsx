import React from 'react';
import smiling from '@/public/authors/auth-smilingGee.jpg';
import Imager from '@/utils/imager';
import purpler from '@/public/authors/auth-purple.jpg';
import dreader from '@/public/authors/auth-dread.jpg';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import headSet from '@/public/authors/auth-headset.jpg';
import { StaticImageData } from 'next/image';

interface Author {
  id: number;
  imgSrc: StaticImageData;
  name: string;
  info: string;
}

const MeetCont = () => {
  const meetAuthorMap: Author[] = [
    {
      id: 1,
      imgSrc: smiling,
      name: 'Jonathan Doe',
      info:
        'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, I offer live support via our ticket system.',
    },
    {
      id: 2,
      imgSrc: purpler,
      name: 'Mary Buzard',
      info:
        'Hello! My name is Mary Buzard! Actively writing articles for this website. I really like tutorials and illustrations, so stay alert for my next tutorials.',
    },
    {
      id: 3,
      imgSrc: dreader,
      name: 'James Brawson',
      info:
        'Actively writing articles for this website. I really like traveling and photography. Follow me on @Twitter, I share content there every day.',
    },
    {
      id: 4,
      imgSrc: headSet,
      name: 'Joseph Fransics',
      info:
        'Friendly social media specialist. Professional introvert. Just love to write on this platform.',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-3 py-7">
      {meetAuthorMap.map((item) => (
        <div key={item.id} className="md:w-[24%] w-full flex flex-col justify-between p-2">
          {/* Image + Buttons */}
          <div className="relative">
            <Imager
              src={item.imgSrc}
              alt="author"
              className="md:w-[15rem] w-full h-[16.5rem] object-cover rounded-md border border-[#333]"
            />

            <div className="absolute top-[1rem] left-[9rem] md:block hidden">
              <div className="flex space-x-3">
                <div className="w-9 h-9 bg-white border border-[#1da1f2] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
                  <FaTwitter color="#1da1f2" />
                </div>
                <div className="w-9 h-9 bg-white border border-[#175beb] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
                  <FaFacebookF color="#175beb" />
                </div>
              </div>
            </div>

           <div className="absolute top-[13rem] left-1/2 transform -translate-x-1/2">
  <button className="px-3 py-1 bg-white text-[#333] border border-[#333] rounded-3xl font-bold text-[10px] md:text-sm">
    {item.name}
  </button>
</div>

          </div>

          <div className="mt-4 text-sm text-gray-700 w-full text-center min-h-[100px]
           flex items-start justify-center">
            <p className="px-2">{item.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetCont;
