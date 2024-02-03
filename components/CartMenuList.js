import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Providers";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartMenuList = ({onDelete, totalPrice, deliveryAmount}) => {

  const {calculateTotalPrice,cartProducts} = useContext(CartContext);
  
  

  return (
    <div>
      {cartProducts?.length > 0 &&
        cartProducts.map((product, index) => (
          <div
            key={index}
            className="flex justify-evenly gap-4 mb-2 border-b p-4 border-orange-400 items-center"
          >
            <div>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={100}
                className="circular-image"
              />
            </div>
            <div>
              <h3 className="text-orange-500 font-semibold">{product.title}</h3>
              {product.sizes && (
                <div className="text-sm ">
                  <span>{product.sizes.name}</span>
                </div>
              )}
              {product.extra?.length > 0 && (
                <div className="text-sm text-gray-500">
                  {product.extra.map((extra, index) => (
                    <div key={index}>
                      {extra.name} ${extra.price}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm mr-4">${calculateTotalPrice(product)}</div>
            {onDelete && (
              <div>
                <button type="button" onClick={() => onDelete(index)}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="sm"
                    style={{ color: "#ee2b2b" }}
                    className="p-2 border border-orange-300 rounded-md hover:bg-orange-300"
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      <div className="md:px-[4rem]  py-4 flex justify-end items-center">
        <div className="flex flex-col justify-center gap-1">
          <span className="text-gray-600">SubTotal:</span>
          <span className="text-gray-600">Delivery:</span>
          <span className="text-gray-600">Total:</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold pl-2">${totalPrice} </span>
          <span className="text-lg font-semibold pl-2">${deliveryAmount}</span>
          <span className="text-lg font-semibold pl-2">
            ${totalPrice + deliveryAmount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartMenuList;
