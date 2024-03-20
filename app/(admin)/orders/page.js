"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const OrdersPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  const [currentFilter, setCurrentFilter] = useState("ALL");

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  const handleOnFilterButtonClick = (filter) => {
    setCurrentFilter(filter);
  };

  const FilterButton = ({ contents, filterType }) => {
    return (
      <button
        className={`text-lg font-medium ${
          currentFilter === filterType
            ? "text-orange-600 border-b-2 border-orange-600"
            : "text-gray-800"
        }`}
        onClick={() => handleOnFilterButtonClick(filterType)}
      >
        {contents}
      </button>
    );
  };
  return (
    <section className="flex flex-col justify-center items-center px-12">
      <AdminNavbar path={path} />
      <SubHeader header2="Orders" />

      {/* CONTAINER */}
      <div className="h-screen w-full bg-gray-50/50 mb-8 overflow-auto flex flex-col">
        {/* Top section */}
        <div className="flex flex-row items-center justify-between h-16 w-full px-8">
          <div className="h-full flex flex-row items-center gap-4">
            <FilterButton contents="All" filterType="ALL" />
            <FilterButton contents="Pending" filterType="PENDING" />
            <FilterButton contents="Completed" filterType="COMPLETED" />
            <FilterButton contents="Cancelled" filterType="CANCELLED" />
          </div>

          <form className="h-full py-3">
            <div className="h-full relative">
              <input
                type="text w-full"
                placeholder="Search order"
                className="px-4 h-full rounded-md border border-gray-500 w-96"
              />
              <FaMagnifyingGlass
                size={20}
                className="absolute top-[0.65rem] right-2 text-gray-600"
              />
            </div>
          </form>
        </div>

        {/* Main section */}
        <div className="bg-gray-100 w-full h-full overflow-auto">
          <div className="flex flex-row w-full text-center">
            <p className="w-1/6">ID</p>
            <p className="w-1/6">Name</p>
            <p className="w-1/6">Date</p>
            <p className="w-1/6">Status</p>
            <p className="w-2/6">Amount</p>
          </div>
          <div className="w-full">
            <div className="w-full min-h-15 flex flex-row text-center">
              <p className="w-1/6 overflow-auto">gfuhadsighdsfighadighil</p>
              <p className="w-1/6 overflow-auto">Name</p>
              <p className="w-1/6 overflow-auto">Date</p>
              <p className="w-1/6 overflow-auto">Status</p>
              <p className="w-2/6 overflow-auto">Amount</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
