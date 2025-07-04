import React from 'react';
import Imager from '@/utils/imager';
import Button from '@/utils/button';
import { HomeWrapperProps } from '@/types/type';
import TransitionLink from '@/utils/transitionLink';

const HomeWrapper: React.FC<HomeWrapperProps> = ({
  bg,
  pics,

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
  return (
    <div
      className="mx-auto rounded-xl border border-[#000]"
      style={bg ? { backgroundColor: bg } : {}}
    >
      <section className="flex flex-col md:flex-row gap-8 p-5 md:p-6">
        {/* Image Section */}
        {pics && (
          <div className="md:flex-1 h-[38vh] md:h-[25rem] relative">
                      <TransitionLink href={path}>

            <Imager
              src={pics}
              alt="Article visual"
              className="w-full h-full object-cover rounded-xl border-1 border-[#333]"
              priority
            />
            </TransitionLink>
            {(tag) && (
              <div className="absolute w-full bottom-[75%] p-4">
                <div className="flex justify-between items-center w-full">
                  {tag && btnCol && (
                    <div className="md:hidden flex">
                      <Button name={tag} spanBg={btnCol} />
                    </div>
                  )}

               
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="md:flex-[1.5] flex flex-col justify-center px-2 md:px-0 md:py-4 space-y-6">
          {/* Date and Category */}
          {(tag || date || duration) && (
            <div className="flex flex-row space-x-3">
              {tag && btnCol && (
                <div className="md:flex hidden">
                  <Button name={tag} spanBg={btnCol} />
                </div>
              )}
              {(date || duration) && (
                <div className="flex items-center space-x-3 text-gray-600">
                  {date && <p>{date}</p>}
                  {date && duration && (
                    <span className="w-1 h-1 bg-pink-600 rounded-full md:flex hidden" />
                  )}
                  {duration && <p>{duration}</p>}
                </div>
              )}
            </div>
          )}

          {/* Title and Paragraph */}
          {(h1 || p) && (
            <div>
              {h1 && (
                          <TransitionLink href={path}>

                <h1 className="text-2xl md:text-4xl md:w-[20rem] font-bold leading-snug text-gray-800 hover:underline transition-all">
                  {h1}
                </h1>
                </TransitionLink>
              )}
              {p && (
                <p className="pt-3 md:text-lg text-sm">
                  {p}
                </p>
              )}
            </div>
          )}

          {/* Continue Button and Author Info */}
          <div className="md:flex flex-col sm:flex-row sm:items-center md:justify-between gap-4">
            <div>
                                    <TransitionLink href={path}>

              <button
                className="bg-[#fff] border border-[#333] text-[rgb(0,0,0)] px-[2rem] py-[0.2rem] 
                  rounded-2xl transition-transform duration-300 ease-in-out 
                  hover:shadow-[0px_0px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000] 
                  hover:-translate-y-0 -translate-y-0.5 font-bold"
              >
                Continue
              </button>
              </TransitionLink>
            </div>

            {img && imgName && (
              <div className="text-sm text-gray-500">
                <div className="items-center space-x-3 md:flex hidden">
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
  );
};

export default HomeWrapper;