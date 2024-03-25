"use client";

import IndividualOrder from "../components/IndividualOrder";

import FilterButton from "../components/FilterButton";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

/**
 * A component that displays, filters, updates, and opens orders based on the passed list array
 * @param {Array} ordersList Orders list array
 * @param {Function} onOrderStatusChange Function handler of when an order status changes within children
 * @returns A container for handling orders
 */
export default function OrdersContainer({ ordersList, onOrderStatusChange }) {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Current search value, string entered though the search bar
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  // Current filter selected. Usually ALL, PENDING, COMPLETED, AND CANCELLED
  const [currentFilter, setCurrentFilter] = useState("ALL");

  // Items to display
  const [displayedItems, setDisplayedItems] = useState([]);

  const [categorizedItems, setCategorizedItems] = useState({});

  // Each time orders list is changed then change displayed items to orders list
  useEffect(() => {
    setDisplayedItems(ordersList);
  }, [ordersList]);

  /**
   * Updates the displayed items.
   * Steps are:
   * 1. Set loader true
   * 2. Filter the current displayed items via the current search value
   * 3. Filter the displayed items to the current filter (ALL, PENDING, COMPLETED, CANCELLED)
   * 4. Set to displayed items to new filtered items
   * 5. Set loader false
   */
  const updateDisplayedItems = () => {
    // Loader state
    setIsLoading(true);

    // Represents new orders to display
    let newOrders = [];

    // Filter current orders with search values
    if (currentSearchValue.length > 0) {
      newOrders = ordersList.filter((order) =>
        order.orderId.toLowerCase().includes(currentSearchValue.toLowerCase())
      );
    } else {
      newOrders = ordersList;
    }

    // Filter items with selected filter
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
    } else if (currentFilter === "IN PROGRESS") {
      newOrders = newOrders.filter(
        (order) => order.orderStatus === "IN PROGRESS"
      );
      setDisplayedItems(newOrders);
    } else {
      // Group displayed items into categories
      const groupedItems = newOrders.reduce((categorizedItems, item) => {
        if (categorizedItems[item.orderStatus] == null)
          categorizedItems[item.orderStatus] = [];

        categorizedItems[item.orderStatus].push(item);

        return categorizedItems;
      }, {});
      setCategorizedItems(groupedItems);
      setDisplayedItems(newOrders);
    }

    // Loader state
    setIsLoading(false);
  };

  // Change displayed items when selected filter and displayed items changes
  useEffect(() => {
    updateDisplayedItems();
  }, [currentFilter, displayedItems]);

  /**
   * Handler for clicking a filter button
   * @param {String} filter The new filter
   */
  const handleOnFilterButtonClick = (filter) => {
    setCurrentFilter(filter);
  };

  /**
   * Handler for for the search bar
   * @param {Event} e The event
   */
  const handleOnSearch = (e) => {
    e.preventDefault();

    updateDisplayedItems();
  };

  /**
   * Handler for change value event on search bar
   * @param {Event} e The event
   */
  const handleOnSearchChange = (e) => {
    const value = e.target.value;
    setCurrentSearchValue(value);
  };

  /**
   * Handler for when an order status changes, usually propagated upwards into the parent component
   * @param {String} orderId The order Id to change
   * @param {String} newStatus The new status
   */
  const handleOnOrderStatusChange = (orderId, newStatus) => {
    if (onOrderStatusChange) onOrderStatusChange(orderId, newStatus);
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
              contents="In Progress"
              filterType="IN PROGRESS"
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
        <div className="flex flex-row w-full text-center h-16 items-center divide-x-2 divide-gray-400 px-4 sticky top-0 bg-gray-50 z-10 shadow-sm">
          <p className="w-2/6 text-gray-950 text-lg">ID</p>
          <p className="w-1/6 text-gray-950 text-lg">Email</p>
          <p className="w-1/6 text-gray-950 text-lg">Date</p>
          <p className="w-1/6 text-gray-950 text-lg">Status</p>
          <p className="w-1/6 text-gray-950 text-lg">Items</p>
        </div>

        {/* Orders Container  */}
        <div className="w-full h-full px-6 py-8 flex flex-col gap-4 relative">
          {displayedItems && (
            <p className="pb-8 text-lg text-gray-500 text-center">
              {displayedItems.length} item
              {displayedItems.length > 1 ? "s" : ""} found in {currentFilter}
            </p>
          )}

          {/* CURRENT FILTER IS NOT "ALL" */}
          {displayedItems &&
            ordersList &&
            currentFilter !== "ALL" &&
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

          {/* CURRENT FILTER IS ALL  */}
          {displayedItems &&
            categorizedItems &&
            ordersList &&
            currentFilter === "ALL" &&
            Object.keys(categorizedItems).map((category) => (
              <div key={category} className="flex flex-col gap-4 mb-12">
                <p className="text-lg text-center text-gray-800">{category}</p>
                <div className="flex flex-col gap-4">
                  {categorizedItems[category].map((order) => {
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

                    const dateTimeFormat = new Intl.DateTimeFormat(
                      "en-US",
                      options
                    );
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
            ))}
        </div>
      </div>
    </div>
  );
}
