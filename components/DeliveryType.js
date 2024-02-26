import React from "react";

const DeliveryType = ({ onChange }) => {
  const handleDeliveryTypeChange = (e) => {
    onChange(e); 
  };

  return (
    <div className="w-full text-black flex flex-col gap-4 my-[2rem] px-1">
      <h2>Delivery type</h2>
      <label className="w-full flex items-center gap-4 border p-1.5 rounded-lg bg-gray-100 text-gray-700">
        <input
          type="radio"
          value="pickup"
          name="deliveryType"
          onChange={handleDeliveryTypeChange}
          className="w-[1rem] h-[1rem] "
        />
        Pickup
      </label>
      <label className="w-full flex items-center gap-4 border p-1.5 rounded-lg bg-gray-100 text-gray-700">
        <input
          type="radio"
          value="delivery"
          name="deliveryType"
          onChange={handleDeliveryTypeChange}
          className="w-[1rem] h-[1rem]"
        />
        Delivery
      </label>
    </div>
  );
};

export default DeliveryType;
