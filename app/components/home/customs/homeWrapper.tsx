'use client';
import React, { useEffect, useRef, useState } from 'react';
import Imager from '@/utils/imager';
import Button from '@/utils/button';
import { HomeWrapperProps } from '@/types/type';
import TransitionLink from '@/utils/transitionLink';
import Image from 'next/image';

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

    <main>
      <div
        className="mx-auto flex flex-col justify-between lg:min-h-[44rem] lg:max-h-[50rem]  rounded-xl border border-[rgb(0,0,0)]"
        style={bg ? { backgroundColor: bg } : {}}
      >
        <section className="flex flex-col gap-5 p-5 ">
          {pics && (
            <div className="relative">
              <TransitionLink href={path}>
                <Image
                  src={pics}
                  alt="Article visual"
                  className="w-full h-[20rem] lg:h-[24rem] [object-position:center_30%] 
                    object-cover rounded-2xl border-1 border-[#333]"
                  priority
                />
              </TransitionLink>

              {(tag) && (
                <div className="w-full absolute bottom-[16.5rem]   lg:bottom-[21rem]  px-4">
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
                <div className="absolute bottom-1 p-4">
                  <div className="px-4 py-2 mx-auto text-center bg-[#fff] rounded-lg border-1 border-[#333] transition-transform duration-300 ease-in-out hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.9">
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

          <div className="flex flex-col items-center justify-center px-2 space-y-3">
            {(tag || date || duration) && (
              <div className="flex flex-row space-x-3">
                {tag && btnCol && (
                  <div className="hidden">
                    <Button name={tag} spanBg={btnCol} />
                  </div>
                )}
                {(date || duration) && (
                  <div className="flex items-center space-x-3 text-gray-600 font-semibold text-sm">
                    {date && <p>{date}</p>}
                    {date && duration && (
                      <span className="w-1 h-1 bg-pink-600 rounded-full lg:flex hidden" />
                    )}
                    {duration && <p>{duration}</p>}
                  </div>
                )}
              </div>
            )}

            {p && (
              <div className="flex flex-col items-center justify-center  text-center">
                <p className="text-md leading-loose text-center lg:px-10">{p}</p>
              </div>
            )}

            <div
              className={`lg:flex mt-5 lg:mt-0 flex-col sm:flex-row flex-wrap gap-3 
                 'items-center' : 'items-center'
              `}
            >
              <div className="order-2">
                <TransitionLink href={path}>
                  <button
                    className="bg-[#fff] border border-[#333] text-[rgb(0,0,0)] px-[2rem] py-[0.2rem] 
                    rounded-2xl transition-transform duration-300 ease-in-out 
                    hover:shadow-[0px_0px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] 
                    hover:-translate-y-0 -translate-y-0.5 font-bold"
                  >
                    Continue Reading
                  </button>
                </TransitionLink>
              </div>

              {img && imgName && (
                <div className="text-sm text-gray-500 order-1">
                  <div className="items-center space-x-3 lg:flex hidden">
                    <Imager
                      src={img}
                      alt="Author avatar"
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <p className="font-medium">{imgName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeWrapper;
