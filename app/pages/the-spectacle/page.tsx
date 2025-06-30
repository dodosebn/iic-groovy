import SideBar from "@/app/components/desktop/sideBar";
import Spectacle from "./spectacle";
const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
                        <Spectacle />
            </div>
            <div className="md:block hidden">
              <SideBar name={"Mary Buzard"} />
            </div>
          </div>
  )
}

export default HomePage;