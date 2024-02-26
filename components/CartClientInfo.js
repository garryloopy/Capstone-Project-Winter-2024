"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Providers";
import ProvincesDropDown from "./ProvincesDropDown";
import DeliveryType from "./DeliveryType";

// import { AddressAutofill } from "@mapbox/search-js-react";
import dynamic from "next/dynamic";
import ValidateInput from "./ValidateInput";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

const CartClientInfo = ({ deliveryAmount, totalPrice }) => {
  const [clientInfo, setClientInfo] = useState({
    email: "",
    address: "",
    city: "",
    province: "",
    zip: "",
    tel: "",
  });
  const { cartProducts } = useContext(CartContext);

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

    if (name === "city") {
      isValid = cityRegExp.test(value);
      setIsCityValid(isValid);
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

  const handleCheckout = async (ev) => {
    ev.preventDefault();
    console.log(clientInfo);
  };

  const handlePickup = () => {
    console.log("Pick up clicked");
  };

  const handleDelivery = () => {
    console.log("Delivery clicked");
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
        <AddressAutofill accessToken={process.env.MAP_ACCESS_TOKEN}>
          <div className="flex gap-4">
            <label className="w-full">
              <span className="text-xs text-gray-400">Address</span>
              <input
                type="text"
                placeholder="Address"
                autoComplete="address-line1"
                name="address"
                value={clientInfo?.address}
                onChange={handleChange}
                className="form_input"
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

        <div className="flex gap-4 w-full">
          <label className="w-full">
            <span className="text-xs text-gray-400">City</span>
            <div className="flex relative">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={clientInfo?.city}
                onChange={handleChange}
                className="form_input"
                autoComplete="address-level2"
              />
              <ValidateInput
                clientInfo={clientInfo?.city}
                isValid={isCityValid}
              />
            </div>
          </label>
          {/* <label className="w-full">
            <span className="text-xs text-gray-400">Province</span>
            <input
              type="text"
              placeholder="Province"
              name="province"
              value={clientInfo.province}
              onChange={handleChange}
              className="form_input"
              required
            />
          </label> */}
          <label className="w-full">
            <span className="text-xs text-gray-400">Province</span>
            <ProvincesDropDown
              onChange={handleChange}
              clientInfo={clientInfo}
            />
          </label>
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
              placeholder="Phone"
              name="tel"
              value={clientInfo.tel}
              onChange={handleChange}
              className="form_input"
            />
            <ValidateInput clientInfo={clientInfo.tel} isValid={isTelValid} />
          </div>
        </label>

        <button onClick={handlePickup} className="sign_button">
          Pick up
        </button>
        <button onClick={handleDelivery} className="sign_button">
          Delivery
        </button>
        <button className="sign_button" type="submit">
          Pay ${totalPrice + deliveryAmount}
        </button>
      </form>
    </div>
  );
};

export default CartClientInfo;
