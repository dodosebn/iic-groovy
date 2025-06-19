import React from 'react'
import Image, { StaticImageData } from 'next/image';
import Button from '@/utils/button';
import HorizontalDivider from '@/utils/horizontal';
import hadShowingBulb from '@/public/images/hand-invention.jpg';
import cubofTea from '@/public/images/cuppy.jpg'
import boySmiling from '@/public/images/smiling Gee.jpg';
import fan from '@/public/images/fan.jpg';
interface cardProps {
  imgGen: string | StaticImageData;
 title: string;
 date: string;
 duration: string;
 bg: string;
}
const FirstCard: React.FC<cardProps > = ({imgGen, title, date, duration, bg}) => {
  return (
    <main className='px-3 py-3 lg:py-4  mx-auto rounded-xl border-1 border-[#000]' 
      style={{ backgroundColor: bg }}>
      <section className='flex flex-col lg:flex-row gap-8 p-5  lg:p-8'>
      <div className='lg:flex-1 h-[38vh] lg:h-[25rem]'>
  <Image 
    src={imgGen} 
    alt='Article visual'
    className='w-full h-full object-cover rounded-xl border-1 border-[#333]  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
  
    priority
  />
</div>
        
        {/* Content Section */}
        <div className='lg:flex-[1.5] flex flex-col justify-center lg:py-4 space-y-6'>
          {/* Category and Date */}
          <div className='flex flex-col space-y-3'>
            <div>
         
<Button name='Travel' spanBg='#c5c5fe'/>
            </div>
            <div className='flex items-center space-x-3 text-gray-600'>
              <p>{date}</p>
              <span className='w-1 h-1 bg-pink-600 rounded-full'></span>
              <p>{duration}</p>
            </div>
          </div>
          
          {/* Title */}
          <div className='border-2 border-[#333] bg-[#fff] p-6 rounded-lg'>
            <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 '>
              {title}
            </h1>
          </div>

          {/* Author and Update */}
          <div className='flex flex-col sm:flex-row sm:items-center lg:justify-between gap-4'>
            <div className='items-center space-x-3 lg:flex hidden'>
              <Image 
                src={boySmiling} 
                alt='Author avatar' 
                width={40}
                height={40}
                className='rounded-full w-10 h-10 object-cover  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
              />
              <p className='font-medium '>John Doe</p>
            </div>
            <div className='text-sm text-gray-500'>
              <span className='font-semibold'>Last Update: </span>March 13, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className=' mx-auto px-3 lg:px-[3rem] py-8 lg:py-12 space-y-8'>
        <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
          <p>
            What sets Ghost apart from other products is that you can publish content
            and grow your audience using the same platform. Rather than just endlessly posting and
            hoping someone is listening, you can track real signups against your work and have them 
            subscribe to be notified of future posts. The feature that makes all this possible is called Portal.
          </p>
          <p>
            Portal is an embedded interface for your audience to sign up to your site. 
            It works on every Ghost site, with every theme, and for any type of publisher.
          </p>
          <p>
            You can customize the design, content and settings of Portal to suit your site, 
            whether you just want people to sign up to your newsletter — or you're running a full
            premium publication with user sign-ins and private content.
          </p>
        </div>

        <div className='flex flex-col space-y-2'>
          <div className='flex justify-center h-auto  overflow-hidden'>
          <Image 
  src={hadShowingBulb}
  alt="Content illustration"
  className="w-[25rem] h-auto border-1 border-[#333] object-cover rounded-md 
    transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5"
/>
          </div>
          <p className='text-center text-gray-500 text-lg'>Image caption</p>
        </div>

        <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
          <p>
            Once people sign up to your site, they'll receive an email confirmation with a link to click.
            The link acts as an automatic sign-in, so subscribers will be automatically signed-in to your
            site when they click on it. There are a couple of interesting angles to this:
          </p>
          <p>
            Because subscribers are automatically able to sign in and out of your site as registered members:
            You can (optionally) restrict access to posts and pages depending on whether people are signed-in or not.
            So if you want to publish some posts for free, but keep some really great stuff for members-only,
            this can be a great draw to encourage people to sign up!
          </p>
          <p>
            Ghost members sign in using email authentication links, so there are no passwords for people to set or forget.
            You can turn any list of email subscribers into a database of registered members who can sign in to your site.
            Like magic.
          </p>
        </div>

        <div className='space-y-2'>
          <div className='flex flex-row gap-4'>
            <div className='flex-[1.5] overflow-hidden'>
              <Image 
                src={cubofTea} 
                alt='Gallery image 1'
                className='w-full h-full  border-1 border-[#333] object-cover rounded-md 
    transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
                width={400}
                height={300}
              />
            </div>
            <div className='flex-1 overflow-hidden'>
              <Image 
                src={fan} 
                alt='Gallery image 2'
                className='w-full h-full border-1 border-[#333] object-cover rounded-md 
    transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
                width={400}
                height={300}
              />
            </div>
            <div className='flex-1  overflow-hidden'>
              <Image 
                src={hadShowingBulb} 
                alt='Gallery image 3'
                className='w-full h-full border-1 border-[#333] object-cover rounded-md 
  shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)]  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
                width={400}
                height={300}
              />
            </div>
          </div>
          <p className='text-center text-gray-500 text-lg'>Gallery Card</p>
        </div>

        <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
          <p>
            Portal makes all of this possible, and it appears by default as a floating button in the
            bottom-right corner of your site. When people are logged out, clicking it will open a sign-up/sign-in window. 
            When members are logged in, clicking the Portal button will 
            open the account menu where they can edit their name, email, and subscription settings.
          </p>
          <p>
            The floating Portal button is completely optional. 
            If you prefer, you can add manual links to your content, navigation, or theme to trigger it instead.
          </p>
          <p>
            Like this! <span className='border-b-2 border-[#333] font-bold hover:border-none cursor-pointer transition-colors'>Sign up here</span>
          </p>
        </div>

        <HorizontalDivider />

        <div className='space-y-6 text-lg leading-relaxed text-gray-800'>
          <p>
            As you start to grow your registered audience, you'll be able to get a sense of who you're publishing 
            for and where those people are coming from.
            Best of all: You'll have a straightforward, reliable way to connect with people who enjoy your work.
          </p>
          <p>Social networks go in and out of fashion all the time. Email addresses are timeless.</p>
          <p>
            Growing your audience is valuable no matter what type of site you run, but if your content is your business,
            then you might also be interested in <span className='border-b-2  border-[#333]
             hover:border-none cursor-pointer transition-colors font-bold'>setting up premium subscriptions. </span>
          </p>
        </div>

        <div className='flex flex-wrap lg:items-center lg:justify-center lg:gap-3 gap-2 py-6'>
          <span className='text-gray-700 font-bold'>Tagged in:</span>
          <Button name={'Travel'} spanBg={'#c5c5fe'} />
             <Button name={'Business'} spanBg={'#83ea6c'} />

   
        </div>

        <HorizontalDivider />

        <div className='text-center space-y-6 py-8'>
          <h2 className='text-xl font-semibold text-gray-700'>Like what you read?</h2>
          <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>Subscribe to our Newsletter</h1>
  <div className="relative max-w-md mx-auto">
  <input
    type="email"
    placeholder="Enter your email address"
    className="w-full px-4 py-3 pr-32 rounded-full border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
  <button
    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4c60] text-white px-4 py-1.5 rounded-full text-sm font-medium 
              transition-shadow duration-200 ease-out 
              hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
  >
    Subscribe
  </button>
</div>
          <p className='text-gray-600 max-w-2xl  mx-auto'>
            Subscribe to our email newsletter and unlock access to <br className='hidden lg:flex' /> <span className='font-bold'> 
            members-only</span> content and <span className='font-bold'>exclusive updates.</span>
          </p>
        </div>
      </section>
    </main>
  )
}

export default FirstCard;