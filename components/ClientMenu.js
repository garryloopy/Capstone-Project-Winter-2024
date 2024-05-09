import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "./Providers";
import toast, { Toaster } from "react-hot-toast";
import MenuPopUp from "./MenuPopUp";

const ClientMenu = (menuList) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(menuList.sizes?.[0] || null);

  const [selectedExtra, setSelectedExtra] = useState([]);
  const [specialRequest, setSpecialRequest] = useState("")

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
        setSpecialRequest={setSpecialRequest}
      />

      {/* used transform/hover:translate to give animation effect for each boxes */}
      <div
        className="container relative group text-slate-100 rounded-md overflow-hidden shadow-xl bg-white
       backdrop-blur-sm transform hover:translate-y-[-15px] transition-transform duration-300 ring-1 ring-gray-300/60"
      >
        <div className="flex flex-col items-center w-full h-full gap-6 p-8 justify-evenly bg-slate-100/50 hover:bg-slate-200/50 xl:p-10 ">
          <div className="max-w-[250px] max-h-[200px]">
            <Image
              className="object-cover w-full h-full"
              src={menuList.image}
              alt={menuList.title}
              width={250}
              height={200}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h4 className="font-semibold text-center text-orange-400 lg:text-xl text-md">
              {menuList.title}
            </h4>

            <p className="flex-1 font-sans font-semibold text-center text-md text-slate-600">
              {menuList.description}
            </p>
          </div>

          {menuList.discount > 0 && (
            <div className="w-[30%] p-2 absolute top-6 left-2 bg-lime-400 border-2 border-orange-300 -skew-x-[10deg] -skew-y-[20deg] text-center text-black">
              {menuList.discount}%
            </div>
          )}

          {/* below is for hover transition/animation/opacity */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-md opacity-0 group-hover:opacity-100 backdrop-brightness-90"
          >
            <button
              className="px-6 py-2 font-semibold text-white transition-all duration-100 ease-in-out bg-yellow-400 shadow-md hover:bg-yellow-300 ring-1 ring-gray-200 hover:scale-105 hover:ring-gray-500 hover:ring-1 hover:text-gray-700 text-md rounded-xl"
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
