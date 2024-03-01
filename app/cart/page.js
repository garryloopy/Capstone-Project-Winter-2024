"use client";
import Loading from "@/components/Loading";
import { CartContext } from "@/components/Providers";
import SubHeader from "@/components/SubHeader";
import { useLoadingState } from "@/components/useLoadingState";
import { useContext, useEffect, useState } from "react";
import CartMenuList from "@/components/CartMenuList";
import CartClientInfo from "@/components/CartClientInfo";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import toast, { Toaster } from "react-hot-toast";

/**
 * This is a cart page
 * @returns
 */
export default function CartPage() {
  const { cartProducts, removeCartProduct, calculateTotalPrice } =
    useContext(CartContext);
  const appId = process.env.APP_ID;
  const locationId = process.env.LOCATION_ID;
  const [inputValid, setInputValid] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    email: "",
    address: "",
    apartment: "",
    zip: "",
    tel: "",
    deliveryType: "",
  });

  const [message, setMessage] = useState(null);
  const [isInfoComplete, setIsInfoComplete] = useState();
  const loading = useLoadingState();
  const deliveryAmount = 5;

  let totalPrice = 0;
  for (const product of cartProducts) {
    totalPrice += calculateTotalPrice(product);
  }

  const onDelete = (index) => {
    removeCartProduct(index);
  };

  useEffect(() => {
    // const infoComplete = Object.values(clientInfo).every(
    //   (value) => value !== ""
    // );
    const infoComplete = Object.entries(clientInfo)
      .filter(([key]) => key !== "apartment")
      .every(([, value]) => value !== "");

    setIsInfoComplete(infoComplete);
  }, [clientInfo]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="p-[2rem] flex flex-col justify-center items-center bg-gray-300 z-50">
          <SubHeader header2="Cart" />
          {cartProducts?.length === 0 ? (
            <div className="flex justify-center text-lg h-screen">
              {" "}
              No products in shopping cart
            </div>
          ) : (
            <div className="grid xl:grid-cols-2 grid-col-1 gap-8 w-full mt-[4rem]">
              <div className="bg-gray-100/80 p-4 rounded-md h-fit">
                <h2 className="text-lg m-4 font-semibold text-center ">
                  Your products
                </h2>
                <CartMenuList
                cartProducts={cartProducts}
                  onDelete={onDelete}
                  totalPrice={totalPrice}
                  deliveryAmount={deliveryAmount}
                />
              </div>

              <div className="bg-gray-200/80 p-8 rounded-lg h-fit text-black">
                <h2 className="text-lg m-4 font-semibold text-center">
                  Checkout
                </h2>
                {message && (
                  <span className="flex justify-center my-[2rem] text-red-500">
                    {message}
                  </span>
                )}

                <PaymentForm
                  applicationId={appId}
                  locationId={locationId}
                  cardTokenizeResponseReceived={async (token) => {
                    if (isInfoComplete) {
                      if (inputValid) {
                        const uploadSetting = new Promise(
                          async (resolve, reject) => {
                            const res = await fetch("/api/pay", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                sourceId: token.token,
                                clientInfo,
                                cartProducts,
                              }),
                            });
                            if (res?.ok) {
                              resolve();
                              const { payment } = await res?.json();
                              const status = payment.status;
                              const paymentId = payment.id;
                              if (status === "COMPLETED") {
                                window.location.href = `/receipt/${paymentId}?clear=1`;
                              }
                            } else {
                              reject();
                            }
                          }
                        );
                        await toast.promise(uploadSetting, {
                          loading: "Payment is processing",
                          success: "Payment is processed successfully",
                          error: "Payment is Failed",
                        });
                      } else {
                        setMessage("One or more input values are invalid");
                      }
                    } else {
                      setMessage(
                        "Please complete all fields in the form before proceeding."
                      );
                    }
                  }}
                >
                  <CartClientInfo
                    deliveryAmount={deliveryAmount}
                    totalPrice={totalPrice}
                    clientInfo={clientInfo}
                    setClientInfo={setClientInfo}
                    setInputValid={setInputValid}
                    setMessage={setMessage}
                  />
                  <div>
                    <CreditCard
                      includeInputLabels
                      focus="cardNumber"
                      style={{
                        input: {
                          fontSize: "14px",
                        },
                        "input::placeholder": {
                          color: "#771520",
                        },
                      }}
                      render={(Button) => (
                        <Button>
                          ${(totalPrice + deliveryAmount).toFixed(2)}
                        </Button>
                      )}
                    />
                  </div>
                </PaymentForm>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
