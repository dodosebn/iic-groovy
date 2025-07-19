// 'use client';

import HomePage from "./sosioHW";
import Link from "next/link";


export default function Hooome() {

  return (
    <div className="flex justify-center flex-col px-[0.6rem] space-y-6 pt-[1rem]">
      {/* <FourIt /> */}
      <div className="px-[0.5rem]">
      <HomePage num2={6 } num1={0} />
</div>
     
      <div className="flex gap-3 w-full my-16 justify-center">
        <div>
          <p>Page 1 of 2</p>
        </div>
        <div>
            <Link
  href="/page2"
  onClick={(e) => {
    e.preventDefault();
    window.location.href = '/page2'; 
  }}
>
  <button 
    className="bg-[#ff4c60] border border-[#333] 
               text-white px-[1.5rem] py-[0.3rem] font-semibold
               rounded-3xl flex items-center gap-2 
               transition-transform duration-300 ease-in-out 
               hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
  >
    Next
  </button>
</Link>

            </div>
          
</div>
    </div>
  );
}
