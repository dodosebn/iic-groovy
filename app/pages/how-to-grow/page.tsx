import SideBar from "@/app/components/desktop/sideBar";
import HowToGrow from './howToGrow';


const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
    <HowToGrow />
            </div>
            <div className="md:block hidden">
              <SideBar />
            </div>
          </div>
  )
}

export default HomePage;