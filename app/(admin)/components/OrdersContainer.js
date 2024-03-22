"use client";

import IndividualOrder from "../components/IndividualOrder";

import FilterButton from "../components/FilterButton";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

export default function OrdersContainer({ ordersList, onOrderStatusChange }) {
  const [isLoading, setIsLoading] = useState(false);

  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("ALL");

  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    setDisplayedItems(ordersList);
  }, [ordersList]);

  const updateDisplayedItems = () => {
    setIsLoading(true);

    let newOrders = [];
    if (currentSearchValue.length > 0) {
      newOrders = ordersList.filter((order) =>
        order.orderId.toLowerCase().includes(currentSearchValue.toLowerCase())
      );
    } else {
      newOrders = ordersList;
    }

    if (currentFilter === "PENDING") {
      newOrders = newOrders.filter((order) => order.orderStatus === "PENDING");
      setDisplayedItems(newOrders);
    } else if (currentFilter === "CANCELLED") {
      newOrders = newOrders.filter(
        (order) => order.orderStatus === "CANCELLED"
      );
      setDisplayedItems(newOrders);
    } else if (currentFilter === "COMPLETED") {
      newOrders = newOrders.filter(
        (order) => order.orderStatus === "COMPLETED"
      );

      setDisplayedItems(newOrders);
    } else {
      setDisplayedItems(newOrders);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateDisplayedItems();
  }, [currentFilter]);

  const handleOnFilterButtonClick = (filter) => {
    setCurrentFilter(filter);
  };

  const handleOnSearch = (e) => {
    e.preventDefault();

    updateDisplayedItems();
  };

  const handleOnSearchChange = (e) => {
    const value = e.target.value;
    setCurrentSearchValue(value);
  };

  const handleOnOrderStatusChange = (orderId, newStatus) => {
    onOrderStatusChange(orderId, newStatus);
    updateDisplayedItems();
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
              onFilterButtonClick={handleOnFilterButtonClick}
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

        <form className="h-full py-6" onSubmit={handleOnSearch}>
          <div className="h-full relative">
            <input
              type="text"
              placeholder="Search order ID"
              className="px-4 py-2 h-full rounded-md border border-gray-500 w-96"
              onChange={handleOnSearchChange}
            />
            <button type="submit">
              <FaMagnifyingGlass
                size={20}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover"
              />
            </button>
          </div>
        </form>
      </div>

      {/* Main section */}
      <div className="bg-gray-50 w-full pb-64 overflow h-full relative">
        {/* Loading container  */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col gap-8 items-center justify-center">
            <TailSpin color="#fb923c" visible={isLoading} />
            <p className="text-xl font-medium text-gray-600">Loading...</p>
          </div>
        )}

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
          {displayedItems && (
            <p className="pb-4">
              {displayedItems.length} item
              {displayedItems.length > 1 ? "s" : ""} found in {currentFilter}
            </p>
          )}
          {displayedItems &&
            ordersList &&
            displayedItems.map((order) => {
              //format the date of order
              const createdAtDate = new Date(order.createdAt);

              const options = {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              };

              const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
              const formattedDate = dateTimeFormat.format(createdAtDate);
              return (
                <IndividualOrder
                  objectId={order._id}
                  key={order.orderId}
                  orderId={order.orderId}
                  orderStatus={order.orderStatus}
                  orderAmount={order.cartProducts.length}
                  paymentId={order.paymentId}
                  orderDate={formattedDate}
                  orderName={order.clientInfo.email}
                  onOrderStatusChange={handleOnOrderStatusChange}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
