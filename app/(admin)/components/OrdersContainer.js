"use client";

import IndividualOrder from "../components/IndividualOrder";

import FilterButton from "../components/FilterButton";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { useState } from "react";

export default function OrdersContainer({ ordersList }) {
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const handleOnFilterButtonClick = (filter) => {
    setCurrentFilter(filter);
  };
  return (
    <div className="h-screen w-full bg-gray-200 mb-8 overflow-auto flex flex-col rounded-md">
      {/* Top section */}
      <div className="flex flex-row items-center justify-between h-24 w-full px-8">
        <div className="h-full flex flex-col">
          <div className="h-full flex flex-row items-center gap-6 ">
            <FilterButton
              contents="All"
              filterType="ALL"
              currentFilter={currentFilter}
              onnFilterButtonClick={handleOnFilterButtonClick}
            />
            <FilterButton
              contents="Pending"
              filterType="PENDING"
              currentFilter={currentFilter}
              onFilterButtonClick={handleOnFilterButtonClick}
            />
            <FilterButton
              contents="Completed"
              filterType="COMPLETED"
              currentFilter={currentFilter}
              onFilterButtonClick={handleOnFilterButtonClick}
            />
            <FilterButton
              contents="Cancelled"
              filterType="CANCELLED"
              currentFilter={currentFilter}
              onFilterButtonClick={handleOnFilterButtonClick}
            />
          </div>
        </div>

        <form className="h-full py-6">
          <div className="h-full relative">
            <input
              type="text w-full"
              placeholder="Search order ID"
              className="px-4 py-2 h-full rounded-md border border-gray-500 w-96"
            />

            <FaMagnifyingGlass
              size={20}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </form>
      </div>

      {/* Main section */}
      <div className="bg-gray-50 w-full pb-64 overflow">
        {/* Top section  */}
        <div className="flex flex-row w-full text-center h-16 items-center divide-x divide-gray-400 px-4 sticky top-0 bg-gray-50 z-10 shadow-sm">
          <p className="w-2/6">ID</p>
          <p className="w-1/6">Email</p>
          <p className="w-1/6">Date</p>
          <p className="w-1/6">Status</p>
          <p className="w-1/6">Items</p>
        </div>

        {/* Orders Container  */}
        <div className="w-full h-full px-6 py-8 flex flex-col gap-4 relative">
          <p className="pb-4">Total Items: {ordersList.length}</p>
          {ordersList &&
            ordersList.map((order) => {
              return (
                <IndividualOrder
                  objectId={order._id}
                  key={order.orderId}
                  orderId={order.orderId}
                  orderStatus={order.orderStatus}
                  orderAmount={order.cartProducts.length}
                  paymentId={order.paymentId}
                  orderDate={order.updatedAt}
                  orderName={order.clientInfo.email}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
