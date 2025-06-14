import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiWifi } from 'react-icons/fi';

const FourthStuff = () => {
      const mapElements = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      color: '#4267B2',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: '#1DA1F2',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: '#E1306C',
    },
    {
      name: 'RSS',
      icon: FiWifi,
      color: '#FF6600',
    },
  ];
  return (
   
  <div className="flex flex-col gap-6">
          {mapElements.map(({ name, icon: Icon, color }) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white border-2 border-[#333] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5">
                <Icon size={28} style={{ color }} />
              </div>
              <h1 className="text-[#333] font-bold text-lg">{name}</h1>
            </div>
          ))}
        </div>
  )
}

export default FourthStuff
