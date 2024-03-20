import Link from "next/link";

import { FaEllipsis, FaAngleUp } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const IndividualOrder = ({
  orderId,
  orderStatus,
  orderAmount,
  orderName,
  orderDate,
}) => {
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
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

  const handleOnMoreOptionButtonClicked = () => {
    setIsMoreOptionsOpen(!isMoreOptionsOpen);
  };

  return (
    <div className="w-full min-h-16 flex flex-row  text-center h-20 border rounded-md bg-gray-100 shadow-md relative hover:bg-gray-200 hover:shadow-lg active:bg-gray-200/80 transition-all duration-100">
      {/* More Options */}
      <div
        className="absolute inset-0 flex items-center justify-end px-8"
        ref={moreOptionsRef}
      >
        <button
          className="pointer-events-auto cursor-pointer border p-3 rounded-lg hover:bg-gray-50"
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
              href={`/orders/${orderId}`}
            >
              Open
            </Link>
            <a
              className="px-6 py-4 w-full hover:bg-gray-100 flex flex-row items-center gap-4 "
              target="_blank"
              href={`/orders/${orderId}`}
            >
              <p>Open in new tab</p>
              <FaExternalLinkAlt size={16} />
            </a>
            <button className="px-6 py-4 w-full hover:bg-gray-100 ">
              Mark as completed
            </button>
            <button className="px-6 py-4 w-full hover:bg-gray-100 ">
              Mark as pending
            </button>
            <button className="px-6 py-4 w-full hover:bg-gray-100 ">
              Mark as cancelled
            </button>
          </div>
        )}
      </div>

      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderId}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderName}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">{orderDate}</p>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center">
        <p
          className={`text-wrap truncate border w-36 py-2 ${
            orderStatus === "COMPLETED"
              ? "bg-green-50 border-green-200 text-green-800"
              : orderStatus === "PENDING"
              ? "bg-orange-50 border-orange-200 text-orange-800"
              : "bg-red-50 border-red-200 text-red-800"
          } font-medium rounded-lg`}
        >
          {orderStatus}
        </p>
      </div>
      <div className="w-2/6 h-full flex items-center justify-center">
        <p className="text-wrap truncate">${orderAmount}</p>
      </div>
    </div>
  );
};

export default IndividualOrder;
