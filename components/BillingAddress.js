import React from 'react'

const BillingAddress = ({clientInfo}) => {
  return (
    <div className=" flex flex-col gap-3 my-[1rem] text-gray-500 text-lg">
      <p>{clientInfo?.email}</p>
      <p>{clientInfo?.address}</p>
       <p>Canada, Alberta, Calgary</p>
       <p>{clientInfo?.zip}</p>
    </div>
  );
}

export default BillingAddress