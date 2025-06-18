import SideBar from "@/app/components/desktop/sideBar";
import What from "./what";
// import Sidebar from '@/app/components/desktop/sideBar';
const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
                        <What />
            </div>
            <div className="md:block hidden">
              <SideBar />
            </div>
          </div>
  )
}

export default HomePage;