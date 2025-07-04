import SideBar from "@/app/components/desktop/sideBar";
import Building from "./building";



const HomePage = () => {
  return (
      <div className="flex px-2 flex-col mt-[1rem] relative">
                    {/* <div className="flex-2"> */}
    <Building />
            {/* </div> */}
            {/* <div className="lg:block hidden">
              <SideBar name="Jonathan Doe"/>
            </div> */}
          </div>
  )
}

export default HomePage;