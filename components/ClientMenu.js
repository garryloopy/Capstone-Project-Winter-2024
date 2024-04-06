import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "./Providers";
import toast, { Toaster } from "react-hot-toast";
import MenuPopUp from "./MenuPopUp";

const ClientMenu = (menuList) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(menuList.sizes?.[0] || null);
  const [specialRequest, setSpecialInstructions] = useState(""); //added this in for special instructions

  const [selectedExtra, setSelectedExtra] = useState([]);

  const handleAddToCartClick = () => {
    if (showPopUp) {
      addToCart(menuList, selectedSize, selectedExtra, specialRequest);
      toast.success("Added to cart");
      setShowPopUp(false);
      return;
    }
    if (menuList.sizes?.length === 0 && menuList.extra?.length === 0) {
      addToCart(menuList);
      toast.success("Added to cart");
    } else {
      setShowPopUp(true);
    }
  };
  return (
    <>
      <MenuPopUp
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        menuList={menuList}
        handleAddToCartClick={handleAddToCartClick}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedExtra={selectedExtra}
        setSelectedExtra={setSelectedExtra}
        specialRequest={specialRequest}
        setSpecialInstructions={setSpecialInstructions}
      />

      {/* used transform/hover:translate to give animation effect for each boxes */}
      <div
        className="container relative group p-6 border rounded-md flex flex-col items-center
       justify-around gap-4 bg-gray-800/80 transform hover:translate-y-[-10px] transition-transform duration-300 backdrop-blur-sm"
      >
        <div>
          <Image
            className="object-cover"
            src={menuList.image}
            alt={menuList.title}
            width={250}
            height={250}
          />
          {menuList.discount > 0 && (
            <div className="w-[30%] p-2 absolute top-6 left-2 bg-yellow-400 -skew-x-[10deg] -skew-y-[20deg] text-center text-black">
              {menuList.discount}%
            </div>
          )}
        </div>
        
        {/* Title and Description in the Menu */}
        <h4 className="lg:text-xl text-md text-teal-200">{menuList.title}</h4>
        <p className="text-sm font-sans text-left text-gray-100">
          {menuList.description}
        </p>

        {/* below is for hover transition/animation/opacity */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
        rounded-md bg-black bg-opacity-50 duration-300"
        >
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:scale-110 transition-transform duration-100 ease-in-out"
            onClick={handleAddToCartClick}
          >
            Add to Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientMenu;
