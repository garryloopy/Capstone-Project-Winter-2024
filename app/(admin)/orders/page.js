"use client"

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";

const OrdersPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }
  return (
    <section className="flex flex-col justify-center items-center">
      <AdminNavbar path={path} />
      <SubHeader header2="Orders" />
    </section>
  );
};

export default OrdersPage;
