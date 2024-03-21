"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";

import OrdersContainer from "../components/OrdersContainer";

import { useEffect, useState } from "react";

const OrdersPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  const [ordersList, setOrdersList] = useState([]);

  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  useEffect(() => {
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
