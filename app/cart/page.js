"use client"

import Loading from "@/components/Loading";
import { CartContext } from "@/components/Providers";
import SubHeader from "@/components/SubHeader";
import { useLoadingState } from "@/components/useLoadingState";
import { useContext } from "react";
import CartMenuList from "@/components/CartMenuList"
import CartClientInfo from "@/components/CartClientInfo"

/**
 * This is a cart page
 * @returns
 */
export default function CartPage() {
     const { cartProducts, removeCartProduct, calculateTotalPrice } =
       useContext(CartContext);
       const loading = useLoadingState()
         const deliveryAmount = 5;

  let totalPrice = 0;
  for (const product of cartProducts) {
    totalPrice += calculateTotalPrice(product);
  }

        const onDelete = (index) => {
          removeCartProduct(index);
        };
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <section className="p-[2rem] flex flex-col justify-center items-center">
            <SubHeader header2="Cart" />
            {cartProducts?.length === 0 ? (
              <div className="flex justify-center text-white text-lg h-screen">
                {" "}
                No products in shopping cart
              </div>
            ) : (
              <div className="grid xl:grid-cols-2 grid-col-1 gap-8 w-full mt-[4rem]">
                <div className="bg-gray-100/80 p-4 rounded-md">
                  <h2 className="text-lg m-4 font-semibold text-center ">
                    Your products
                  </h2>
                  <CartMenuList
                    onDelete={onDelete}
                    totalPrice={totalPrice}
                    deliveryAmount={deliveryAmount}
                  />
                </div>

                <div className="bg-black/60 p-4 rounded-lg max-h-[100vh]">
                  <h2 className="text-lg m-4 font-semibold text-center text-white">
                    Checkout
                  </h2>
                  <CartClientInfo
                    deliveryAmount={deliveryAmount}
                    totalPrice={totalPrice}
                  />
                </div>
              </div>
            )}
          </section>
        )}
      </>
    );
}
