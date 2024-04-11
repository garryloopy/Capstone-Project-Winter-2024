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
        className="container relative group text-slate-100 rounded-md overflow-hidden shadow-xl bg-white
       backdrop-blur-sm transform hover:translate-y-[-15px] transition-transform duration-300 ring-1 ring-gray-300/60"
      >
        <div className="w-full h-full flex flex-col items-center justify-evenly gap-6 bg-slate-100/50 hover:bg-slate-200/50 p-8 xl:p-10 ">
          <div className="max-w-[250px] max-h-[200px]">
            <Image
              className="w-full h-full object-cover"
              src={menuList.image}
              alt={menuList.title}
              width={250}
              height={200}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 self-end">
            <h4 className="text-center lg:text-xl font-semibold text-md text-orange-400">
              {menuList.title}
            </h4>

            <p className="text-md font-sans font-semibold text-center text-slate-600 flex-1">
              {menuList.description}
            </p>
          </div>

          {menuList.discount > 0 && (
            <div className="w-[30%] p-2 absolute top-6 left-2 bg-lime-400 -skew-x-[10deg] -skew-y-[20deg] text-center text-black">
              {menuList.discount}%
            </div>
          )}

          {/* below is for hover transition/animation/opacity */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
        rounded-md backdrop-brightness-90 duration-300"
          >
            <button
              className="bg-lime-400 hover:bg-lime-200 hover:scale-105 hover:ring-lime-50 hover:ring-1 text-white hover:text-gray-700 text-md font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-100 ease-in-out"
              onClick={handleAddToCartClick}
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMenu;
