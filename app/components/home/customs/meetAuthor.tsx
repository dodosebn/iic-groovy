'use client';
import React, { useState, useEffect } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import MeetCont from './meetCont';

const MeetAuthor = () => {
  
  

  return (
    <div className='p-[1.2rem] lg:p-0'>
        
          <button className='px-5 py-1 bg-[#fff] text-[rgb(51,51,51)] border border-[#333] rounded-3xl font-bold text-lg'>
            Meet The Author
          </button>
       

      
      <div>
        <MeetCont />
      </div>
      </div>
  )
}

export default MeetAuthor;