import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react';

const Comments = () => {
  return (
    <AboutMeContainer name={'Comments'}>
      <div className="space-y-6">
        <div className="flex justify-end">
          <h3 className=" text-gray-900 opacity-50">0 Comments</h3>
        </div>
                  <div className="flex-1 border-t border-[#5a5a58] opacity-20"></div>


        <div className=" py-6 rounded-lg text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#333]">Start the conversation</h1>
          <p className="text-gray-600 text-md opacity-90">Become a member of <span className='font-bold'>Groovy</span> to start commenting.</p>
          
          <button className="px-6 py-3 bg-[#ff4c60] text-white font-medium  rounded-sm
                            hover:bg-[#e04557] transition-colors duration-200
                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign up now
          </button>
          
          <p >
            <span className="text-gray-900 opacity-50">
            Already a member?</span>{' '}
            <span className="text-[#ff4c60] font-medium hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>

        <div className="border-t border-[#5a5a58] opacity-20"></div>
      </div>
    </AboutMeContainer>
  );
};

export default Comments;