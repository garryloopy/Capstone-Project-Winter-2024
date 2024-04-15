"use client";
import SubHeader from "@/components/SubHeader";
import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { usePathname } from "next/navigation";
import MenuScroll from "@/components/MenuScroll";

import OrderChart from "./OrderChart";
import ProfitChart from "./ProfitChart";

const statistic = () => {
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
};

export default statistic;
