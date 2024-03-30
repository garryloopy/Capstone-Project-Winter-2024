"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  IoLogOutOutline,
  IoCartOutline,
  IoGridOutline,
  IoHomeOutline,
  IoFastFoodOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
import { usePathname } from "next/navigation";

const MobileMenu = ({ setToggleMenu }) => {
  const session = useSession();
  const path = usePathname();
  const { name } = session?.data?.user || {};
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  return (
    <div className="absolute top-28 right-0 left-0 lg:hidden h-max bg-slate-800 z-50 flex flex-col gap-8 border-t-2 border-slate-2 shadow-md p-2 pb-4">
      {/* Container  */}
      <div className="w-full h-max rounded-md overflow-hidden flex flex-col gap-2 bg-gray-600/50 p-4">
        <Link
          href="/"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg ${
            path === "/" ? "opacity-100" : " opacity-75"
          }`}
        >
          <IoHomeOutline size={24} />
          Home
        </Link>
        <Link
          href="/menu"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg ${
            path === "/menu" ? "opacity-100" : " opacity-75"
          }`}
        >
          <IoFastFoodOutline size={24} />
          Menu
        </Link>
        <Link
          href="/contact"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg ${
            path === "/contact" ? "opacity-100" : " opacity-75"
          }`}
        >
          <IoMailOpenOutline size={24} />
          Contact us
        </Link>
      </div>
      {session.status === "authenticated" && (
        <div className="w-full h-max rounded-md overflow-hidden flex flex-col gap-2 bg-gray-600/50 p-4">
          <div className=" w-full h-full flex flex-col items-center gap-2 pt-8">
            <h2 className="text-gray-50 font-semibold text-xl border-b w-full text-center border-slate-300 pb-1 mb-4">
              Hello, {username}
            </h2>

            <Link
              href="/menu-list"
              onClick={() => setToggleMenu(false)}
              className="px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-center  bg-yellow-400 rounded-md shadow-md"
            >
              <IoGridOutline size={24} />
              Dashboard
            </Link>
            <Link
              href="/cart"
              onClick={() => setToggleMenu(false)}
              className="px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-center bg-yellow-400 rounded-md shadow-md"
            >
              <IoCartOutline size={24} />
              Cart
            </Link>

            <button
              className="px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-center bg-yellow-400 rounded-md shadow-md"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <IoLogOutOutline size={24} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
