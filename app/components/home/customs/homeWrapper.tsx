'use client';
import React, { useEffect, useRef, useState } from 'react';
import Imager from '@/utils/imager';
import Button from '@/utils/button';
import { HomeWrapperProps } from '@/types/type';
import TransitionLink from '@/utils/transitionLink';
import Image from 'next/image';
import socioImg from '@/public/images/socioloji.webp';

const HomeWrapper: React.FC<HomeWrapperProps> = ({
  bg,
  pics,
  // picsIcon1: PicsIcon1,
  // picsIcon2: PicsIcon2,
  date,
  duration,
  h1,
  p,
  img,
  imgName,
  btnCol,
  tag,
  path,
}) => {
  const flexRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const checkWrap = () => {
      const container = flexRef.current;
      if (!container) return;

      const children = Array.from(container.children) as HTMLElement[];
      const totalChildrenWidth = children.reduce((acc, child) => acc + child.offsetWidth, 0);
      const containerWidth = container.offsetWidth;

      setIsWrapped(totalChildrenWidth > containerWidth);
    };

    const observer = new ResizeObserver(checkWrap);
    if (flexRef.current) observer.observe(flexRef.current);

    checkWrap();

    return () => {
      if (flexRef.current) observer.unobserve(flexRef.current);
    };
  }, []);

  return (
    <div>
    <main>
      <div
        className="mx-auto flex flex-col justify-between h-full   
            rounded-xl border border-[rgb(0,0,0)]"
        style={bg ? { backgroundColor: bg } : {}}
      >
        <section className="flex flex-col gap-5 p-5 ">
          {pics && (
            <div className="relative">
              <TransitionLink href={path}>
                <Image
                  src={pics}
                  alt="Article visual"
                  className="w-full h-[78%] [object-position:center_30%] 
                    object-cover rounded-t-2xl border-1 border-[#333]"
                  priority
                />
              </TransitionLink>

              {(tag) && (
                <div className="w-full absolute bottom-[87%]   px-4">
                  <div className="flex justify-between items-center w-full">
                    {tag && btnCol && (
                      <div className="flex">
                        <Button name={tag} spanBg={btnCol} />
                      </div>
                    )}
                 
                  </div>
                </div>
              )}

              {h1 && (
                <div>
                  <div className="px-4 py-2 mx-auto text-center bg-[#fff] rounded-b-lg border-1 border-[#333] transition-transform duration-300 ease-in-out hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.9">
                    <TransitionLink href={path}>
                      <h1 className="lg:text-[1.3rem] text-md font-bold leading-snug text-gray-900 transition-all">
                        {h1}
                      </h1>
                    </TransitionLink>
                  </div>
                </div>
              )}
            </div>
          )}
<div>
      {tag && btnCol && (
                  <div className="hidden">
                    <Button name={tag} spanBg={btnCol} />
                  </div>
                )}
<div className="flex flex-col w-full">
      
                {(date || img || imgName) && (
                  <div className="flex items-center justify-between space-x-3
                   text-gray-600 font-semibold text-sm ">
                    {date && <div> <p>{date}</p> </div>}
                     {/* <div className='w-1/2'> </div> */}
                                 {img && imgName && (
                <div className="text-sm text-gray-500 order-1">
                  <div className="items-center space-x-3 flex ">
                    <Imager
                      src={socioImg}
                      alt="Author avatar"
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <p className="font-medium">Socioloji</p>
                  </div>
                </div>
              )}
                  </div>
                )}
           
</div>

           

            <div
              className={`flex mt-5 lg:pt-1 flex-col items-center justify-center
              `}
            >
              <div className="order-2 lg:mt-1">
                <TransitionLink href={path}>
                  <button
                    className="bg-[#fff] border border-[#333] text-[rgb(0,0,0)] px-[2rem] py-[0.2rem] 
                    rounded-2xl transition-transform duration-300 ease-in-out 
                    hover:shadow-[0px_0px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] 
                    hover:-translate-y-0 -translate-y-0.5 font-bold"
                  >
                    Take Survey
                  </button>
                </TransitionLink>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
   
  
    </div>
  );
};

export default HomeWrapper;
