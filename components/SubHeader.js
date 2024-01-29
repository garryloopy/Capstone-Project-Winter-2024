
import React from 'react'



const SubHeader = ({header2}) => {
 
  return (
    <div className=" w-full text-center p-4 bg-gray-100/80 my-[2rem] shadow-xl rounded-lg lg:w-[50%]">
      <h2 className="text-orange-600 font-bold lg:text-2xl text-lg">
        {header2}
      </h2>
    </div>
  );
}

export default SubHeader