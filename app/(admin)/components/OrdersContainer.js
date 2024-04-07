"use client";

import IndividualOrder from "../components/IndividualOrder";

import FilterButton from "../components/FilterButton";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";

import { IoChevronUp } from "react-icons/io5";

import { useCallback, useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import getFormattedDate from "../utils/getFormattedDate";
import OrderStatus from "./OrderStatus";

import ModalMessage from "./ModalMessage";

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

  //Confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({});

  // Modal message
  const [toggleModal, setToggleModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");

  // Filter states
  const [toggleFilter, setToggleFilter] = useState(false);

  /**
   * Updates the displayed items.
   * Steps are:
   * 1. Set loader true
   * 2. Filter the current displayed items via the current search value
   * 3. Filter the displayed items to the current filter (ALL, PENDING, COMPLETED, CANCELLED)
   * 4. Set to displayed items to new filtered items
   * 5. Set loader false
   */
  const updateDisplayedItems = useCallback(() => {
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
  }, [currentFilter, currentSearchValue, ordersList]);

  // Each time orders list is changed then change displayed items to orders list
  useEffect(() => {
    setDisplayedItems(ordersList);
    updateDisplayedItems();
  }, [ordersList, updateDisplayedItems]);

  // Change displayed items when selected filter and displayed items changes
  useEffect(() => {
    updateDisplayedItems();
  }, [currentFilter, updateDisplayedItems]);

  /**
   * Handler for clicking a filter button
   * @param {String} filter The new filter
   */
  const handleOnFilterButtonClick = (filter) => {
    setCurrentFilter(filter);
    setToggleFilter(false);
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
  const handleOnOrderStatusChange = (orderId, objectId, newStatus) => {
    // Get the order status
    const orderStatus = ordersList.filter(
      (order) => order.orderId === orderId
    )[0].orderStatus;

    // Do nothing if status is the same
    if (orderStatus === newStatus && orderStatus !== "COMPLETED") {
      setToggleModal(true);
      setModalMessage("Order is already marked as " + newStatus);
      setSubMessage("Please select a different status. ");

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
      setSubMessage("The order status can no longer be changed. ");
      setToggleModal(true);
      setIsLoading(false);
      return;
    }

    setConfirmationModal(true);
    setConfirmationData({ orderId, objectId, newStatus });
  };

  /**
   * Handler for when the confirmation modal is agreed
   */
  const handleOnConfirmationAgree = () => {
    if (onOrderStatusChange)
      onOrderStatusChange(
        confirmationData.orderId,
        confirmationData.objectId,
        confirmationData.newStatus
      );
    updateDisplayedItems();
    setConfirmationData({});
    setConfirmationModal(false);
  };

  /**
   * Handler for when the confirmation modal is disagreed
   */
  const handleOnConfirmationDisagree = () => {
    setConfirmationModal(false);
    setConfirmationData({});
  };

  return (
    <div className="min-h-screen w-full bg-neutral-50 mb-8 flex flex-col rounded-xl shadow-md relative">
      {/* Shadow effect  */}
      <div className="absolute inset-10 bg-violet-500/50 -z-10 blur-3xl rounded-lg" />

      {/* Modal message  */}
      <ModalMessage
        message={modalMessage}
        visible={toggleModal}
        subMessage={subMessage}
        onClose={() => setToggleModal(false)}
      />

      {/* Confirmation  */}
      <div
        data-show={confirmationModal}
        onClick={handleOnConfirmationDisagree}
        className="absolute inset-0 z-10 grid place-items-center backdrop-brightness-90 data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div
          className="bg-gray-100 lg:size-[56rem] flex flex-col items-center justify-center gap-5 rounded-lg shadow-md sm:p-12 px-4 py-12 flex-wrap"
          onClick={(ev) => ev.stopPropagation()}
        >
          {confirmationData && (
            <div className="flex flex-row items-center justify-center gap-3 text-xl font-semibold text-gray-800 text-center flex-wrap">
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
              Marking {confirmationData.orderId} as {confirmationData.newStatus}{" "}
              will send a confirmation of email to the customer.
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

      {/* Top section */}
      <div className="flex xl:flex-row flex-col-reverse items-center xl:justify-between justify-center xl:h-24 h-52 w-full px-8 xl:py-0 gap-2 bg-gray-100/75 rounded-t-xl">
        <div className="h-max w-full flex flex-col">
          {/* Larger Devices  */}
          <div className="h-full sm:flex hidden flex-row items-center xl:justify-start justify-center">
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
          </div>

          {/* Smaller devices */}
          <div className="sm:hidden flex items-center justify-center w-full h-24 relative">
            <button
              className="w-48 h-10 bg-yellow-400 font-semibold rounded-3xl relative"
              onClick={() => setToggleFilter(!toggleFilter)}
            >
              {currentFilter}
              <div className="absolute inset-0 flex items-center justify-end px-4">
                <IoChevronUp
                  size={24}
                  className={`${
                    toggleFilter ? "rotate-180" : "rotate-0"
                  } transition-transform duration-100`}
                />
              </div>
            </button>

            <div
              data-show={toggleFilter}
              className="absolute py-4 px-12 w-max gap-2 h-max data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto 
                pointer-events-none opacity-0 bg-gray-50 shadow-lg rounded-lg z-10 top-3 flex flex-col items-center justify-center"
            >
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
            </div>
          </div>
        </div>

        {/* Search  */}
        <form className="h-24 py-6" onSubmit={handleOnSearch}>
          <div className="h-full relative">
            <input
              type="text"
              className="px-4 py-3 h-full rounded-md ring-1 ring-gray-400 w-96 peer bg-gray-100/75 shadow-md outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-300 text-md text-gray-700"
              onChange={handleOnSearchChange}
            />
            <div
              className={`absolute inset-0 flex flex-row justify-between px-2 items-center pointer-events-none peer-focus:-translate-y-6 peer-focus:text-orange-600 text-gray-800 peer-focus:opacity-100 ${
                currentSearchValue.length > 0
                  ? "-translate-y-6 opacity-100 text-orange-600"
                  : "opacity-50"
              } transition-all duration-300`}
            >
              <p className="bg-gray-100 px-2">Search by order id</p>
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
        <div className="xl:flex hidden flex-row w-full text-center h-16 items-center divide-x px-6 divide-gray-300 bg-gray-100/90 border-b text-gray-600 font-semibold text-lg">
          <div className="w-2/6 flex flex-row justify-center items-center gap-4 text-center relative">
            Order ID
            {/* ICON  */}
            <FaQuestion
              size={14}
              className="cursor-pointer text-orange-500 peer transition-opacity opacity-50 hover:opacity-100 duration-500"
            />
            {/* HELP CONTAINER  */}
            <div className="bg-gray-50 rounded-md shadow-md border-2 border-gray-300 absolute w-1/2 top-10 z-10 p-6 text-md font-medium text-gray-700 flex flex-col gap-6 pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-300 peer-hover:delay-100">
              <p>
                Represents the{" "}
                <span className="italic text-orange-500">unique order Id</span>{" "}
                for the order.
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-row justify-center items-center gap-4 text-center relative">
            Email
            {/* ICON  */}
            <FaQuestion
              size={14}
              className="cursor-pointer text-orange-500 peer transition-opacity opacity-50 hover:opacity-100 duration-500"
            />
            {/* HELP CONTAINER  */}
            <div className="bg-gray-50 rounded-md shadow-md border-2 border-gray-300 absolute w-full top-10 z-10 p-6 text-md font-medium text-gray-700 flex flex-col gap-6 pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-300 peer-hover:delay-100">
              <p>
                Represents the{" "}
                <span className="italic text-orange-500">email</span> of the
                customer for the order.
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-row justify-center items-center gap-4 text-center relative">
            Date
            {/* ICON  */}
            <FaQuestion
              size={14}
              className="cursor-pointer text-orange-500 peer transition-opacity opacity-50 hover:opacity-100 duration-500"
            />
            {/* HELP CONTAINER  */}
            <div className="bg-gray-50 rounded-md shadow-md border-2 border-gray-300 absolute w-full top-10 z-10 p-6 text-md font-medium text-gray-700 flex flex-col gap-6 pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-300 peer-hover:delay-100">
              <p>
                Represents the{" "}
                <span className="italic text-orange-500">order date</span> of
                the order.
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-row justify-center items-center gap-4 text-center relative">
            Order Status
            {/* ICON  */}
            <FaQuestion
              size={14}
              className="cursor-pointer text-orange-500 peer transition-opacity opacity-50 hover:opacity-100 duration-500"
            />
            {/* HELP CONTAINER  */}
            <div className="bg-gray-50 rounded-md shadow-md border-2 border-gray-300 absolute w-full top-10 z-10 p-6 text-md font-medium text-gray-700 flex flex-col gap-6 pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-300 peer-hover:delay-100">
              <div>
                Order statuses can 4 have possible states:{" "}
                <span className="bg-green-50 border-green-200 text-green-800 border p-[2px] rounded-md">
                  COMPLETED
                </span>
                ,{" "}
                <span className="bg-blue-50 border-blue-200 text-blue-800 border p-[2px] rounded-md">
                  IN PROGRESS
                </span>
                ,{" "}
                <span className="bg-orange-50 border-orange-200 text-orange-800 border p-[2px] rounded-md">
                  PENDING
                </span>
              </div>
              <p>
                As an order is created, the order will start of with a{" "}
                <span className="bg-orange-50 border-orange-200 text-orange-800 border p-[2px] rounded-md">
                  PENDING
                </span>{" "}
                status.
              </p>
              <p>
                An order status of{" "}
                <span className="bg-green-50 border-blue-200 text-blue-800 border p-[2px] rounded-md">
                  IN PROGRESS
                </span>{" "}
                will send an email to the customer for confirmation and
                acknowledgement.
              </p>
              <p>
                An order status of{" "}
                <span className="bg-green-50 border-green-200 text-green-800 border p-[2px] rounded-md">
                  COMPLETED
                </span>{" "}
                will mark the end of an order and will send an email to the
                customer for confirmation and acknowledgement.
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-row justify-center items-center gap-4 text-center relative">
            Items
            {/* ICON  */}
            <FaQuestion
              size={14}
              className="cursor-pointer text-orange-500 peer transition-opacity opacity-50 hover:opacity-100 duration-500"
            />
            {/* HELP CONTAINER  */}
            <div className="bg-gray-50 rounded-md shadow-md border-2 border-gray-300 absolute w-full top-10 z-10 p-6 text-md font-medium text-gray-700 flex flex-col gap-6 pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-300 peer-hover:delay-100">
              <p>
                Represents the{" "}
                <span className="italic text-orange-500">total item count</span>{" "}
                for the order.
              </p>
            </div>
          </div>
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
          {displayedItems && ordersList && currentFilter !== "ALL"
            ? displayedItems.map((order) => {
                //format the date of order
                const formattedDate = getFormattedDate(order.createdAt);

                return (
                  <IndividualOrder
                    objectId={order._id}
                    key={order._id}
                    orderId={order.orderId}
                    orderStatus={order.orderStatus}
                    orderAmount={order.cartProducts.length}
                    paymentId={order.paymentId}
                    orderDate={formattedDate}
                    orderEmail={order.clientInfo.email}
                    onOrderStatusChange={handleOnOrderStatusChange}
                  />
                );
              })
            : ["PENDING", "IN PROGRESS", "COMPLETED"].map(
                (category) =>
                  categorizedItems[category] && (
                    <div
                      key={category}
                      className="flex flex-col gap-4 mb-12 pb-8"
                    >
                      <p className="text-lg font-semibold text-center text-gray-500 border-b border-gray-300 pb-2">
                        {category}
                      </p>
                      <div className="flex flex-col gap-4">
                        {categorizedItems[category].map((order) => {
                          //format the date of order
                          const formattedDate = getFormattedDate(
                            order.createdAt
                          );

                          return (
                            <IndividualOrder
                              objectId={order._id}
                              key={order.orderId}
                              orderId={order.orderId}
                              orderStatus={order.orderStatus}
                              orderAmount={order.cartProducts.length}
                              paymentId={order.paymentId}
                              orderDate={formattedDate}
                              orderEmail={order.clientInfo.email}
                              onOrderStatusChange={handleOnOrderStatusChange}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )
              )}

          {/* CURRENT FILTER IS ALL  */}
          {/* {displayedItems &&
            categorizedItems &&
            ordersList &&
            currentFilter === "ALL" &&
            ["PENDING", "IN PROGRESS", "COMPLETED", "CANCELLED"].map(
              (category) =>
                categorizedItems[category] ? (
                  <div
                    key={category}
                    className="flex flex-col gap-4 mb-12 pb-8"
                  >
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
                            orderEmail={order.clientInfo.email}
                            onOrderStatusChange={handleOnOrderStatusChange}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )
            )} */}
        </div>
      </div>
    </div>
  );
}
