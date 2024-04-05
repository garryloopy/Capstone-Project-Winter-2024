"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Providers";
import Image from "next/image";
import TrashBin from "@/app/icons/TrashBin";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartMenuList = ({
  cartProducts,
  onDelete,
  totalPrice,
  deliveryAmount,
}) => {
  const { calculateTotalPrice } = useContext(CartContext);
  const [deliveryMessage, setDeliveryMessage] = useState(false);
  const { clearCart } = useContext(CartContext);
  const router = useRouter();

  const handleClearCard = () => {
    clearCart();
    router.push("/menu");
  };

  //disappear clear cart link in receipt page
  let clearLink = false;
  clearLink = window.location.href.includes("clear=1");

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
              <h3 className="text-violet-500 font-semibold">{product.title}</h3>
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
      <div
        className={` flex ${!clearLink ? "justify-between" : "justify-end"}`}
      >
        {/* clear the cart button */}
        {!clearLink && (
          <div
            className="underline text-sm text-gray-500"
            onClick={handleClearCard}
          >
            <Link href="/menu">Clear Cart</Link>
          </div>
        )}

        <div className="lg:px-[2rem] py-4 flex justify-end items-end">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">SubTotal:</span>
            <div className="relative">
              <div
                className={`${
                  !clearLink ? "flex" : "hidden"
                } justify-center w-[20px] h-[20px] rounded-full border border-gray-400 text-sm text-gray-500 absolute left-[-2rem] cursor-pointer`}
                onMouseEnter={() => setDeliveryMessage(true)}
                onMouseLeave={() => setDeliveryMessage(false)}
              >
                ?
              </div>
              {deliveryMessage ? (
                <p
                  className={`absolute left-[-20rem] top-[-5rem] bg-gray-200 border rounded-md p-2 text-sm text-gray-400 `}
                >
                  Free shipping within 5Km
                  <br />
                  $5 shipping fee for more than 5Km
                  <br />
                  $10 shipping fee for more than 10Km <br />
                </p>
              ) : (
                ""
              )}
              <span className="text-gray-400">Delivery:</span>
            </div>
            <span className="text-gray-400">Total:</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-md font-semibold pl-2 text-gray-500">
              ${totalPrice.toFixed(2)}{" "}
            </span>
            <span className="text-md font-semibold pl-2 text-gray-500">
              ${deliveryAmount.toFixed(2)}
            </span>
            <span className="text-md font-semibold pl-2 text-gray-500">
              ${(totalPrice + deliveryAmount)?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenuList;
