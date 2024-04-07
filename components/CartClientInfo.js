"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext, ClientLocationContext } from "./Providers";
// import ProvincesDropDown from "./ProvincesDropDown";
import DeliveryType from "./DeliveryType";

// import { AddressAutofill } from "@mapbox/search-js-react";
import dynamic from "next/dynamic";
import ValidateInput from "./ValidateInput";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

const CartClientInfo = ({
  clientInfo,
  setClientInfo,
  setInputValid,
  setMessage,
}) => {
  const { cartProducts } = useContext(CartContext);
  const { clientLocation, setClientLocation } = useContext(
    ClientLocationContext
  );
  const selectedAddressRef = useRef(null);

  //  const emailRegExp = /^\S+@\S+\.\S+$/;
  const emailRegExp = new RegExp("^\\S+@\\S+\\.\\S+$");
  const zipRegExp = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  const apartmentRegExp = /^[a-zA-Z0-9\s-]{1,10}$/;
  // const cityRegExp = /^[a-zA-Z\s-]{2,}$/;
const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;
  const [isEmailValid, setIsEmailValid] = useState();
  const [isZipValid, setIsZipValid] = useState();
  // const [isCityValid, setIsCityValid] = useState();
  const [isApptValid, setIsApptValid] = useState(true);
  const [isTelValid, setIsTelValid] = useState();

  let isValid;

  useEffect(() => {
    if (!clientInfo.address) {
      setClientInfo((prev) => ({
        ...prev,
        zip: "",
        apartment: "",
      }));
    }
  }, [clientInfo?.address, setClientInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");

    if (name === "email") {
      isValid = emailRegExp.test(value);
      setIsEmailValid(isValid);
    }

    if (name === "zip") {
      isValid = zipRegExp.test(value);
      setIsZipValid(isValid);
    }

    if (name === "apartment") {
      isValid = apartmentRegExp.test(value);
      setIsApptValid(isValid);
    }

    if (name === "tel") {
      isValid = phoneRegExp.test(value);
      setIsTelValid(isValid);
    }

    setClientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (isEmailValid && isZipValid && isApptValid && isTelValid) {
    setInputValid(true);
  } else {
    setInputValid(false);
  }


  //retrieve the location (longitude and latitude) of the client
  const getCoordinate = async (address) => {
    if (address) {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${process.env.MAP_ACCESS_TOKEN}`
      );
      const result = await res.json();
      setClientLocation({
        longitude: result?.features[0]?.geometry?.coordinates[0],
        latitude: result?.features[0]?.geometry?.coordinates[1],
      });
    }
  };

  const handleSelect = () => {
    if (selectedAddressRef.current) {
      getCoordinate(selectedAddressRef.current.value);
    }
  };

  return (
    <div className="w-full text-white">
      <form>
        <label className="w-full">
          <span className="text-xs text-gray-400">Email</span>
          <div className="flex relative">
            <input
              type="email"
              className="form_input"
              name="email"
              placeholder="Email"
              value={clientInfo?.email}
              onChange={handleChange}
              required
            />
            <ValidateInput
              clientInfo={clientInfo?.email}
              isValid={isEmailValid}
            />
          </div>
        </label>
        <AddressAutofill
          accessToken={process.env.MAP_ACCESS_TOKEN}
          onSelect={() => handleSelect(e)}
        >
          <div className="flex gap-4">
            <label className="w-full">
              <span className="text-xs text-gray-400">Address</span>
              <input
                ref={selectedAddressRef}
                type="text"
                placeholder="Address"
                autoComplete="address-line1"
                name="address"
                value={clientInfo?.address}
                onChange={handleChange}
                className="form_input"
                onBlur={handleSelect}
              />
            </label>
            <label>
              <span className="text-xs text-gray-400">Appt no.</span>
              <div className="flex relative">
                <input
                  name="apartment"
                  placeholder="apartment number"
                  type="text"
                  autoComplete="address-line2"
                  value={clientInfo?.apartment}
                  onChange={handleChange}
                  className="form_input"
                />
                <ValidateInput
                  clientInfo={clientInfo?.apartment}
                  isValid={isApptValid}
                />
              </div>
            </label>
          </div>
        </AddressAutofill>

        <div className="flex lg:flex-row flex-col gap-4 w-full">
          <label className="w-full">
            <span className="text-xs text-gray-400">City</span>
            <input
              type="text"
              placeholder="City"
              name="city"
              value="Calgary"
              className="form_input text-gray-500"
              disabled
            />
          </label>
          <label className="w-full">
            <span className="text-xs text-gray-400">Province</span>
            <input
              type="text"
              placeholder="Province"
              name="province"
              value="Alberta"
              className="form_input text-gray-500"
              disabled
            />
          </label>
          {/* <label className="w-full">
            <span className="text-xs text-gray-400">Province</span>
            <ProvincesDropDown
              onChange={handleChange}
              clientInfo={clientInfo}
            />
          </label> */}
          <label className="w-full">
            <span className="text-xs text-gray-400">Postal code</span>
            <div className="flex relative">
              <input
                type="text"
                placeholder="Postal code"
                name="zip"
                value={clientInfo?.zip}
                onChange={handleChange}
                className="form_input"
                autoComplete="postal-code"
              />
              <ValidateInput
                clientInfo={clientInfo?.zip}
                isValid={isZipValid}
              />
            </div>
          </label>
        </div>
        <label className="w-full">
          <span className="text-xs text-gray-400">Country</span>
          <input
            type="text"
            placeholder="Country"
            name="country"
            value="Canada"
            className="form_input text-gray-500"
            disabled
          />
        </label>
        <label className="w-full">
          <span className="text-xs text-gray-400">Phone</span>
          <div className="flex relative">
            <input
              type="text"
              placeholder="111-222-3333"
              name="tel"
              value={clientInfo.tel}
              onChange={handleChange}
              className="form_input"
            />
            <ValidateInput clientInfo={clientInfo.tel} isValid={isTelValid} />
          </div>
        </label>

        <DeliveryType onChange={handleChange} />
        {/* <button onClick={handlePickup} className="sign_button">
          Pick up
        </button>
        <button onClick={handleDelivery} className="sign_button">
          Delivery
        </button> */}
      </form>
    </div>
  );
};

export default CartClientInfo;
