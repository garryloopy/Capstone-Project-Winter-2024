"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const MenuPopUp = ({
  showPopUp,
  setShowPopUp,
  menuList,
  handleAddToCartClick,
  selectedSize,
  setSelectedSize,
  selectedExtra,
  setSelectedExtra,
  specialRequest,
  setSpecialInstructions,
}) => {
  const basePrice = menuList.price.replace(/[$,]/g, "");
  const priceAsNumber = parseFloat(basePrice);

  const [selectedPrice, setSelectedPrice] = useState(0);
  let price = menuList.price.replace(/[$,]/g, "");
  price = parseFloat(price);

  useEffect(() => {
    if (selectedSize) {
      price += selectedSize.price;
    }
    for (const extra of selectedExtra) {
      price += extra.price;
    }

    setSelectedPrice(price);
  }, [menuList, selectedSize, selectedExtra]);

  //useEffect to reset selectedPrice
  useEffect(() => {
    setSelectedPrice(price);
    setSelectedSize(menuList.sizes[0]);
  }, [showPopUp]);

  useEffect(() => {
    if (selectedSize) {
      price += selectedSize.price;
    }
    for (const extra of selectedExtra) {
      price += extra.price;
    }
    if (menuList.discount > 0) {
      price = price - (price * menuList.discount) / 100;
    }

    setSelectedPrice(price);
  }, [menuList, selectedSize, selectedExtra]);

  const handleSelectedExtra = (ev, extra) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtra((prev) => [...prev, extra]);
    } else {
      setSelectedExtra((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  };

  // handle special instructions
  const handleSpecialInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  // let selectedPrice;
  // selectedPrice = priceAsNumber ;
  //  if (selectedSize) {
  //      selectedPrice += selectedSize.price;
  //    }
  //    for (const extra of selectedExtra) {
  //      selectedPrice += extra.price;
  //    }

  return (
    <>
      {/* this is the popup! it will show when you click on the menu item */}
      <div
        data-show={showPopUp}
        className="fixed top-0 left-0 w-full h-full z-50 opacity-0 backdrop-brightness-50
          pointer-events-none data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto
          transition-opacity duration-300 flex items-center justify-center"
        onClick={() => setShowPopUp(false)}
      >
        <div
          className="bg-white sm:size-[40rem] h-full w-full rounded-lg overflow-y-scroll m-4 sm:m-2"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="bg-yellow-50/30 sm:p-16 p-4 flex flex-col">
            {/* Image, title, desc section  */}
            <div className="w-full flex flex-col items-center justify-center py-6">
              <Image
                src={menuList.image}
                alt={menuList.title}
                width={200}
                height={200}
              />
              <h2 className="text-xl font-bold text-center mt-2 mb-1 text-orange-300">
                {menuList.title}
              </h2>
              <p className="text-center text-gray-500 text-sm">
                {menuList.description}
              </p>
            </div>

            {/* Sizes section  */}
            {menuList.sizes?.length > 0 && (
              <div className="py-6 w-full flex flex-col">
                <h3 className="text-center mt-4 mb-1 text-lg font-semibold text-gray-600">
                  Pick your size
                </h3>
                <div className="flex flex-col gap-2">
                  {menuList.sizes.map((size, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 h-12 w-full px-4 border rounded-md bg-white shadow-sm"
                    >
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize.name === size.name}
                        className="flex flex-row items-center"
                      />
                      <p className="text-sm font-semibold text-gray-600/90 capitalize">
                        {size.name} ${priceAsNumber + size.price}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Extras section  */}
            {menuList.extra?.length > 0 && (
              <div className="py-6 w-full flex flex-col">
                <h3 className="text-center mt-4 text-lg font-semibold text-gray-600">
                  Extras
                </h3>
                <div className="flex flex-col gap-2">
                  {menuList.extra.map((extra, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 h-12 w-full px-4 border rounded-md bg-white"
                    >
                      <input
                        type="checkbox"
                        name={extra.name}
                        onClick={(ev) => handleSelectedExtra(ev, extra)}
                        className="flex flex-row items-center"
                      />
                      <p className="text-sm font-semibold text-gray-600/90 capitalize">
                        {extra.name} +${extra.price}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Other section  */}
            <div className="py-2 w-full mb-6">
              <label className="text-center mt-4 text-lg font-semibold text-gray-600 block mb-1">
                Other
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                placeholder="Special Instructions (e.g. add more sauce)"
                rows="3"
                cols="40"
                className="ring-1 ring-gray-300 outline-none focus:ring-orange-300 rounded-md w-full p-4" //focus:border-[color]-400 won't work
                value={specialRequest}
                onChange={handleSpecialInstructionsChange}
              ></textarea>
            </div>

            {/* Submit and Cancel */}
            <button
              type="button"
              className="sign_button"
              onClick={handleAddToCartClick}
            >
              Add to Cart ${selectedPrice.toFixed(2)}
            </button>
            <button
              type="button"
              className="px-2 p-1 border border-yellow-400 mt-4 w-full rounded-md text-sm hover:bg-yellow-400 text-black"
              onClick={() => setShowPopUp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPopUp;
