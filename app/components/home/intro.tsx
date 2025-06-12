import React from 'react';
import Image from 'next/image';
import introImg from '@/public/images/introImg.avif';

const demoMap = [
  {
    id: 1, 
    img: introImg,
    title: "Classic Style"
  },
  {
    id: 2, 
    img: introImg,
    title: "Grid (Masonry) Style"
  },
  {
    id: 3, 
    img: introImg,
    title: "Fast Demo"
  }
];

const Intro = () => {
  return (
    <div className="text-center max-w-4xl mx-auto p-5">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-12">groovy</h1>
        <h3 className="text-3xl font-semibold mb-12">Select your Home Page</h3>
        <div className="text-xl leading-snug">
          <p>Groovy is a super modern blog, highly focused in Speed and Colors.</p>
          <p className="mt-3">
            Every Layout includes 2 schemes
            <span className="font-bold"> "Solid Border"</span> and
            <span className="font-bold"> "Soft Shadow".</span>
          </p>
        </div>
      </section>
      
      <section>
        <h4 className="text-xl font-bold mb-10">Check our Demos:</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoMap.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <h4 className="text-xl font-semibold mb-6">{item.title}</h4>
              <div className="w-full overflow-hidden h-[17rem] rounded-lg mb-6 group border-3 border-[#000]">
                <Image 
                  src={item.img} 
                  alt={item.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500 ease-in-out
                    group-hover:-translate-y-6
                  "
                  priority={item.id === 1}
                />
              </div>
              <button className="
                px-6 py-2
                bg-[#ff4c60] text-[#fffacd]
                border border-[#000]
                rounded-3xl
                font-medium
                transition-all duration-300 ease-in-out
                hover:-translate-y-1
                hover:shadow-[4px_4px_0px_rgba(0,0,0,0.6)]
              ">
                View demo
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Intro;
