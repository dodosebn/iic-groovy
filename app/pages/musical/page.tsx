import SideBar from "@/app/components/desktop/sideBar";
import Musical from './musical';
const HomePage = () => {
  return (
      <div className="flex px-2 flex-col mt-[1rem] relative">
    <Musical />
            {/* </div>
            <div className="md:block hidden">
              <SideBar name={"Jonathan Doe"} />
            </div> */}
          </div>
  )
}

export default HomePage;