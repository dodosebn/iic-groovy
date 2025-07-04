import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react'
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { TiWorld } from 'react-icons/ti';
import Image, { StaticImageData } from 'next/image';
// import imgSrc from '@/public/images/introImg.avif';
import boySmiling from '@/public/images/smiling Gee.jpg';
interface FirstItProps {
    displayImg: StaticImageData,
    name: string,
    describ: string,
    paragraph: string

}
const FirstIt: React.FC<FirstItProps> = ({displayImg, name, describ, paragraph}) => {
  return (
         <section>
        <AboutMeContainer name="About Me">
          <div className="flex gap-4 items-start mb-4">
            <div className="flex-shrink-0">
              <Image
                src={displayImg}
                alt="Profile picture"
                width={80}
                height={80}
                className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover 
                transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold text-[#333]">{name}</h1>
              <p className="text-sm text-gray-600">{describ}</p>
              <div className="flex gap-3 mt-1">
                <FaTwitter className="text-[#1DA1F2] text-lg hover:scale-110 transition-transform" />
                <FaFacebookF className="text-[#4267B2] text-lg hover:scale-110 transition-transform" />
                <TiWorld className="text-[#333] text-xl hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          <div className="text-[#333] leading-relaxed border-t border-gray-200 pt-3">
            <p className="w-[15rem]">
            {paragraph}
            </p>
          </div>
        </AboutMeContainer>
      </section>
  )
}

export default FirstIt;
