"use client";
import BillingAddress from "@/components/BillingAddress";
import CartMenuList from "@/components/CartMenuList";
import Loading from "@/components/Loading";
import { CartContext, DeliveryAmountContext } from "@/components/Providers";
import SubHeader from "@/components/SubHeader";
import { useParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

/**
 *
 * @returns
 */
export default function OrderConfirmationPage() {
  const [clientInfo, setClientInfo] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [cardBrand, setCardBrand] = useState();
  const [lastDigits, setLastDigits] = useState();
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(true);
  const { calculateTotalPrice, clearCart } = useContext(CartContext);
  const [deliveryAmount, setDeliveryAmount] = useState(0);

  const { id } = useParams();
  let totalPrice = 0;
  useEffect(() => {
    const getOrderInfo = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await fetch(`/api/getOrder?id=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) {
            const result = await res.json();

            //format the date of order
            const createdAtDate = new Date(result[0]?.createdAt);

            const options = {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            };

            const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
            const formattedDate = dateTimeFormat.format(createdAtDate);
            setFormattedDate(formattedDate);

            setClientInfo(result[0]?.clientInfo);
            setCartProducts(result[0]?.cartProducts);
            setOrderId(result[0]?.orderId);
            setCardBrand(result[0]?.cardBrand);
            setLastDigits(result[0]?.lastFourDigits);
          } else {
            console.log("Error fetching order info");
          }
          setLoading(false);
        } catch (error) {
          console.log("Error fetching order info:", error);
          setLoading(false);
        }
      }
    };

    getOrderInfo();
  }, [
    id,
    setFormattedDate,
    setClientInfo,
    setCartProducts,
    setOrderId,
    setCardBrand,
    setLastDigits,
  ]);

  // calculate total price
  if (cartProducts) {
    for (const product of cartProducts) {
      totalPrice += calculateTotalPrice(product);
    }
  }

  //calculate delivery amount
  useEffect(() => {
    if (clientInfo?.distance >= 10) {
      setDeliveryAmount(10);
    } else if (clientInfo?.distance >= 5) {
      setDeliveryAmount(5);
    } else {
      setDeliveryAmount(0);
    }
  }, [deliveryAmount, clientInfo?.distance]);

  // clear cart shipping
  // const handleCart = useCallback(() => {
  //   clearCart();
  // }, [clearCart]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (window.location.href.includes("clear=1")) {
  //       handleCart();
  //     }
  //   }
  // }, [handleCart]);

  useEffect(() => {
    const handleClearCart = () => {
      if (
        typeof window !== "undefined" &&
        window.location.href.includes("clear=1")
      ) {
        clearCart();
      }
    };

    handleClearCart();
    
  }, [window.location.href]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className=" bg-gray-300/60 my-[8rem]">
          <div className="w-full px-[2rem] ">
            <div className="md:px-[4rem] px-[2rem] py-[1rem] flex md:flex-row flex-col justify-between">
              <SubHeader header2="Receipt" />
              <h1 className="md:text-xl text-md font-bold md:mt-[2.5rem] text-black text-center">
                ${(totalPrice + deliveryAmount).toFixed(2)}
              </h1>
            </div>
            <div className="mt-[1rem] flex xl:flex-row flex-col gap-2 lg:justify-around lg:items-start text-black">
              {formattedDate && (
                <h3>
                  <span className="text-lg font-semibold">Date:</span>{" "}
                  {formattedDate}
                </h3>
              )}

              {orderId && (
                <h3>
                  <span className="text-lg font-semibold">Order ID:</span>{" "}
                  <span>{orderId}</span>
                </h3>
              )}
              {cardBrand && lastDigits && (
                <h3>
                  <span className="text-lg font-semibold">Payment:</span>{" "}
                  {cardBrand} xxxxxxxxxxxx{lastDigits}
                </h3>
              )}
            </div>
            <div className="flex justify-center items-center lg:w-[60%] w-full mx-auto text-center my-[2rem]">
              {clientInfo?.deliveryType === "pickup" ? (
                <h2 className="font-extrabold text-md text-orange-500">
                  Your order will be prepared and ready for pickup at our
                  location. Kindly visit us within the next 20 minutes to
                  collect your items. Your timely pickup will ensure that your
                  order is fresh and ready for your enjoyment.
                </h2>
              ) : (
                <h2 className="font-extrabold text-md text-orange-500">
                  Your order will be prepared and will let you know when is out
                  for delivery by sending email at {clientInfo?.email}.
                </h2>
              )}
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-4 px-[4rem] py-[2rem]">
            <div className="basis-[60%]">
              <h2 className="text-center text-lg font-bold text-gray-500 mb-[2rem]">
                Your order
              </h2>
              <CartMenuList
                cartProducts={cartProducts}
                totalPrice={totalPrice}
                deliveryAmount={deliveryAmount}
              />
            </div>
            <div className="basis-[40%] lg:border border-slate-700 h-fit p-[2rem] my-[2rem]">
              <h2 className="text-lg font-bold text-gray-500 mb-[2rem]">
                Contact Information
              </h2>
              <BillingAddress clientInfo={clientInfo} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
