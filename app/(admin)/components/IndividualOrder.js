import Link from "next/link";

import { FaEllipsis, FaAngleUp } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import OrderStatus from "./OrderStatus";

const IndividualOrder = ({
  objectId,
  orderId,
  paymentId,
  orderStatus,
  orderAmount,
  orderEmail,
  orderDate,
  onOrderStatusChange,
}) => {
  // State for displaying options
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  // Current status of the order
  const [currentStatus, setCurrentStatus] = useState(orderStatus);

  // Ref for more options
  const moreOptionsRef = useRef(null);

  // Handle any outside click
  // Close more options if click is anything other than itself
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target)
      ) {
        setIsMoreOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * Sub-handler for any status changes within the component. Call parent function
   * @param {String} newStatus The new status
   */
  const handleOnOrderStatusChange = (newStatus) => {
    // Call parent function
    if (onOrderStatusChange) onOrderStatusChange(orderId, objectId, newStatus);
  };

  /**
   * Main handler for status change within the component
   * @param {String} newStatus The new status
   */
  const handleOnStatusChange = async (newStatus) => {
    // Do nothing, close more options
    if (orderStatus === newStatus) {
      setIsMoreOptionsOpen(false);
      return;
    }

    handleOnOrderStatusChange(newStatus);
    setIsMoreOptionsOpen(false);
  };

  /**
   * Handler for when the more options button is clicked by the user
   */
  const handleOnMoreOptionButtonClicked = () => {
    setIsMoreOptionsOpen(!isMoreOptionsOpen);
  };

  return (
    <div className="w-full min-h-16 flex flex-row text-center h-max ring-1 ring-gray-300 rounded-md bg-white shadow-md relative">
      {/* More Options */}
      <div
        className="absolute inset-0 flex items-center justify-end px-4"
        ref={moreOptionsRef}
      >
        <button
          className="pointer-events-auto cursor-pointer border p-2 rounded-lg hover:bg-gray-50"
          onClick={handleOnMoreOptionButtonClicked}
        >
          {isMoreOptionsOpen ? (
            <FaAngleUp size={24} className="text-gray-700" />
          ) : (
            <FaEllipsis size={24} className="text-gray-700" />
          )}
        </button>

        {/* More Options  */}
        {isMoreOptionsOpen && (
          <div className="absolute min-w-44 min-h-12 bg-gray-50 border shadow-lg top-16 flex flex-col group divide-y items-center justify-center rounded-md z-10 text-md text-gray-800">
            <Link
              className="px-6 py-4 w-full hover:bg-gray-100 "
              href={`/orders/${paymentId}`}
            >
              Open
            </Link>
            <a
              className="px-6 py-4 w-full hover:bg-gray-100 flex flex-row items-center gap-4 "
              target="_blank"
              href={`/orders/${paymentId}`}
            >
              Open in new tab
              <FaExternalLinkAlt size={16} />
            </a>
            <button
              className="px-6 py-4 w-full hover:bg-gray-100 "
              onClick={() => handleOnStatusChange("PENDING")}
            >
              Mark as pending
            </button>
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
        )}
      </div>

      {/* Larger devices  */}
      <div className="w-full h-20 flex flex-row items-center divide-x text-lg text-gray-600 py-5">
        <div className="w-2/6 h-full grid place-items-center">
          <p>{orderId}</p>
        </div>
        <div className="w-1/6 h-full grid place-items-center">
          <p>{orderEmail}</p>
        </div>
        <div className="w-1/6 h-full grid place-items-center">
          <p>{orderDate}</p>
        </div>
        <div className="w-1/6 h-full grid place-items-center">
          <OrderStatus orderStatus={currentStatus} />
        </div>
        <div className="w-1/6 h-full grid place-items-center">
          <p>{orderAmount}</p>
        </div>
      </div>

      {/* <div
        className="flex xl:flex-row items-center h-max w-full xl:divide-x divide-y-2 xl:divide-y-0 divide-x-0
        divide-gray-300 text-wrap truncate text-md font-semibold text-gray-600/90 flex-col sm:h-max"
      >
        <div className="xl:w-2/6 w-2/3 h-full flex flex-col items-center justify-center">
          <span className="block xl:hidden font-bold">Order ID:</span>
          <p>{orderId}</p>
        </div>
        <div className="xl:w-1/6 w-2/3 h-full flex flex-col  items-center justify-center">
          <span className="block xl:hidden font-bold">Email:</span>
          <p>{orderEmail}</p>
        </div>
        <div className="xl:w-1/6 w-2/3 h-full flex flex-col items-center justify-center">
          <span className="block xl:hidden font-bold">Date:</span>
          <p>{orderDate}</p>
        </div>
        <div className="xl:w-1/6 w-2/3 h-full flex flex-col items-center justify-center">
          <span className="block xl:hidden font-bold">Order status:</span>
          <OrderStatus orderStatus={currentStatus} />
        </div>
        <div className="xl:w-1/6 w-2/3 h-full flex flex-col items-center justify-center">
          <span className="block xl:hidden font-bold">Items:</span>
          <p>{orderAmount}</p>
        </div>
      </div> */}
    </div>
  );
};

export default IndividualOrder;
