import SideBar from "@/app/components/desktop/sideBar";
import HowToGrow from './howToGrow';


const HomePage = () => {
  return (
      <div className="flex px-2 flex-col mt-[1rem] relative">
                    {/* <div className="flex-2"> */}
    <HowToGrow />
            {/* </div>
            <div className="md:block hidden">
              <SideBar name={"James Brawson"} />
            </div> */}
          </div>
  )
}

export default HomePage;