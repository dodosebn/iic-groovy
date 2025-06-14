import Image, { ImageProps } from 'next/image';
import React from 'react';

interface ImagerProps extends Omit<ImageProps, 'className' | 'alt'> {
  /** 
   * Flexible className that accepts any Tailwind or custom CSS classes
   * @default ''
   */
  className?: string;

  alt: string;
}

const Imager: React.FC<ImagerProps> = ({
  className = '',
  src,
  alt,
  width,
  height,
  ...props
}) => {
  const baseHoverStyles = 'transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5';
  
  const combinedClasses = `${className} ${baseHoverStyles}`.trim();

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={combinedClasses}
      {...props}
    />
  );
};

export default Imager;