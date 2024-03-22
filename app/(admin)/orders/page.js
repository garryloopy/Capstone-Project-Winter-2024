"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

import OrdersContainer from "../components/OrdersContainer";

import { useEffect, useState } from "react";

const OrdersPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const [ordersList, setOrdersList] = useState([]);

  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  useEffect(() => {
    setIsLoading(true);

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

    setIsLoading(false);
  }, []);

  const onOrderStatusChange = (orderId, newStatus) => {
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
    setOrdersList(newOrders);
  };

  return (
    <section className="flex flex-col justify-center items-center px-12">
      <AdminNavbar path={path} />
      <SubHeader header2="Orders" />

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
