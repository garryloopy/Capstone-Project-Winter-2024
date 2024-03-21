export default function OrderStatus({ orderStatus }) {
  return (
    <div
      className={`text-wrap truncate border w-36 h-10 flex items-center justify-center ${
        orderStatus === "COMPLETED"
          ? "bg-green-50 border-green-200 text-green-800"
          : orderStatus === "PENDING"
          ? "bg-orange-50 border-orange-200 text-orange-800"
          : "bg-red-50 border-red-200 text-red-800"
      } font-medium rounded-lg`}
    >
      <p>{orderStatus}</p>
    </div>
  );
}
