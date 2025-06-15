import SideBar from "../components/desktop/sideBar";
import Building from "./building";



const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
    <Building />
            </div>
            <div className="md:block hidden">
              <SideBar />
            </div>
          </div>
  )
}

export default HomePage;