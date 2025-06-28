import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { TiWorld } from 'react-icons/ti';
import Image from 'next/image';
import smilingImg from '@/public/images/smiling Gee.jpg';

interface MainAuthWrapperProps {
  name: string;
  describ: string;
  paragraph: string;
}

const MainAuthWrapper: React.FC<MainAuthWrapperProps> = ({ name, describ, paragraph }) => {
  return (
    <section>
      <div className="bg-[#fffacd] border border-[#333] rounded-2xl relative p-6">
        <div className="flex flex-col items-center gap-[3em] justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-row items-center gap-6 mb-4">
              <div className="flex-shrink-0">
                <Image
                  src={smilingImg}
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="rounded-full w-20 h-20 lg:w-24 lg:h-24 object-cover 
                    transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
                />
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-3xl font-bold text-[#333]">{name}</h1>
                <p className="text-xl text-gray-600">{describ}</p>
              </div>
            </div>

            <div className="text-[#333] leading-relaxed border-t border-gray-200 pt-3 text-center lg:w-[32.5rem]">
              <p>{paragraph}</p>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex gap-5 mt-1">
                <FaTwitter className="text-[#1DA1F2] text-2xl hover:scale-110 transition-transform" />
                <FaFacebookF className="text-[#4267B2] text-2xl hover:scale-110 transition-transform" />
                <TiWorld className="text-[#333] text-2xl hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainAuthWrapper;
