import SideBar from "@/app/components/desktop/sideBar";
import Selling from './selling';
const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
    <Selling />
            </div>
            <div className="md:block hidden">
              <SideBar name={"Jonathan Doe"} />
            </div>
          </div>
  )
}

export default HomePage;