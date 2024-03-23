
import React from 'react'



const SubHeader = ({header2}) => {
 
  return (
    <div className="my-[2rem]">
      <p className="md:text-4xl text-2xl font-extrabold text-orange-500 tracking-wider	mb-[.5rem]">
        {header2}
      </p>
      <img src="/images/spoon.png" alt="spoon" className="w-[45px]" />
    </div>
  );
}

export default SubHeader