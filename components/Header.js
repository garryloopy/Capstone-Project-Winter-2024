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
        scrolled && "shadow-lg bg-slate-700"
      }`}
    >
      {/* logo and text */}
      <Link
        className="flex justify-center items-center text-slate-700  overflow-hidden rounded-full shadow-md"
        href="/"
      >
        <div className="sm:size-20 size-12 rounded-full relative">
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
      <div className="flex gap-6 items-center justify-center h-full">
        {session.status === "authenticated" ? (
          <div className="hidden relative lg:flex flex-row justify-center h-full gap-6 items-center">
            <button
              className="font-semibold flex flex-row items-center justify-center gap-3 bg-lime-400 px-6 py-2 rounded-lg shadow-md"
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
                className="relative px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-start bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400 rounded-md shadow-md"
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
              </Link> */}
              <Link
                onClick={handleToggleAdminMenu}
                href="/menu-list"
                className="px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-start  bg-lime-400 hover:bg-yellow-300 active:bg-yellow-400 rounded-md shadow-md"
              >
                <IoGridOutline size={24} />
                Dashboard
              </Link>
              <button
                className="px-4 py-2 gap-4 h-10 w-full flex flex-row items-center justify-start bg-lime-400 hover:bg-yellow-300 active:bg-yellow-400 rounded-md shadow-md"
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
            className="relative hidden lg:flex justify-center items-center p-3"
          >
            {cartProducts?.length > 0 && (
              <div className="absolute top-0 right-0 size-5 bg-yellow-400 rounded-full grid place-items-center">
                <p className="text-center text-slate-700 text-xs font-semibold">
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
          className="bg-yellow-400 size-10 rounded-md shadow-md grid place-items-center lg:hidden"
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
