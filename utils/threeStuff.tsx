import React from 'react'
import Image from 'next/image';
import shortHB from '@/public/images/short-hand-holding-bulb.jpg';
import snailLike from '@/public/images/snail-like.jpg';
import shoeLike from '@/public/images/shoe.jpg';
import starLike from '@/public/images/star.svg';

const ThreeStuff = () => {
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
      img: shoeLike,
      h1: 'The subline before us was indeed sublime',
      p: 'Apr 26, 2019 ',
    },
  ];
  return (
        <div className="grid gap-6 md:grid-cols-[auto_1fr] items-start">
            {secondBar.map((item) => (
              <React.Fragment key={item.id}>
                {/* Star Badge & Image */}
                <div className="relative">
                  <div className="absolute w-[4.5rem] h-[4.5rem] -top-4 -left-4">
                    <Image src={starLike} alt='starLikee'/>
                    <p className='absolute bottom-11 left-[10px]'>{item.id}</p>
                  </div>
                  <Image
                    src={item.img}
                    alt="Article thumbnail"
                    width={120}
                    height={120}
                    className="rounded-sm w-[4rem] h-[4rem] object-cover transition-all duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]"
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
  )
}

export default ThreeStuff;

// const FooterContainer = () => {
//   return (
    
//   );
// };

// export default FooterContainer;