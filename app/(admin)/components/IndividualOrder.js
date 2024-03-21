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
  orderName,
  orderDate,
  onOrderStatusChange,
}) => {
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(orderStatus);

  const moreOptionsRef = useRef(null);

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

  const handleOnOrderStatusChange = (newStatus) => {
    onOrderStatusChange(orderId, newStatus);
  };

  const handleOnStatusChange = async (newStatus) => {
    if (orderStatus === newStatus) {
      setIsMoreOptionsOpen(false);
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
        setCurrentStatus(newStatus);
        setIsMoreOptionsOpen(false);
        handleOnOrderStatusChange(newStatus);
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
    }
  };

  const handleOnMoreOptionButtonClicked = () => {
    setIsMoreOptionsOpen(!isMoreOptionsOpen);
  };

  return (
    <div className="w-full min-h-16 flex flex-row  text-center h-20 border rounded-md bg-gray-100 shadow-md relative hover:bg-gray-200 hover:shadow-lg active:bg-gray-200/80 transition-all duration-100">
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
          <div className="absolute min-w-44 min-h-12 bg-gray-50 border shadow-lg top-16 flex flex-col group divide-y items-center justify-center rounded-md z-10 ">
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
              <p>Open in new tab</p>
              <FaExternalLinkAlt size={16} />
            </a>
            <button
              className="px-6 py-4 w-full hover:bg-gray-100 "
              onClick={() => handleOnStatusChange("COMPLETED")}
            >
              Mark as completed
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
        )}
      </div>

      <div className="w-2/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderId}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderName}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderDate}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <OrderStatus orderStatus={currentStatus} />
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderAmount}</p>
      </div>
    </div>
  );
};

export default IndividualOrder;
