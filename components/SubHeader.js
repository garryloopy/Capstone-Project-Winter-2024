import React from "react";
import { FaSpoon } from "react-icons/fa6";


const SubHeader = ({ header2 }) => {
  return (
    <div className="my-[1rem] flex flex-row items-center gap-6">
      {/* <img
        src="/images/spoon.png"
        alt="spoon"
        className="w-[60px] rotate-180"
      /> */}

      {/* use spoon react icon, we can change the color or size of the icon */}
      <FaSpoon
        size={45}
        style={{ transform: "rotate(225deg)", color: "rgb(132 204 22)" }}
      />
      <p className="md:text-4xl lnFont_2 text-yellow-500 tracking-wider	mb-[.5rem]">
        {header2}
      </p>
      {/* <img src="/images/spoon.png" alt="spoon" className="w-[60px]" /> */}

      <FaSpoon
        size={45}
        style={{ transform: "rotate(45deg)", color: "rgb(132 204 22)" }}
      />
    </div>
  );
};

export default SubHeader;
