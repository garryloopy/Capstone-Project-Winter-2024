"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

import OrdersContainer from "../components/OrdersContainer";

import { useEffect, useState } from "react";

/**
 * An orders page that displays orders
 * @returns An orders page
 */
const OrdersPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Orders list
  const [ordersList, setOrdersList] = useState([]);

  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  useEffect(() => {
    // Set loading
    setIsLoading(true);

    /**
     * Gets the orders list
     */
    async function getOrdersList() {
      try {
        const res = await fetch("/api/getOrderList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });

        if (res.ok) {
          const data = await res.json();

          setOrdersList(data);
        } else {
          console.log("Failed to fetch menu list");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the order list:",
          error
        );
      }
    }
    getOrdersList();

    // Set loading
    setIsLoading(false);
  }, []);

  /**
   * Handler for status changes in order components
   * @param {String} orderId The orderId to change
   * @param {String} newStatus The new order status
   */
  const onOrderStatusChange = (orderId, newStatus) => {
    // Get new orders, change only the ones matching the orderId given.
    const newOrders = ordersList.map((order) => {
      if (order.orderId === orderId) {
        const newOrder = {
          ...order,
          orderStatus: newStatus,
        };

        return newOrder;
      } else {
        return order;
      }
    });

    // Use new orders list as the current order
    // New orders list should propagate through children
    setOrdersList(newOrders);
  };

  return (
    <section className="flex flex-col justify-center items-center px-20">
      <AdminNavbar path={path} />
      <SubHeader header2="Orders" />

      {/* Loader  */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col gap-8 items-center justify-center">
          <TailSpin color="#fb923c" visible={isLoading} />
          <p className="text-xl font-medium text-gray-600">Loading...</p>
        </div>
      )}

      {/* CONTAINER */}
      {status !== "unathenticated" && (
        <OrdersContainer
          ordersList={ordersList}
          onOrderStatusChange={onOrderStatusChange}
        />
      )}
    </section>
  );
};

export default OrdersPage;
