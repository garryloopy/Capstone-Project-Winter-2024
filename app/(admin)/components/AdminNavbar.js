"use client";
import React from "react";
import Link from "next/link";
// import { usePathname } from 'next/navigation';

const AdminNavbar = ({ path }) => {
  // const path = usePathname()
  return (
    <div className="flex justify-center items-center gap-4 my-4 mt-[2rem] text-white text-lg">
     
      <div className="relative flex flex-col items-center">
        <Link href="/menu-list">Menu List</Link>
        <div className={`${path === "/menu-list" ? "active" : ""}`}></div>
      </div>
      <div className="relative flex flex-col items-center">
        <Link href="/orders">Orders</Link>
        <div className={`${path === "/orders" ? "active" : ""}`}></div>
      </div>

     
    </div>
  );
};

export default AdminNavbar;
