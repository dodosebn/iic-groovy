'use client';

import React, { ReactNode } from 'react';

const CenteringPages = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 pb-6">
      <div className="flex flex-col justify-center items-center gap-12 max-w-3xl w-full">  
        {children}    
      </div>
    </div>
  );
};

export default CenteringPages;
