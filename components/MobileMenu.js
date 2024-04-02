"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./Providers";

import {
  IoLogOutOutline,
  IoCartOutline,
  IoGridOutline,
  IoHomeOutline,
  IoFastFoodOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const MobileMenu = ({ setToggleMenu }) => {
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const path = usePathname();
  const { name } = session?.data?.user || {};
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  return (
    <div className="absolute top-28 right-0 left-0 lg:hidden h-max bg-gray-50 z-50 flex flex-col gap-4 border-y-2 border-slate-200 shadow-md p-2 pb-4">
      {/* Container  */}
      <div className="w-full h-max rounded-md overflow-hidden flex flex-col gap-2 bg-gray-400/50 p-4">
        <Link
          href="/"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg hover:bg-yellow-300 active:bg-yellow-400 ${
            path === "/" ? "opacity-100" : " opacity-85"
          }`}
        >
          <IoHomeOutline size={24} />
          Home
        </Link>
        <Link
          href="/menu"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg hover:bg-yellow-300 active:bg-yellow-400 ${
            path === "/menu" ? "opacity-100" : " opacity-85"
          }`}
        >
          <IoFastFoodOutline size={24} />
          Menu
        </Link>
        <Link
          href="/contact"
          onClick={() => setToggleMenu(false)}
          className={`w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg hover:bg-yellow-300 active:bg-yellow-400 ${
            path === "/contact" ? "opacity-100" : " opacity-85"
          }`}
        >
          <IoMailOpenOutline size={24} />
          Contact us
        </Link>
        <Link
          href="/cart"
          onClick={() => setToggleMenu(false)}
          className={`relative w-full h-12 flex items-center justify-center gap-3 text-slate-800 font-semibold text-xl bg-yellow-400 rounded-lg hover:bg-yellow-300 active:bg-yellow-400 ${
            path === "/cart" ? "opacity-100" : " opacity-85"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-end px-4 pointer-events-none">
            {cartProducts?.length > 0 && (
              <p className="bg-violet-600 size-6 grid place-items-center text-xs rounded-full text-gray-50">
                {cartProducts?.length}
              </p>
            )}
          </div>
          <IoCartOutline size={24} />
          Cart
        </Link>
      </div>
      {session.status === "authenticated" && (
        <div className="w-full h-max rounded-md overflow-hidden flex flex-col gap-2 bg-gray-400/50 p-4">
          <div className=" w-full h-full flex flex-col items-center gap-2">
            <h2 className="text-gray-800 font-semibold text-xl border-b w-full text-center border-slate-400 pb-1 mb-4">
              Hello, {username}
            </h2>

            <Link
              href="/menu-list"
              onClick={() => setToggleMenu(false)}
              className="px-4 py-2 gap-4 h-12 w-full flex flex-row items-center text-slate-800 font-semibold text-xl justify-center  bg-yellow-400 rounded-md shadow-md hover:bg-yellow-300 active:bg-yellow-400 "
            >
              <IoGridOutline size={24} />
              Dashboard
            </Link>

            <button
              className="px-4 py-2 gap-4 h-12 w-full flex flex-row items-center text-slate-800 font-semibold text-xl justify-center bg-yellow-400 rounded-md shadow-md hover:bg-yellow-300 active:bg-yellow-400 "
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
