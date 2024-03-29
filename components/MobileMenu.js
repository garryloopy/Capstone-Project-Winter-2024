"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  IoLogOutOutline,
  IoCartOutline,
  IoGridOutline,
  IoChevronDownOutline,
  IoClose,
  IoMenuOutline,
} from "react-icons/io5";

const MobileMenu = ({ setToggleMenu }) => {
  const session = useSession();
  const { name } = session?.data?.user || {};
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  return (
    <div className="fixed top-28 right-0 left-0 bottom-0 xl:hidden bg-gray-50 z-50 h-screen flex flex-col border-t-2 border-slate-2 divide-y">
      <Link
        href="/"
        onClick={() => setToggleMenu(false)}
        className="w-full h-16 grid place-items-center text-slate-800 font-semibold text-xl odd:bg-gray-100 even:bg-gray-50"
      >
        Home
      </Link>
      <Link
        href="/menu"
        onClick={() => setToggleMenu(false)}
        className="w-full h-16 grid place-items-center text-slate-800 font-semibold text-xl odd:bg-gray-100 even:bg-gray-50"
      >
        Menu
      </Link>
      <Link
        href="/contact"
        onClick={() => setToggleMenu(false)}
        className="w-full h-16 grid place-items-center text-slate-800 font-semibold text-xl odd:bg-gray-100 even:bg-gray-50"
      >
        Contact Us
      </Link>

      {session.status === "authenticated" && (
        <div className=" w-full min-h-64 bg-gray-200 p-6 flex flex-col items-center gap-2">
          <h2 className="text-slate-800 font-semibold text-xl border-b-2 w-full md:w-2/3 min-w-60 text-center border-slate-300 pb-1 mb-4">
            Hello, {username}
          </h2>

          <Link
            href="/menu-list"
            className="px-4 py-2 gap-4 h-10 w-full md:w-2/3 flex flex-row items-center justify-center  bg-yellow-400 rounded-md shadow-md"
          >
            <IoGridOutline size={24} />
            Dashboard
          </Link>
          <Link
            href="/cart"
            className="px-4 py-2 gap-4 h-10 w-full md:w-2/3 flex flex-row items-center justify-center bg-yellow-400 rounded-md shadow-md"
          >
            <IoCartOutline size={24} />
            Cart
          </Link>

          <button
            className="px-4 py-2 gap-4 h-12 w-full md:w-2/3 flex flex-row items-center justify-center bg-yellow-400 rounded-md shadow-md"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <IoLogOutOutline size={24} />
            Sign out
          </button>
        </div>
        // <div className="flex flex-col justify-center w-full py-8 gap-2 text-xl text-slate-800 items-center border-2 border-gray-900 odd:bg-gray-100 even:bg-gray-50">
        //   <h2 className="font-semibold border-b-2 w-1/2 min-w-60 text-center border-slate-300 pb-1 mb-4">
        //     Hello, {username}
        //   </h2>

        //   <Link
        //     href="/menu-list"
        //     className="px-4 py-2 gap-4 h-10 w-60 flex flex-row items-center justify-start  bg-yellow-400 rounded-md shadow-md"
        //   >
        //     <IoGridOutline size={24} />
        //     Dashboard
        //   </Link>
        //   <Link
        //     href="/cart"
        //     className="px-4 py-2 gap-4 h-10 w-60 flex flex-row items-center justify-start bg-yellow-400 rounded-md shadow-md"
        //   >
        //     <IoCartOutline size={24} />
        //     Cart
        //   </Link>

        //   <button
        //     className="px-4 py-2 gap-4 h-12 w-60 flex flex-row items-center justify-start bg-yellow-400 rounded-md shadow-md"
        //     onClick={() => signOut({ callbackUrl: "/" })}
        //   >
        //     <IoLogOutOutline size={24} />
        //     Sign out
        //   </button>
        // </div>
      )}
    </div>
  );
};

export default MobileMenu;
