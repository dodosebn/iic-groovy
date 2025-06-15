import React from 'react';
import Imager from '@/utils/imager';
import Button from '@/utils/button';
import { HomeWrapperProps } from '@/types/type';
import TransitionLink from '@/utils/transitionLink';

const HomeWrapper: React.FC<HomeWrapperProps> = ({
  bg,
  pics,
  picsIcon1: PicsIcon1,
  picsIcon2: PicsIcon2,
  date,
  duration,
  h1,
  p,
  img,
  imgName,
  btnCol,
  btnTxt,
}) => {
  return (
    <main>
  <div
  className="mx-auto md:h-[35rem] flex flex-col justify-between rounded-xl border border-[rgb(0,0,0)]"
  style={bg ? { backgroundColor: bg } : {}}
>

      <section className="flex flex-col gap-8 p-5 md:p-6">
        {/* Image Section */}
        {pics && (
          <div className=" h-[38vh]  relative">
            <TransitionLink href='building-your-audience'>
            <Imager
              src={pics}
              alt="Article visual"
              className="w-full h-full object-cover rounded-xl border-1 border-[#333]"
              priority
            />
            </TransitionLink>
            {(btnTxt || PicsIcon1 || PicsIcon2) && (
              <div className="absolute w-full bottom-[7.3rem] p-4">
                <div className="flex justify-between items-center w-full">
                  {btnTxt && btnCol && (
                    <div className=" flex">
                      <Button name={btnTxt} spanBg={btnCol} />
                    </div>
                  )}

                  {(PicsIcon1 || PicsIcon2) && (
                    <div className="flex space-x-1.5">
                      {PicsIcon1 && (
                        <div className="bg-[#333] rounded-full p-3">
                          <PicsIcon1 className="text-white w-5 h-5" />
                        </div>
                      )}
                      {PicsIcon2 && (
                        <div className="bg-[#333] rounded-full p-3">
                          <PicsIcon2 className="text-white w-5 h-5" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className=" flex flex-col justify-center px-2  space-y-6">
          {(btnTxt || date || duration) && (
            <div className="flex flex-row space-x-3">
              {btnTxt && btnCol && (
                <div className=" hidden">
                  <Button name={btnTxt} spanBg={btnCol} />
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

          {(h1 || p) && (
            <div>
              {h1 && (
                            <TransitionLink href='building-your-audience'>
                <h1 className="text-2xl  font-bold leading-snug text-gray-800 hover:underline transition-all">
                  {h1}
                </h1>
                </TransitionLink>
              )}
              {p && (
                <p className="pt-3  text-sm">
                  {p}
                </p>
              )}
            </div>
          )}

          <div className="md:flex flex-col sm:flex-row sm:items-center md:justify-between gap-4">
            <div>
                                          <TransitionLink href='building-your-audience'>

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
    </main>
  );
};

export default HomeWrapper;
