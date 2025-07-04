// 'use client';

import TransitionLink from "@/utils/transitionLink";
import HomePage from "./components/home/homePage";
// import MeetAuthor from "./components/home/customs/meetAuthor";


export default function Home() {

  return (
    <div className="flex justify-center flex-col px-[0.6rem]  pt-[1rem]">
      {/* <FourIt /> */}
      <div className="px-[0.5rem]">
      <HomePage num2={6 } num1={0} />
</div>
     
      <div className="flex gap-3 w-full mt-6 mb-4 justify-center">
        <div>
          <p>Page 1 of 2</p>
        </div>
        <div>
            <TransitionLink href="/page2">
              <button 
                className='bg-[#ff4c60] border border-[#333] 
                text-white px-[1.5rem] py-[0.3rem] font-semibold
                           rounded-3xl flex items-center gap-2 
                           transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
              >
                Next
              </button>
            </TransitionLink>
            </div>
          {/* ) : (
            <div className="relative group">
              <button 
                disabled
                className='bg-gray-300 border border-[#333] text-gray-500 px-[1rem] py-[0.2rem] 
                           rounded-2xl flex items-center gap-2 cursor-not-allowed'
              >
                Next
              </button>

              {/* Tooltip on hover */}
              {/* <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                              bg-black text-white text-sm px-2 py-1 rounded opacity-0 
                              group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Subscribe to view more
              </div>
            </div>
          )}
        </div>  */}
      {/* </div> */}
</div>
      {/* <MeetAuthor /> */}
    </div>
  );
}
