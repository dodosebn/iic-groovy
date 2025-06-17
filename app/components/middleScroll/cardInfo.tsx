// import React from 'react'
// import Image from 'next/image';
// import Button from '@/utils/button';
// import HorizontalDivider from '@/utils/horizontal';
// import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
// import hadShowingBulb from '@/public/images/hand-invention.jpg';
// import cubofTea from '@/public/images/cub-of-tea.jpg';
// import boySmiling from '@/public/images/smiling Gee.jpg';
// import fan from '@/public/images/fan.jpg';
// import TransitionLink from '@/utils/transitionLink';
// const CardInfo = ({genImg, date, time, title, p1, p2}) => {
//   return (
//     <main className='px-3 py-3 md:py-4 bg-[#f0f0fe]  mx-auto rounded-xl border-1 border-[#000]'>
//       <section className='flex flex-col md:flex-row gap-8 p-5  md:p-8'>
//         {/* Image Section - Takes more space on desktop */}
//       <div className='md:flex-1 h-[38vh] md:h-[25rem]'>
//   <Image 
//     src={genImg} 
//     alt='Article visual'
//     className='w-full h-full object-cover rounded-xl border-1 border-[#333]  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5'
  
//     priority
//   />
// </div>
        
//         {/* Content Section */}
//         <div className='md:flex-[1.5] flex flex-col justify-center md:py-4 space-y-6'>
//           {/* Category and Date */}
//           <div className='flex flex-col space-y-3'>
//             <div>
         
// <Button name='Travel' spanBg='#c5c5fe'/>
//             </div>
//             <div className='flex items-center space-x-3 text-gray-600'>
//               <p>{date}</p>
//               <span className='w-1 h-1 bg-pink-600 rounded-full'></span>
//               <p>{time}</p>
//             </div>
//           </div>
          
//           {/* Title */}
//           <div className='border-2 border-[#333] bg-[#fff] p-6 rounded-lg'>
//             <h1 className='text-2xl md:text-3xl font-bold text-gray-800 '>
//                 {title}
//             </h1>
//           </div>

//           {/* Author and Update */}
//           <div className='flex flex-col sm:flex-row sm:items-center md:justify-between gap-4'>
//             <div className='items-center space-x-3 md:flex hidden'>
//               <Image 
//                 src={boySmiling} 
//                 alt='Author avatar' 
//                 width={40}
//                 height={40}
//                 className='rounded-full w-10 h-10 object-cover  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5'
//               />
//               <p className='font-medium '>John Doe</p>
//             </div>
//             <div className='text-sm text-gray-500'>
//               <span className='font-semibold'>Last Update: </span>March 13, 2025
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Second Section */}
//       <section className=' mx-auto px-3 md:px-[3rem] py-8 md:py-12 space-y-8'>
//         <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
//           <p>
//             {p1}
//           </p>
//           <p>
//             {p2}
//           </p>
//           <p>
//         {p3}
//           </p>
//         </div>

//         <div className='flex flex-col space-y-2'>
//           <div className='flex justify-center h-auto  overflow-hidden'>
//           <Image 
//   src={hadShowingBulb}
//   alt="Content illustration"
//   className="w-[25rem] h-auto border-1 border-[#333] object-cover rounded-md 
//     transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5"
// />
//           </div>
//           <p className='text-center text-gray-500 text-lg'>Image caption</p>
//         </div>

//         <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
//           <p>
//            {p4}
//           </p>
//           <p>
//            {p5}
//           </p>
//           <p>
//             {p6}
//           </p>
//         </div>

//         <div className='space-y-2'>
//           <div className='flex flex-row gap-4'>
//             <div className='flex-[1.5] overflow-hidden'>
//               <Image 
//                 src={cubofTea} 
//                 alt='Gallery image 1'
//                 className='w-full h-full  border-1 border-[#333] object-cover rounded-md 
//     transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5'
//                 width={400}
//                 height={300}
//               />
//             </div>
//             <div className='flex-1 overflow-hidden'>
//               <Image 
//                 src={fan} 
//                 alt='Gallery image 2'
//                 className='w-full h-full border-1 border-[#333] object-cover rounded-md 
//     transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5'
//                 width={400}
//                 height={300}
//               />
//             </div>
//             <div className='flex-1  overflow-hidden'>
//               <Image 
//                 src={hadShowingBulb} 
//                 alt='Gallery image 3'
//                 className='w-full h-full border-1 border-[#333] object-cover rounded-md 
//   shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)]  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
//                  hover:-translate-y-0.5'
//                 width={400}
//                 height={300}
//               />
//             </div>
//           </div>
//           <p className='text-center text-gray-500 text-lg'>Gallery Card</p>
//         </div>

//         <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
//           <p>
//         {P7}
//           </p>
//           <p>
//             {P8}
//           </p>
//           <p>
//             Like this! 
//             <span className='border-b-2 border-[#333] font-bold hover:border-none cursor-pointer
//              transition-colors'><TransitionLink href='/membership/signUp'>Sign up here</TransitionLink></span>
//           </p>
//         </div>

//         <HorizontalDivider />

//         <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
//           <p>
//          {p9}
//           </p>
//           <p>Social networks go in and out of fashion all the time. Email addresses are timeless.</p>
//           <p>
//             Growing your audience is valuable no matter what type of site you run, but if your content is your business,
//             then you might also be interested in <span className='border-b-2  border-[#333]
//              hover:border-none cursor-pointer transition-colors font-bold'>setting up premium subscriptions. </span>
//           </p>
//         </div>

//         <div className='flex flex-wrap md:items-center md:justify-center md:gap-3 gap-2 py-6'>
//           <span className='text-gray-700 font-bold'>Tagged in:</span>
//           <Button name={'Travel'} spanBg={'#c5c5fe'} />
//              <Button name={'Business'} spanBg={'#83ea6c'} />

   
//         </div>

//         <HorizontalDivider />

//         <div className='text-center space-y-6 py-8'>
//           <h2 className='text-xl font-semibold text-gray-700'>Like what you read?</h2>
//           <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Subscribe to our Newsletter</h1>
//   <div className="relative max-w-md mx-auto">
//   <input
//     type="email"
//     placeholder="Enter your email address"
//     className="w-full px-4 py-3 pr-32 rounded-full border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-500"
//   />
//   <button
//     className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4c60] text-white px-4 py-1.5 rounded-full text-sm font-medium 
//               transition-shadow duration-200 ease-out 
//               hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
//   >
//     Subscribe
//   </button>
// </div>
//           <p className='text-gray-600 max-w-2xl  mx-auto'>
//             Subscribe to our email newsletter and unlock access to <br className='hidden md:flex' /> <span className='font-bold'> 
//             members-only</span> content and <span className='font-bold'>exclusive updates.</span>
//           </p>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default CardInfo;