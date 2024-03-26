"use client";

import IndividualOrder from "../components/IndividualOrder";

import FilterButton from "../components/FilterButton";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import getFormattedDate from "../utils/getFormattedDate";

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
    updateDisplayedItems();
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
  }, [currentFilter]);

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
    <div className="min-h-screen w-full bg-gray-100/90 mb-8 flex flex-col overflow-hidden rounded-md shadow-md">
      {/* Top section */}
      <div className="flex flex-row items-center justify-between h-24 w-full px-8 bg-gray-100/75">
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

        {/* Search  */}
        <form className="h-full py-6" onSubmit={handleOnSearch}>
          <div className="h-full relative">
            <input
              type="text"
              className="px-4 py-3 h-full rounded-md border-2 focus:border-0 border-gray-400 w-96 peer bg-gray-100/75 shadow-md outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-75 text-md text-gray-700"
              onChange={handleOnSearchChange}
            />
            <div
              className={`absolute inset-0 flex flex-row justify-between px-2 items-center pointer-events-none peer-focus:-translate-y-6 peer-focus:text-orange-600 text-gray-800 peer-focus:opacity-100 ${
                currentSearchValue.length > 0
                  ? "-translate-y-6 opacity-100 text-orange-600"
                  : "opacity-50"
              } transition-all duration-300 ease-in-out`}
            >
              <p className="bg-gray-100 px-2">Search order id</p>
            </div>

            <button type="submit" className="text-gray-500">
              <FaMagnifyingGlass
                size={20}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover "
              />
            </button>
          </div>
        </form>
      </div>

      {/* Main section */}
      <div className="w-full pb-64 overflow h-full relative">
        {/* Loading container  */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col gap-8 items-center justify-center">
            <TailSpin color="#fb923c" visible={isLoading} />
            <p className="text-xl font-medium text-gray-600">Loading...</p>
          </div>
        )}

        {/* Top section  */}
        <div className="flex flex-row w-full text-center h-16 items-center divide-x-2 px-6 divide-gray-400 bg-gray-100/90 shadow-md text-gray-600 font-semibold text-lg">
          <p className="w-2/6">ID</p>
          <p className="w-1/6">Email</p>
          <p className="w-1/6">Date</p>
          <p className="w-1/6">Status</p>
          <p className="w-1/6">Items</p>
        </div>

        {/* Orders Container  */}
        <div className="w-full h-full px-6 py-8 flex flex-col gap-8 relative">
          {displayedItems && (
            <p className="pb-8 text-sm font-semibold text-gray-500 text-center">
              {displayedItems.length} item
              {displayedItems.length > 1 ? "s" : ""} found in{" "}
              <span className="text-orange-400">{currentFilter}</span>
            </p>
          )}

          {/* CURRENT FILTER IS NOT "ALL" */}
          {displayedItems &&
            ordersList &&
            currentFilter !== "ALL" &&
            displayedItems.map((order) => {
              //format the date of order
              const formattedDate = getFormattedDate(order.createdAt);

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
              <div key={category} className="flex flex-col gap-4 mb-12 pb-8">
                <p className="text-lg font-semibold text-center text-gray-600 border-b-2 border-gray-300 pb-2">
                  {category}
                </p>
                <div className="flex flex-col gap-4">
                  {categorizedItems[category].map((order) => {
                    //format the date of order
                    const formattedDate = getFormattedDate(order.createdAt);
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
