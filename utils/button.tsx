import React from 'react';

interface ButtonProps {
  name: string;
  bgCol: string;
  txtCol: string;
  px: string;
  py: string;
}

const Button: React.FC<ButtonProps> = ({ name, bgCol, txtCol, px, py }) => {
  return (
    <button
      className={`
        rounded-3xl
        font-medium
        text-lg
        transition-all 
        duration-300 
        ease-in-out
        hover:-translate-y-1
        hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
        active:translate-y-0
        active:shadow-none
      `}
      style={{ 
        backgroundColor: bgCol, 
        color: txtCol,
        padding: `${py}rem ${px}rem`
      }}
    >
      {name}
    </button>
  );
};

export default Button;