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
        className="container relative group text-slate-100 p-6 border rounded-md border-slate-500 shadow-lg 
      flex flex-col items-center justify-around gap-4 bg-black/60 transform hover:translate-y-[-10px] transition-transform duration-300"
      >
        <div>
          <Image
            className="object-cover"
            src={menuList.image}
            alt={menuList.title}
            width={250}
            height={250}
          />
        </div>
        <h4 className="lg:text-xl text-md text-orange-300">{menuList.title}</h4>
        <p className="text-sm font-sans text-center text-gray-300">
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
