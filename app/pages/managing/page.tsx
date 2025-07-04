import SideBar from "@/app/components/desktop/sideBar";
import Manager from './manage';

const HomePage = () => {
  return (
      <div className="flex px-2 flex-col mt-[1rem] relative">
    <Manager />
            {/* </div>
            <div className="md:block hidden">
              <SideBar name={"Joseph Fransics"} />
            </div> */}
          </div>
  )
}

export default HomePage;