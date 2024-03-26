"use client";

import Link from "next/link";

import getFormattedDate from "../../utils/getFormattedDate";

import SubHeader from "@/components/SubHeader";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/(admin)/components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { FaAngleLeft, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import OrderStatus from "../../components/OrderStatus";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import Loading from "@/components/Loading";

export default function OrderDetailsPage({ params }) {
  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  // Used for displaying error message
  const [isInvalidId, setIsInvalidId] = useState(false);

  // Client states
  const [clientInfo, setClientInfo] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [cardBrand, setCardBrand] = useState();
  const [lastDigits, setLastDigits] = useState();
  const [orderId, setOrderId] = useState();
  const [orderStatus, setOrderStatus] = useState("");
  const [objectId, setObjectId] = useState();
  const [paymentId, setPaymentId] = useState();

  const [isMoreOptionsOpened, setIsMoreOptionsOpened] = useState(false);

  const { id } = useParams();

  const session = useSession();
  const { status } = session;
  const path = usePathname();

  // Redirect user if unauthenticated
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  /**
   * Gets the order info
   */
  const getOrderInfo = async () => {
    try {
      if (id) {
        const res = await fetch(`/api/getOrder?id=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const result = await res.json();

          //format the date of order
          const formattedDate = getFormattedDate(result[0]?.createdAt);
          setFormattedDate(formattedDate);

          // Set client statuses
          setClientInfo(result[0]?.clientInfo);
          setCartProducts(result[0]?.cartProducts);
          setOrderId(result[0]?.orderId);
          setCardBrand(result[0]?.cardBrand);
          setLastDigits(result[0]?.lastFourDigits);
          setOrderStatus(result[0]?.orderStatus);
          setObjectId(result[0]?._id);
          setPaymentId(result[0]?.paymentId);
        } else {
          console.log("Error to fetch order info");
        }
      }
    } catch (error) {
      //Invalid payment id or something went wrong with fetching data
      setIsInvalidId(true);
    }
  };

  /**
   * Set loading and get order info
   */
  useEffect(() => {
    setIsLoading(true);

    if (params && params.id && id) {
      getOrderInfo();
    }

    setIsLoading(false);
  }, []);

  /**
   * Handler for when a status changes within the children components
   * @param {String} newStatus The new status
   */
  const handleOnStatusChange = async (newStatus) => {
    // Set loader
    setIsLoading(true);

    // Do nothing
    if (orderStatus === newStatus) {
      setIsMoreOptionsOpened(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/updateOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: objectId,
          orderStatus: newStatus,
        }),
      });

      if (response.ok) {
        setOrderStatus(newStatus);
        setIsMoreOptionsOpened(false);
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
    }

    // Set loader
    setIsLoading(false);
  };

  /**
   * Handler for when the more options button is clicked
   */
  const handleOnMoreOptionsButtonClick = () => {
    setIsMoreOptionsOpened(!isMoreOptionsOpened);
  };

  return status !== "unauthenticated" ? (
    <section className="flex flex-col items-center w-full min-h-screen px-12 py-8 overflow-auto relative">
      <AdminNavbar path={path} />
      <SubHeader header2="Order Details" />

      {/* This is for displaying error message such as invalid id or failed id fetch */}
      <div
        className={`absolute -inset-0 z-10 flex items-center justify-center ${
          isInvalidId ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 backdrop-brightness-90`}
      >
        <div className="bg-gray-50 min-size-64 p-8 flex flex-col items-center justify-between border-2 rounded-md shadow-md">
          <div className="text-center text-md text-orange-600">
            <p>Something went wrong with fetching the information.</p>
            <p>Please ensure that the payment ID is valid.</p>
          </div>
          {/* Top section  */}
          <div className="relative flex-none h-24 w-full px-6 flex items-center justify-center">
            <Link
              href="/orders"
              className="flex flex-row items-center gap-1 w-max h-full text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors duration-200 group"
            >
              <FaAngleLeft
                size={20}
                className="text-orange-600 group-hover:-translate-x-2 transition-transform duration-300"
              />
              Back to orders
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 w-full h-full rounded-md flex flex-col">
        {/* Loader  */}
        <Loading isLoading={isLoading} />

        {/* Top section  */}
        <div className="relative flex-none h-24 w-full px-6">
          <Link
            href="/orders"
            className="flex flex-row items-center gap-1 w-max h-full text-xl font-medium text-gray-600 hover:text-gray-950 transition-colors duration-200 group"
          >
            <FaAngleLeft
              size={28}
              className="text-orange-600 group-hover:-translate-x-3 transition-transform duration-300"
            />
            Back to orders
          </Link>
        </div>

        {/* Main section  */}
        <div className="flex-1 min-h-screen bg-gray-50 flex flex-col">
          {/* Main section header  */}
          <div className="flex flex-col border-b">
            {/* Order Status  */}
            <div className="w-full h-24 flex flex-row justify-between items-center px-8 border-b">
              <div className="flex flex-row justify-center items-center gap-8 flex-1">
                <p className="text-xl font-semibold text-gray-800">
                  Order Status:
                </p>

                {/* Order Status  */}
                <div
                  className={`relative ${
                    isMoreOptionsOpened ? "opacity-100" : "opacity-65"
                  } hover:opacity-100 transition-opacity duration-300`}
                >
                  <OrderStatus orderStatus={orderStatus} />

                  <div
                    className="absolute inset-0 flex items-center justify-end p-2 cursor-pointer"
                    onClick={handleOnMoreOptionsButtonClick}
                  >
                    <FaAngleUp
                      size={16}
                      className={`${
                        isMoreOptionsOpened ? "rotate-0" : "rotate-180"
                      } transition-all duration-200`}
                    />
                    {/* {isMoreOptionsOpened ? (
                      <FaAngleDown size={16} />
                    ) : (
                      <FaAngleUp size={16} />
                    )} */}

                    <div
                      className={`min-w-56 min-h-12 h-max bg-gray-50 border shadow-lg absolute inset-y-11 right-0 divide-y rounded-md overflow-hidden  ${
                        isMoreOptionsOpened ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-100`}
                    >
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("COMPLETED")}
                      >
                        Mark as completed
                      </button>
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("IN PROGRESS")}
                      >
                        Mark as in progress
                      </button>
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("PENDING")}
                      >
                        Mark as pending
                      </button>
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("CANCELLED")}
                      >
                        Mark as cancelled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                {clientInfo && (
                  <p className="text-xl font-semibold text-gray-800">
                    Delivery Type: {clientInfo.deliveryType}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between h-20 bg-gray-100 items-center px-8 divide-x-2 shadow-md">
              {orderId && (
                <p className="text-center w-full font-semibold flex flex-col">
                  Order ID:{" "}
                  <span className="text-md font-medium ">{orderId}</span>
                </p>
              )}
              {formattedDate && (
                <p className="text-center  w-full font-semibold flex flex-col">
                  Date:{" "}
                  <span className="text-md font-medium ">{formattedDate}</span>
                </p>
              )}
              {cardBrand && lastDigits && (
                <p className="text-center  w-full font-semibold flex flex-col">
                  Payment:{" "}
                  <span className="text-md font-medium ">
                    {cardBrand} xxxxxxxxxxxx{lastDigits}
                  </span>
                </p>
              )}
              {paymentId && (
                <p className="text-center  w-full font-semibold flex flex-col">
                  Payment ID:{" "}
                  <span className="text-md font-medium ">{paymentId}</span>
                </p>
              )}
            </div>
          </div>

          {/* Container  */}
          <div className="flex-1 flex flex-row">
            {/* Left side  */}
            <div className="flex-1 p-8 flex flex-col">
              {/* Top section of left side  */}
              <div className="flex h-16 flex-row justify-between">
                <p className="text-lg font-800">Order Summary:</p>
                {cartProducts && (
                  <p className="text-lg font-800">
                    {cartProducts.length} item
                    {cartProducts.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
              {/* Orders section  */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-6">
                {cartProducts?.length > 0 &&
                  cartProducts.map((product) => {
                    return (
                      <div
                        className="flex flex-row border py-3 px-4 bg-gray-100 rounded-md shadow-md"
                        key={product._id}
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="circular-image"
                        />
                        <div>
                          <h3 className="text-orange-500 font-semibold">
                            {product.title}
                          </h3>
                          {product.sizes && (
                            <div className="text-sm ">
                              <span>{product.sizes.name}</span>
                            </div>
                          )}
                          {product.extra?.length > 0 && (
                            <div className="text-sm text-gray-950">
                              {product.extra.map((extra, index) => (
                                <div key={index}>
                                  {extra.name} ${extra.price}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-gray-950">
                            {product.specialRequest}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right side  */}
            <div className="flex-1 border-l">
              {/* Contact info section  */}
              <div className="w-full flex flex-col justify-center items-start gap-4 p-8">
                <p className="text-2xl font-medium text-gray-700">
                  Contact Information
                </p>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-row gap-4 text-xl items-center">
                    <p className="min-w-28">Email:</p>
                    <div>
                      <p className="text-gray-600">{clientInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 text-xl items-center">
                    <p className="min-w-28">Address:</p>
                    <div>
                      <p className="text-gray-600">{clientInfo?.address}</p>
                      <p className="text-gray-600">Canada, Alberta, Calgary</p>
                      <p className="text-gray-600">{clientInfo?.zip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}
