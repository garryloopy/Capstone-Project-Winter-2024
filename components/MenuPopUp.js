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
}) => {
  const basePrice = menuList.price.replace(/[$,]/g, "");
  const priceAsNumber = parseFloat(basePrice);

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    let price = menuList.price.replace(/[$,]/g, "");
    price = parseFloat(price);

    if (menuList.discount > 0) {
      price = price - (price * menuList.discount) / 100;
    }
    setSelectedPrice(price);
    setSelectedSize(menuList.sizes[0]);
    setSelectedExtra([]);
  }, [
    showPopUp,
    menuList.discount,
    menuList.price,
    setSelectedPrice,
    menuList.sizes,
    setSelectedExtra,
    setSelectedSize,
  ]);

  useEffect(() => {
    let price = menuList.price.replace(/[$,]/g, "");
    price = parseFloat(price);

    if (selectedSize) {
      price += selectedSize.price;
    }

    if (menuList.discount > 0) {
      price = price - (price * menuList.discount) / 100;
    }

    for (const extra of selectedExtra) {
      price += extra.price;
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


  console.log("Special Instructions:", specialInstructions);
  
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
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 opacity-0 pointer-events-none data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto transition-opacity duration-300 ease-in-out"
        onClick={() => setShowPopUp(false)}
      >
        <div
          onClick={(ev) => ev.stopPropagation()}
          className="relative z-50 flex flex-col max-w-md max-h-screen gap-2 p-4 my-8 overflow-y-scroll bg-white rounded-lg"
          style={{ maxHeight: `calc(100vh - 100px)` }}
        >
          {menuList.discount > 0 && (
            <div className="w-[30%] p-2 absolute top-6 left-2 bg-lime-400 -skew-x-[10deg] -skew-y-[20deg] text-center text-black">
              {menuList.discount}%
            </div>
          )}
          <Image
            src={menuList.image}
            alt={menuList.title}
            width={300}
            height={200}
            className="mx-auto circular-image-menu"
          />
          <h2 className="mb-2 text-lg font-bold text-center">
            {menuList.title}
          </h2>
          <p className="mb-2 text-center text-gray-600 text-md">
            {menuList.description}
          </p>
          {menuList.sizes?.length > 0 && (
            <div className="py-2">
              <h3 className="mt-2 text-center">Pick your size</h3>
              {menuList.sizes.map((size, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-4 m-2 border rounded-md"
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
              <h3 className="mt-2 text-center">Extras</h3>
              {menuList.extra.map((extra, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 p-4 m-1 border rounded-md"
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
            <label className="block m-2 text-center">Other</label>
            <input
              type="text"
              id="specialInstructions"
              name="specialInstructions"
              placeholder="e.g. more sauce"
              className="w-full h-12 pt-1 pl-2 border border-gray-300 rounded-md"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}

            />
          </div>
          <button
            type="button"
            className="sticky bottom-0 sign_button hover:bg-lime-200"
            onClick={handleAddToCartClick}
          >
            Add to Cart ${selectedPrice.toFixed(2)}
          </button>
          <button
            type="button"
            className="w-full p-1 px-2 mt-2 text-sm text-black border rounded-md border-slate-300 hover:bg-orange-300"
            onClick={() => setShowPopUp(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuPopUp;
