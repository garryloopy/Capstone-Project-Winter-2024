import React, { useContext, useState } from 'react'
import Image from "next/image"
import { CartContext } from './Providers';
import toast, { Toaster } from "react-hot-toast";
import MenuPopUp from './MenuPopUp';


const ClientMenu = (menuList) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(menuList.sizes?.[0] || null);
  const [specialRequest, setSpecialInstructions] = useState(""); //added this in for special instructions

  const [selectedExtra, setSelectedExtra] = useState([]);

  const handleAddToCartClick = () => {
    if (showPopUp) {
      addToCart(menuList, selectedSize, selectedExtra,specialRequest);
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
      <div className="container relative group text-slate-100 p-6 border-2 rounded-md border-slate-300 flex flex-col items-center justify-around gap-4 bg-black/60">
        <div>
          <Image
            className="circular-image-menu mx-auto"
            src={menuList.image}
            alt={menuList.title}
            width={200}
            height={200}
          />
        </div>
        <h4 className="lg:text-xl text-md text-orange-400">{menuList.title}</h4>
        <p className="text-center text-gray-300">{menuList.description}</p>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded"
            onClick={handleAddToCartClick}
          >
            Add to Order
          </button>
        </div>
      </div>
    </>
  );
}

export default ClientMenu