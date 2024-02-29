"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Providers";
import Image from "next/image";
import TrashBin from "@/app/icons/TrashBin";

const CartMenuList = ({ cartProducts, onDelete, totalPrice, deliveryAmount }) => {
  const { calculateTotalPrice} = useContext(CartContext);

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
              <p className="text-sm text-gray-500">{product.specialRequest}</p>
            </div>
            <div className="text-sm mr-4">
              ${calculateTotalPrice(product).toFixed(2)}
            </div>
            {onDelete && (
              <div>
                <button type="button" onClick={() => onDelete(index)}>
                  <TrashBin className="w-[2rem] h-[2rem] border bg-gray-300 p-[.3rem] rounded-md border-gray-400 hover:bg-gray-200" />
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
          <span className="text-md font-semibold pl-2">
            ${totalPrice.toFixed(2)}{" "}
          </span>
          <span className="text-md font-semibold pl-2">
            ${deliveryAmount.toFixed(2)}
          </span>
          <span className="text-md font-semibold pl-2">
            ${(totalPrice + deliveryAmount).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartMenuList;
