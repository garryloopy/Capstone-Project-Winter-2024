"use client";
import Loading from "@/components/Loading";
import {
  CartContext,
  ClientLocationContext,
  DeliveryAmountContext,
  UserLocationContext,
} from "@/components/Providers";
import SubHeader from "@/components/SubHeader";
import { useLoadingState } from "@/components/useLoadingState";
import { useContext, useEffect, useState } from "react";
import CartMenuList from "@/components/CartMenuList";
import CartClientInfo from "@/components/CartClientInfo";
import {
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";
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
    distance: "",
    duration: "",
  });

  const [message, setMessage] = useState(null);
  const [isInfoComplete, setIsInfoComplete] = useState();
  const loading = useLoadingState();
  // store the current location of user
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { clientLocation, setClientLocation } = useContext(
    ClientLocationContext
  );
  const [distanceDuration, setDistanceDuration] = useState();
  const [deliveryAmount, setDeliveryAmount] = useState();

  let totalPrice = 0;
  for (const product of cartProducts) {
    totalPrice += calculateTotalPrice(product);
  }

  const onDelete = (index) => {
    removeCartProduct(index);
  };

  //get the current location of user
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  //get the distance and duration
  const getDirectionRoute = async () => {
    if (userLocation && clientLocation) {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${userLocation.longitude},${userLocation.latitude};${clientLocation.longitude},${clientLocation.latitude}?overview=full&geometries=geojson&access_token=${process.env.MAP_ACCESS_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result && result.routes.length > 0) {
        let distanceInKm = Math.floor(result.routes[0].distance * 0.001);
        let durationInMin = Math.round(result.routes[0].duration / 60);

        setClientInfo((prev) => ({
          ...prev,
          distance: distanceInKm,
          duration: durationInMin,
        }));
      }
      setDistanceDuration(result);
    }
  };

  useEffect(() => {
    if (userLocation && clientLocation) {
      getDirectionRoute();
    }
  }, [userLocation, clientLocation]);

  useEffect(() => {
    // const infoComplete = Object.values(clientInfo).every(
    //   (value) => value !== ""
    // );
    const infoComplete = Object.entries(clientInfo)
      .filter(([key]) => key !== "apartment")
      .every(([, value]) => value !== "");

    setIsInfoComplete(infoComplete);
  }, [clientInfo]);

  //calculate the distance between the business and client
  useEffect(() => {
    if (
      clientInfo.distance &&
      clientInfo.deliveryType === "delivery" &&
      clientInfo.address
    ) {
      if (clientInfo.distance >= 10) {
        setDeliveryAmount(10);
      } else if (clientInfo.distance >= 5) {
        setDeliveryAmount(5);
      } else {
        setDeliveryAmount(0);
      }
    } else {
      setDeliveryAmount(0);
    }
  }, [
    clientInfo.deliveryType,
    deliveryAmount,
    clientInfo.distance,
    clientInfo.address,
  ]);

  //calculate the total price with delivery Amount
  const totalPricePlusDelivery = totalPrice + deliveryAmount;

  const handleEmail = async (paymentId) => {
    const res = await fetch("/api/email/sendOrderConfirmationCheckout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: paymentId,
      }),
    });
    if (res.ok) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="p-[2rem] mt-32 flex flex-col justify-center items-center z-50">
          <SubHeader header2="Cart" />
          {cartProducts?.length === 0 ? (
            <div className="flex justify-center text-lg h-screen text-black">
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
                                totalPricePlusDelivery,
                              }),
                            });
                            if (res?.ok) {
                              resolve();
                              const { payment } = await res?.json();
                              const status = payment.status;
                              const paymentId = payment.id;
                              await handleEmail(paymentId);
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
                          success: "Payment processed successfully",
                          error: "Payment failed",
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
                  // ------ this is for Google Pay ------
                  createPaymentRequest={() => ({
                    countryCode: "CA",
                    currencyCode: "CAD",
                    total: {
                      amount: totalPricePlusDelivery.toFixed(2),
                      label: "Total",
                    },
                  })}
                >
                  <CartClientInfo
                    clientInfo={clientInfo}
                    setClientInfo={setClientInfo}
                    setInputValid={setInputValid}
                    setMessage={setMessage}
                  />
                <div className="mb-3">
                  <GooglePay />
                </div>
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
                        <Button
                          style={{
                            backgroundColor: "rgb(250, 204, 21)",
                            color: "black",
                            hover: { backgroundColor: "rgb(240, 180, 18)" },
                          }}
                        >
                          $
                          {`${(
                            totalPrice +
                            (deliveryAmount >= 5 ? deliveryAmount : 0)
                          ).toFixed(2)}`}
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
