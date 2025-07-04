import SideBar from "@/app/components/desktop/sideBar";
import Far from './far'


const HomePage = () => {
  return (
      <div className="flex px-2 flex-col mt-[1rem] relative">
                    {/* <div className="flex-2"> */}
    <Far />
            {/* </div>
            <div className="md:block hidden">
              <SideBar name={"Jonathan Doe"} />
            </div> */}
          </div>
  )
}

export default HomePage;