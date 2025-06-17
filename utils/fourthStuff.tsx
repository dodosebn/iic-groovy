import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import TransitionLink from '@/utils/transitionLink'; // adjust as needed

const FourthStuff = () => {
                  //  <FaXTwitter className="text-black hover:text-gray-800 cursor-pointer" size={24} />
  
  const mapElements = [
    {
      name: 'Twitter',
      icon: FaXTwitter,
      color: '#001',
      path: 'https://x.com/ideaischange',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: '#E1306C',
      path: 'https://www.instagram.com/ideaischange/',
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      color: '#000',
      path: 'https://www.tiktok.com/@ideaischange',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {mapElements.map(({ name, icon: Icon, color, path }) => (
        <div key={name} className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white border-2 border-[#333] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
            <TransitionLink href={path}>
              <Icon size={28} style={{ color }} />
            </TransitionLink>
          </div>
          <h1 className="text-[#333] font-bold text-lg">{name}</h1>
        </div>
      ))}
    </div>
  );
};

export default FourthStuff;
