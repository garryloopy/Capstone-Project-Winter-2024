"use client";

import Link from "next/link";

import getFormattedDate from "../../utils/getFormattedDate";

import SubHeader from "@/components/SubHeader";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/(admin)/components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { FaAngleLeft, FaAngleUp } from "react-icons/fa6";
import OrderStatus from "../../components/OrderStatus";
import Image from "next/image";
import Loading from "@/components/Loading";

import { useContext } from "react";
import ModalMessage from "../../components/ModalMessage";

import { CartContext } from "@/components/Providers";

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

  // Cart
  const { calculateTotalPrice } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({});

  // Modal message
  const [toggleModal, setToggleModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");

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

          const cartProducts = result[0]?.cartProducts;
          const clientInfo = result[0]?.clientInfo;

          // Set client statuses
          setClientInfo(clientInfo);
          setCartProducts(cartProducts);
          setOrderId(result[0]?.orderId);
          setCardBrand(result[0]?.cardBrand);
          setLastDigits(result[0]?.lastFourDigits);
          setOrderStatus(result[0]?.orderStatus);
          setObjectId(result[0]?._id);
          setPaymentId(result[0]?.paymentId);

          // calculate total price
          let subTotal = 0;
          if (cartProducts) {
            for (const product of cartProducts) {
              subTotal += calculateTotalPrice(product);
            }
          }
          setSubTotal(subTotal);

          //calculate delivery amount
          if (clientInfo?.distance >= 10) {
            setDeliveryAmount(10);
          } else if (clientInfo?.distance >= 5) {
            setDeliveryAmount(5);
          } else {
            setDeliveryAmount(0);
          }

          setTotalPrice(deliveryAmount + subTotal);
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
    // Do nothing if status is the same
    if (orderStatus === newStatus) {
      setToggleModal(true);
      setModalMessage("Order is already marked as " + newStatus);
      setSubMessage("Please select a different status. ");

      setIsMoreOptionsOpened(false);
      setIsLoading(false);
      return;
    }

    if (orderStatus === "IN PROGRESS") {
      if (newStatus !== "COMPLETED") {
        setModalMessage("Order must be marked as completed first.");
        setSubMessage("Please select completed status.");
        setToggleModal(true);
        setIsLoading(false);
        return;
      }
    } else if (orderStatus === "COMPLETED") {
      setModalMessage("Order is already completed.");
      setSubMessage("Please select a different status. ");
      setToggleModal(true);
      setIsLoading(false);
      return;
    }

    setConfirmationData({ orderId, newStatus });
    setConfirmationModal(true);
  };

  /**
   * Handler for when the confirmation modal is agreed
   */
  const handleOnConfirmationAgree = async () => {
    setConfirmationModal(false);

    // Set loader
    setIsLoading(true);

    try {
      const response = await fetch("/api/updateOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: objectId,
          orderStatus: confirmationData.newStatus,
        }),
      });

      if (response.ok) {
        setOrderStatus(confirmationData.newStatus);
        setIsMoreOptionsOpened(false);
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
    }

    setConfirmationData({});

    // Set loader
    setIsLoading(false);
  };

  /**
   * Handler for when the confirmation modal is disagreed
   */
  const handleOnConfirmationDisagree = () => {
    setConfirmationModal(false);
    setConfirmationData({});
  };

  /**
   * Handler for when the more options button is clicked
   */
  const handleOnMoreOptionsButtonClick = () => {
    setIsMoreOptionsOpened(!isMoreOptionsOpened);
  };

  return status !== "unauthenticated" ? (
    <section className="flex flex-col items-center w-full min-h-screen px-12 py-8 rounded-xl overflow-hidden relative md:p-[6rem] p-4">
      <AdminNavbar path={path} />
      <SubHeader header2="Order Details" />

      <ModalMessage
        message={modalMessage}
        visible={toggleModal}
        subMessage={subMessage}
        onClose={() => setToggleModal(false)}
      />

      {/* This is for displaying error message such as invalid id or failed id fetch */}
      <div
        className={`absolute -inset-0 z-10 flex items-center justify-center ${
          isInvalidId ? "opacity-100" : "opacity-0 invisible"
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

      <div className="bg-gray-50 w-full h-full rounded-md flex flex-col relative">
        {/* Confirmation  */}
        <div
          className={`absolute inset-0 z-10 grid place-items-center backdrop-brightness-90 ${
            confirmationModal
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-gray-100 h-1/3 w-1/3 flex flex-col items-center justify-center gap-5 rounded-lg shadow-md p-4">
            {confirmationData && (
              <div className="flex flex-row items-center gap-3 text-xl font-semibold text-gray-800 text-center">
                <p>
                  Mark{" "}
                  <span className="text-violet-800">
                    {confirmationData.orderId}
                  </span>{" "}
                  as{" "}
                </p>
                <OrderStatus orderStatus={confirmationData.newStatus} />
                <p>?</p>
              </div>
            )}
            {confirmationData && (
              <p className="text-center text-gray-600">
                Marking {confirmationData.orderId} as{" "}
                {confirmationData.newStatus} will send a confirmation of email
                to the customer.
              </p>
            )}

            <div className="flex flex-row gap-4 items-center">
              <button
                className="w-32 h-10 bg-yellow-400 font-semibold text-gray-800 text-lg rounded-lg shadow-md hover:bg-yellow-300 active:bg-yellow-400"
                onClick={handleOnConfirmationAgree}
              >
                Yes
              </button>
              <button
                className="w-32 h-10 bg-yellow-400 font-semibold text-gray-800 text-lg rounded-lg shadow-md hover:bg-yellow-300 active:bg-yellow-400"
                onClick={handleOnConfirmationDisagree}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Shadow effect  */}
        <div className="absolute inset-10 bg-violet-500/50 -z-10 blur-3xl rounded-lg" />
        {/* Loader  */}
        <Loading isLoading={isLoading} />

        {/* Top section  */}
        <div className="relative flex-none h-24 w-full px-6 ">
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
          <div className="flex flex-col">
            {/* Order Status  */}
            <div className="w-full xl:h-24 min-h-24 flex xl:flex-row flex-col justify-between py-8 xl:py-0 gap-4 items-center px-8">
              <div className="flex flex-row justify-center items-center gap-8 flex-1">
                <p className="text-xl font-semibold text-gray-500">
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
                    <div
                      className={`min-w-56 min-h-12 h-max bg-gray-50 border shadow-lg absolute inset-y-11 right-0 divide-y rounded-md overflow-hidden  ${
                        isMoreOptionsOpened
                          ? "opacity-100"
                          : "opacity-0 invisible"
                      } transition-opacity duration-100`}
                    >
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("IN PROGRESS")}
                      >
                        Mark as in progress
                      </button>
                      <button
                        className="px-6 py-4 w-full hover:bg-gray-100 "
                        onClick={() => handleOnStatusChange("COMPLETED")}
                      >
                        Mark as completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                {clientInfo && (
                  <p className="text-xl font-semibold text-gray-500">
                    Delivery Type:{" "}
                    <span className="text-black">
                      {clientInfo.deliveryType}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex xl:flex-row flex-col justify-between xl:h-20 min-h-20 xl:py-0 py-8 bg-gray-100/50 items-center px-8 xl:divide-x divide-gray-300 xl:divide-y-0 divide-y shadow-sm">
              {orderId && (
                <p className="text-center w-full font-semibold flex flex-col xl:py-0 py-2">
                  Order ID:{" "}
                  <span className="text-md font-medium ">{orderId}</span>
                </p>
              )}
              {formattedDate && (
                <p className="text-center  w-full font-semibold flex flex-col xl:py-0 py-2">
                  Date:{" "}
                  <span className="text-md font-medium ">{formattedDate}</span>
                </p>
              )}
              {cardBrand && lastDigits && (
                <p className="text-center  w-full font-semibold flex flex-col xl:py-0 py-2">
                  Payment:{" "}
                  <span className="text-md font-medium ">
                    {cardBrand} ending with {lastDigits}
                  </span>
                </p>
              )}
              {paymentId && (
                <p className="text-center  w-full font-semibold flex flex-col xl:py-0 py-2">
                  Payment ID:{" "}
                  <span className="text-md font-medium ">{paymentId}</span>
                </p>
              )}
            </div>
          </div>

          {/* Container  */}
          <div className="flex-1 flex xl:flex-row flex-col xl:divide-x divide-y xl:divide-y-0 divide-gray-300">
            {/* Left side  */}
            <div className="flex-1 p-8 flex flex-col">
              {/* Top section of left side  */}
              <div className="flex min-h-16 flex-col">
                {/* Order Summary  */}
                <div className="flex flex-row justify-between w-full">
                  <p className="text-lg text-gray-500 font-semibold">
                    Order Summary:
                  </p>
                  {cartProducts && (
                    <p className="text-lg text-gray-600">
                      {cartProducts.length} item
                      {cartProducts.length > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                {/* Total Prices  */}
                <div className="py-8 flex flex-col text-lg font-semibold text-gray-500">
                  <p>
                    Subtotal:{" "}
                    <span className="text-md text-black">
                      ${subTotal.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Delivery:{" "}
                    <span className="text-md text-black">
                      ${deliveryAmount.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="text-md text-black">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              {/* Orders section  */}
              <div className="flex-1 flex flex-col gap-6">
                {cartProducts?.length > 0 &&
                  cartProducts.map((product) => {
                    return (
                      <div
                        className="flex flex-col sm:flex-row justify-between gap-12 sm:gap-0 items-center ring-1 ring-gray-300 shadow-sm rounded-xl py-12 sm:py-4 px-6 bg-gray-100 flex-wrap"
                        key={product._id}
                      >
                        <div className="flex flex-col justify-center sm:justify-start sm:flex-row gap-12 items-center w-7/12">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="circular-image"
                          />
                          <div className="sm:text-start text-center">
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
                        <div>${calculateTotalPrice(product).toFixed(2)}</div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right side  */}
            <div className="flex-1 bg-gray-100">
              {/* Contact info section  */}
              <div className="w-full flex flex-col justify-center items-center xl:items-start gap-8 p-8">
                <p className="text-2xl font-semibold text-gray-500">
                  Contact Information
                </p>
                <div className="flex flex-col xl:gap-8 gap-12">
                  <div className="flex flex-col xl:flex-row gap-4 text-xl xl:justify-start justify-center items-center">
                    <p className="w-max xl:w-28">Email:</p>
                    <div>
                      <p className="text-gray-600">{clientInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row gap-4 text-xl xl:justify-start justify-center items-center">
                    <p className="w-max xl:w-28">Address:</p>
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
