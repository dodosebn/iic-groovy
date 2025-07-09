import React from 'react';

interface ButtonProps {
  name: string;
  spanBg: string; // accepts color codes like '#c5c5fe'
}

const Button = ({ name, spanBg }: ButtonProps) => {
  return (
    <button 
      className='bg-[#fff] border border-[#333] text-[rgb(0,0,0)] px-[1rem] py-[0.2rem] 
      rounded-2xl flex items-center gap-2 w-[12rem] mx-auto justify-center
  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
    >
      <span 
        className='w-3 h-3'
        style={{
          backgroundColor: spanBg,
          clipPath: 'polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)',
          borderRadius: '15%'
        }}
      ></span>
      {name}
    </button>
  );
};
export default Button;