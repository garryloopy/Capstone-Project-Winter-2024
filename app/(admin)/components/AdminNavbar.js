"use client";
import React from "react";
import Link from "next/link";
// import { usePathname } from 'next/navigation';

const AdminNavbar = ({ path }) => {
  // const path = usePathname()
  return (
    <div className="flex justify-center items-center gap-4 mt-[8rem] mb-[4rem] text-white text-lg  w-full p-4 font-semibold">
      <Link
        className={path.includes("menu") ? "activeButton" : "inactiveButton"}
        href="/menu-list"
      >
        Menu List
      </Link>
      <Link
        className={path.includes("orders") ? "activeButton" : "inactiveButton"}
        href="/orders"
      >
        Orders
      </Link>

      <Link
        className={
          path.includes("statistic") ? "activeButton" : "inactiveButton"
        }
        href="/statistic"
      >
        Statistic
      </Link>

      <Link
        className={
          path.includes("reminder") ? "activeButton" : "inactiveButton"
        }
        href="/reminder"
      >
        Reminder
      </Link>
    </div>
  );
};

export default AdminNavbar;
