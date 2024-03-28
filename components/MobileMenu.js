"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { CiLogout } from "react-icons/ci";

const MobileMenu = ({ setToggleMenu }) => {
  const session = useSession();
  const { name } = session?.data?.user || {};
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  return (
    <>
      <div className="fixed top-32 right-0 left-0 bottom-0 bg-gray-50 z-50 h-screen flex flex-col border-t-2 border-slate-2 divide-y">
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

        {/* <ul className="flex flex-col text-center w-full text-xl text-orange-300">
          <li className="bg-gray-300 h-14 w-full flex items-center justify-center">
            <Link
              href="/"
              onClick={() => setToggleMenu(false)}
              className="w-full h-full bg-gray-500"
            >
              Home
            </Link>
          </li>

          <li>
            <Link href="/menu" onClick={() => setToggleMenu(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setToggleMenu(false)}>
              Contact Us
            </Link>
          </li>
        </ul> */}

        {session.status === "authenticated" && (
          <div className="flex flex-col justify-center h-40 gap-6 text-xl text-slate-800 items-center odd:bg-gray-100 even:bg-gray-5">
            <Link
              className="font-semibold "
              href="/menu-list"
              onClick={() => setToggleMenu(false)}
            >
              <h2>Hello, {username}</h2>
            </Link>

            <button
              className="px-6 py-2 border flex flex-row items-center justify-center gap-4 bg-yellow-400 text-slate-800 font-semibold rounded-md shadow-md"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
              <CiLogout size={24} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
