import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Providers";
import { usePathname } from "next/navigation";

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
    <div className="w-full">
      <form onSubmit={handleCheckout}>
        <label className="w-full">
          <span className="text-xs text-gray-400">Email</span>
          <input
            type="text"
            className="form_input"
            name="email"
            placeholder="Email"
            value={clientInfo.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="w-full">
          <span className="text-xs text-gray-400">Address</span>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={clientInfo.address}
            onChange={handleChange}
            className="form_input"
            required
          />
        </label>
        <label className="w-full">
          <span className="text-xs text-gray-400">City</span>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={clientInfo.city}
            onChange={handleChange}
            className="form_input"
            required
          />
        </label>
        <div className="flex gap-4 w-full">
          <label className="w-full">
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
          </label>
          <label className="w-full">
            <span className="text-xs text-gray-400">Postal code</span>
            <input
              type="text"
              placeholder="Postal code"
              name="zip"
              value={clientInfo.zip}
              onChange={handleChange}
              className="form_input"
              required
            />
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
          <input
            type="text"
            placeholder="Phone"
            name="tel"
            value={clientInfo.tel}
            onChange={handleChange}
            className="form_input"
          />
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
