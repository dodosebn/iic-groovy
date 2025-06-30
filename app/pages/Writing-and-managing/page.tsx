import SideBar from "@/app/components/desktop/sideBar";
import Writing from "./writing";
const HomePage = () => {
  return (
      <div className="flex px-2 gap-10 md:flex-row flex-col mt-[1rem] relative">
                    <div className="flex-2">
                        <Writing />
            </div>
            <div className="md:block hidden">
              <SideBar name={"James Brawson"} />
            </div>
          </div>
  )
}

export default HomePage;