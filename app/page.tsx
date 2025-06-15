import TransitionLink from "@/utils/transitionLink";
import HomePage from "./components/home/homePage";
import MeetAuthor from "./components/home/customs/meetAuthor";




export default function Home() {
  return (
    <div className="flex justify-center flex-col px-[1rem]">
     <HomePage/>
     <div className="flex gap-3 w-full mt-6 justify-center">
      <div>
      <p>Page 1 of 2</p>
      </div>
      <div>
        <TransitionLink href="/page2" > 
          <button 
      className='bg-[#ff4c60] border border-[#333] text-[rgb(0,0,0)] px-[1rem] py-[0.2rem] 
      rounded-2xl flex items-center gap-2 
  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
    >
Next
      </button>
      </TransitionLink>
      </div>
     </div>
                           <MeetAuthor />

    </div>
  );
}
