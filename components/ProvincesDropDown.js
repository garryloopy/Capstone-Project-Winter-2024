import React from "react";

import provincesData from "../app/dataConstant/provincesData";
const provinces = provincesData.provinces;
const ProvincesDropDown = ({ onChange, clientInfo }) => {
  const handleProvinceChange = (e) => {
    onChange(e);
  };
  return (
    <select
      name="province"
      onChange={handleProvinceChange}
      autoComplete="address-level1"
    >
      <option value={clientInfo?.province}>Select province</option>
      {provinces &&
        provinces.map((province, index) => (
          <option key={index} value={province}>
            {province}
          </option>
        ))}
    </select>
  );
};

export default ProvincesDropDown;
