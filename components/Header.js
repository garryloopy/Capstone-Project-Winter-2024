"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

import {
  IoLogOutOutline,
  IoCartOutline,
  IoGridOutline,
  IoChevronDownOutline,
  IoClose,
  IoMenuOutline,
} from "react-icons/io5";
import { useContext, useState } from "react";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./Providers";

import Logo from "@/public/images/Logo-01.jpg";
import { usePathname } from "next/navigation";
import { useScrollTop } from "@/app/hooks/use-scroll-top";

export default function Header() {
  const path = usePathname();

  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const { name } = session?.data?.user || {};
  const scrolled = useScrollTop();
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  const [toggleMenu, setToggleMenu] = useState(false);

  const [toggleAdminMenu, setToggleAdminMenu] = useState(false);

  const handleToggleAdminMenu = () => {
    setToggleAdminMenu(!toggleAdminMenu);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header
      data-scrolled={scrolled}
      className={`md:px-[4rem] z-50 fixed sm:px-2 sm:py-[1rem] px-6 flex justify-between items-center w-full bg-inherit sm:h-28 h-20 transition-all duration-500 ease-in-out  ${
        scrolled && "shadow-lg bg-miggy"
      }`}
    >
      {/* logo and text */}
      <Link
        className="flex items-center justify-center overflow-hidden rounded-full shadow-md text-slate-700"
        href="/"
      >
        <div className="relative rounded-full sm:size-20 size-12">
          <Image
            src={Logo}
            alt="Miggy's Munchies logo"
            fill={true}
            sizes="(max-width: 1024px) 50vw, (max-width: 768px) 80vw, 1200px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* navbar links */}
      <Navbar />

      {/* cart Icon */}
      <div className="flex items-center justify-center h-full gap-6">
        {session.status === "authenticated" ? (
          <div className="relative flex-row items-center justify-center hidden h-full gap-6 lg:flex">
            <button
              className="flex flex-row items-center justify-center gap-3 px-6 py-2 font-semibold bg-yellow-400 rounded-lg shadow-md"
              onClick={handleToggleAdminMenu}
            >
              <h2 className="text-md text-slate-800">Hello, {username}</h2>
              <IoChevronDownOutline
                size={20}
                className={`${
                  toggleAdminMenu && "rotate-180"
                } transition-transform duration-300 ease-in-out`}
              />
            </button>
            {/* Admin options  */}
            <div
              className={`absolute ${
                toggleAdminMenu
                  ? "opacity-100 pointer-events-auto"
                  : "pointer-events-none"
              } transition-opacity duration-300 opacity-0 top-16 right-0 bg-gray-50 min-w-64 flex flex-col gap-2 p-5 shadow-lg text-sm text-slate-800 font-semibold border-slate-200 border-2 rounded-lg z-50`}
            >
              {/* <Link
                onClick={handleToggleAdminMenu}
                href="/cart"
                className="relative flex flex-row items-center justify-start w-full h-10 gap-4 px-4 py-2 bg-yellow-400 rounded-md shadow-md hover:bg-yellow-300 active:bg-yellow-400"
              >
                <div className="absolute inset-0 flex items-center justify-end px-4 pointer-events-none">
                  {cartProducts?.length > 0 && (
                    <p className="grid text-xs rounded-full bg-violet-600 size-6 place-items-center text-gray-50">
                      {cartProducts?.length}
                    </p>
                  )}
                </div>
                <IoCartOutline size={24} />
                Cart
              </Link> */}
              <Link
                onClick={handleToggleAdminMenu}
                href="/menu-list"
                className="flex flex-row items-center justify-start w-full h-10 gap-4 px-4 py-2 bg-yellow-400 rounded-md shadow-md hover:bg-lime-300 active:bg-lime-400"
              >
                <IoGridOutline size={24} />
                Dashboard
              </Link>
              <button
                className="flex flex-row items-center justify-start w-full h-10 gap-4 px-4 py-2 bg-yellow-400 rounded-md shadow-md hover:bg-lime-300 active:bg-lime-400"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <IoLogOutOutline size={24} />
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/cart"
            className="relative items-center justify-center hidden p-3 lg:flex"
          >
            {cartProducts?.length > 0 && (
              <div className="absolute top-0 right-0 grid bg-yellow-400 rounded-full size-5 place-items-center">
                <p className="text-xs font-semibold text-center text-slate-700">
                  {cartProducts.length}
                </p>
              </div>
            )}
            <IoCartOutline
              className={scrolled ? "text-white" : "text-slate-900"}
              size={30}
            />
          </Link>
        )}

        {/* burger menu */}
        <button
          type="button"
          onClick={handleToggleMenu}
          className="grid bg-yellow-400 rounded-md shadow-md size-10 place-items-center lg:hidden"
        >
          {toggleMenu ? (
            <IoClose size={28} className="text-slate-800" />
          ) : (
            <IoMenuOutline size={28} className="text-slate-800" />
          )}
        </button>
        {toggleMenu && <MobileMenu setToggleMenu={setToggleMenu} />}
      </div>
    </header>
  );
}
