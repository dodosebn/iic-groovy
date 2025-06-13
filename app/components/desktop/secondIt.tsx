import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react'
import imgSrc from '@/public/images/introImg.avif';
import Image from 'next/image';
const SecondIt = () => {
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

  )
}

export default SecondIt;
