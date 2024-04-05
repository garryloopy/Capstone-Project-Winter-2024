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
        className="container relative group text-slate-100 rounded-md overflow-hidden shadow-xl
       bg-white transform hover:translate-y-[-10px] transition-transform duration-300 ring-1 ring-gray-300/60"
      >
        <div className="w-full h-full flex flex-col items-center justify-around gap-4 bg-yellow-50/10 xl:p-12 p-8">
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
          <h4 className="lg:text-xl font-semibold text-md text-orange-300">
            {menuList.title}
          </h4>
          <p className="text-sm font-sans font-semibold text-center text-gray-400">
            {menuList.description}
          </p>

          {/* below is for hover transition/animation/opacity */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
        rounded-md backdrop-brightness-90 duration-300"
          >
            <button
              className="bg-yellow-400 text-slate-900 text-md font-semibold px-6 py-2 rounded-xl hover:scale-110 hover:bg-yellow-300 active:bg-yellow-400 shadow-md transition-all duration-100 ease-in-out"
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
