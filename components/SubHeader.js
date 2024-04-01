import React from "react";
import { FaSpoon } from "react-icons/fa6";


const SubHeader = ({ header2 }) => {
  return (
    <div className="my-[2rem] flex flex-row items-center gap-6">
      {/* <img
        src="/images/spoon.png"
        alt="spoon"
        className="w-[60px] rotate-180"
      /> */}

      {/* use spoon react icon, we can change the color or size of the icon */}
      <FaSpoon
        size={45}
        style={{ transform: "rotate(225deg)", color: "#58A399" }}
      />
      <p className="md:text-4xl text-2xl font-extrabold text-violet-500/95 tracking-wider	mb-[.5rem]">
        {header2}
      </p>
      {/* <img src="/images/spoon.png" alt="spoon" className="w-[60px]" /> */}

      <FaSpoon
        size={45}
        style={{ transform: "rotate(45deg)", color: "#58A399" }}
      />
    </div>
  );
};

export default SubHeader;
