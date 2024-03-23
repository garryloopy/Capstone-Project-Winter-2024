/**
 * Represents possible status states
 */
const ORDER_STATUS_VAL = {
  COMPLETED: "bg-green-50 border-green-200 text-green-800",
  "IN PROGRESS": "bg-blue-50 border-blue-200 text-blue-800",
  PENDING: "bg-orange-50 border-orange-200 text-orange-800",
  CANCELLED: "bg-red-50 border-red-200 text-red-800",
};

/**
 * An order status component which is represented in a different state depending on an order status
 * @param {String} orderStatus The order status
 * @returns An order status component
 */
export default function OrderStatus({ orderStatus }) {
  return (
    <div
      className={`text-wrap truncate border w-52 h-10 flex items-center justify-center ${
        orderStatus === "COMPLETED"
          ? ORDER_STATUS_VAL.COMPLETED
          : orderStatus === "IN PROGRESS"
          ? ORDER_STATUS_VAL["IN PROGRESS"]
          : orderStatus === "PENDING"
          ? ORDER_STATUS_VAL.PENDING
          : ORDER_STATUS_VAL.CANCELLED
      } font-medium rounded-lg`}
    >
      <p className="text-base font-medium">{orderStatus}</p>
    </div>
  );
}
