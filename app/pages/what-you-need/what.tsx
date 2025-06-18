import React from 'react'
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import cubofTea from '@/public/images/cuppy.jpg'

const What = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={cubofTea} title={'What you need to know about Ghost Editor'} 
          date={'March 16, 2021'} duration={'2 min read'}  />
          <AboutTheAuthor />
          <Comments />
     <div className='md:flex'>
      <div className='md:flex-2'>
          <Previous />
          </div>
          <div className='md:flex-[0.5]'></div>
  </div>
    </div>
  )
}

export default What;
