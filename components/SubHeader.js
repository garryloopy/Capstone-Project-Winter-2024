import React from "react";

const SubHeader = ({ header2 }) => {
  return (
    <div className="my-[2rem] flex flex-row items-center gap-3">
      <img
        src="/images/spoon.png"
        alt="spoon"
        className="w-[45px] rotate-180"
      />
      <p className="md:text-4xl text-2xl font-extrabold text-violet-500/95 tracking-wider	mb-[.5rem]">
        {header2}
      </p>
      <img src="/images/spoon.png" alt="spoon" className="w-[45px]" />
    </div>
  );
};

export default SubHeader;
