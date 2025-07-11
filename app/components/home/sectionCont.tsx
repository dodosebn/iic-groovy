import React from "react";
import { motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
import LastGeneration from "@/app/sections/lastGeneration";
import Sosioloji from "@/app/sections/sosioloji";
import Purpose from "@/app/sections/purpose";
import Movement from "@/app/sections/movement";
import Filosofi from "@/app/sections/filosofi";
import IIC from "@/app/sections/iic";
import Connect from "@/app/sections/connect";





const sectionMap: Record<string, React.ReactNode> = {
  "last-generation": <LastGeneration />,
  "sosioloji": <Sosioloji />,
  "purpose": <Purpose/>,
  // "editor": <Author />,
  // "contributors": <Contributors />,
  "movement": <Movement />,
  "filosofi": <Filosofi />,
  "ideaiscapital": <IIC />,
  "connect": <Connect />,
};

interface NavSectionContentProps {
  section: string;
  onClose: () => void;
}

const SectionContent: React.FC<NavSectionContentProps> = ({ section, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#54cbca] overflow-y-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Close icon */}
      <div
        className="absolute top-5 right-5 text-4xl cursor-pointer z-50"
        onClick={onClose}
      >
        <GrClose color="#000000" />
      </div>

      {/* Section content */}
      <div className="max-w-7xl mx-auto  flex items-center justify-center">
        {sectionMap[section] || (
          <div className="text-center py-20 text-gray-500">page build in progress.</div>
        )}
      </div>
    </motion.div>
  );
};

export default SectionContent;