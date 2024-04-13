"use client";
import SubHeader from "@/components/SubHeader";
import React, { useEffect, useState, Component } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import MenuForm from "../components/MenuForm";
import toast, { Toaster } from "react-hot-toast";
import SingleMenu from "../components/SingleMenu";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { withSwal } from "react-sweetalert2";
import { deletePhoto } from "@/actions/uploadImage";
import MenuScroll from "@/components/MenuScroll";

import OrderChart from "./OrderChart";
import ProfitChart from "./ProfitChart";

import DateRange from "./DateRange";

export default function statistic() {
  const path = usePathname();

  const [selectedChart, setSelectedChart] = useState("OrderChart");

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <>
      <MenuScroll />
      <section className="flex flex-col justify-center items-center md:p-[6rem] p-4">
        <AdminNavbar path={path} />
        <SubHeader header2="Statistic" />

        {/* Chart selector */}
        <div>
          <select
            id="chartSelector"
            value={selectedChart}
            onChange={handleChartChange}
          >
            <option value="OrderChart">Order Chart</option>
            <option value="ProfitChart">Profit Chart</option>
          </select>
        </div>

        {/* Render selected chart */}
        <div style={{ width: "70%", height: "500" }}>
          {selectedChart === "OrderChart" && <OrderChart />}
        </div>
        <div style={{ width: "70%", height: "500" }}>
          {selectedChart === "ProfitChart" && <ProfitChart />}
        </div>
      </section>
    </>
  );
}
