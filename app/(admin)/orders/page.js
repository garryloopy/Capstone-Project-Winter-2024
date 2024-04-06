"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

import Loading from "@/components/Loading";

import OrdersContainer from "../components/OrdersContainer";

import { useEffect, useState } from "react";
import MenuScroll from "@/components/MenuScroll";

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

  const handleCompletedOrderEmail = async (paymentId) => {
    const res = await fetch("/api/email/sendOrderCompletion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: paymentId,
      }),
    });
    if (!res.ok) console.log("Failed to send email");
  };

  const handleInProgressOrderEmail = async (paymentId) => {
    const res = await fetch("/api/email/sendOrderInProgress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: paymentId,
      }),
    });
    if (!res.ok) console.log("Failed to send in progress email");
  };

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
   * @param {String} objectId The object id to change
   * @param {String} newStatus The new order status
   */
  const onOrderStatusChange = async (orderId, objectId, newStatus) => {
    try {
      // Change order status within the server
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

      if (response.ok && newStatus === "COMPLETED") {
        // Get payment id of the order
        const paymentId = ordersList.filter(
          (currentOrder) => currentOrder.orderId === orderId
        )[0].paymentId;

        await handleCompletedOrderEmail(paymentId);
      } else if (response.ok && newStatus === "IN PROGRESS") {
        // Get payment id of the order
        const paymentId = ordersList.filter(
          (currentOrder) => currentOrder.orderId === orderId
        )[0].paymentId;

        await handleInProgressOrderEmail(paymentId);
      }
    } catch (error) {
      console.error("An error occurred while updating order status:", error);
    }
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
    <>
      <MenuScroll />
      <section className="flex flex-col justify-center items-center md:p-[6rem] p-4">
        <AdminNavbar path={path} />
        <SubHeader header2="Orders" />

        {/* Loader  */}
        <Loading isLoading={isLoading} />

        {/* CONTAINER */}
        {status !== "unauthenticated" && (
          <OrdersContainer
            ordersList={ordersList}
            onOrderStatusChange={onOrderStatusChange}
          />
        )}
      </section>
    </>
  );
};

export default OrdersPage;
