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
      {showPopUp && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 "
          onClick={() => setShowPopUp(false)}
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white my-8 p-4 rounded-lg max-w-md max-h-screen overflow-y-scroll z-50 flex flex-col gap-2"
            style={{ maxHeight: `calc(100vh - 100px)` }}
          >
            <Image
              src={menuList.image}
              alt={menuList.title}
              width={300}
              height={200}
              className="mx-auto circular-image-menu"
            />
            <h2 className="text-lg font-bold text-center mb-2">
              {menuList.title}
            </h2>
            <p className="text-center text-gray-600 text-md mb-2">
              {menuList.description}
            </p>
            {menuList.sizes?.length > 0 && (
              <div className="py-2">
                <h3 className="text-center mt-2">Pick your size</h3>
                {menuList.sizes.map((size, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-4 border rounded-md m-2"
                  >
                    <input
                      type="radio"
                      name="size"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize.name === size.name}
                    />
                    {size.name} ${(priceAsNumber + size.price).toFixed(2)}
                  </label>
                ))}
              </div>
            )}
            {menuList.extra?.length > 0 && (
              <div className="py-2">
                <h3 className="text-center mt-2">Extras</h3>
                {menuList.extra.map((extra, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 p-4 border rounded-md m-1"
                  >
                    <input
                      type="checkbox"
                      name={extra.name}
                      onClick={(ev) => handleSelectedExtra(ev, extra)}
                    />
                    {extra.name} +${extra.price}
                  </label>
                ))}
              </div>
            )}
            <div className="py-2">
              <label className="text-center m-2 block">Other</label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                placeholder="Special Instructions (e.g. add more sauce)"
                rows="3"
                cols="40"
                className="border border-gray-300 rounded-md w-full pl-2 pt-1" //focus:border-[color]-400 won't work
                value={specialRequest}
                onChange={handleSpecialInstructionsChange}
              ></textarea>
            </div>
            {/* style 2 
            <div className="py-2">
              <label
                className="absolute top-2 left-2 text-blue-500">
                Special Instructions
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows="3"
                cols="40"
                className="border border-gray-300 rounded-md w-full p-2 pl-2" //focus:border-[color]-400 won't work
                value={specialRequest}
                onChange={handleSpecialInstructionsChange}
              >
              </textarea>
            </div> */}

            <button
              type="button"
              className="sign_button sticky bottom-0 hover:bg-yellow-200"
              onClick={handleAddToCartClick}
            >
              Add to Cart ${selectedPrice.toFixed(2)}
            </button>
            <button
              type="button"
              className="px-2 p-1 border border-slate-300 mt-2 w-full rounded-md text-sm hover:bg-orange-300 text-black"
              onClick={() => setShowPopUp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuPopUp;
