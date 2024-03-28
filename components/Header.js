"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CiLogout } from "react-icons/ci";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./Providers";

import Logo from "@/public/images/Logo-01.jpg";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const { name } = session?.data?.user || {};
  let username = name;
  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header className="md:px-[4rem] px-2 py-[1rem] flex justify-between items-center z-10 fixed top-0 w-full bg-gray-50 h-32">
      {/* logo and text */}
      <Link
        className="flex justify-center items-center text-slate-700  overflow-hidden rounded-full shadow-md"
        href="/"
      >
        <div className="size-24 bg-gray-600 rounded-full relative">
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
      <div className="flex gap-6 items-center justify-center">
        {session.status === "authenticated" ? (
          <div className="hidden xl:flex flex-row justify-center h-40 gap-6 text-xl text-slate-800 items-center">
            <Link className="font-semibold " href="/menu-list">
              <h2>Hello, {username}</h2>
            </Link>

            <button
              className="px-4 py-2 flex flex-row items-center justify-center gap-4 bg-yellow-400 text-slate-800 font-semibold rounded-md shadow-md"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
              <CiLogout size={24} />
            </button>
          </div>
        ) : (
          <Link
            href="/cart"
            className="relative flex justify-center items-center p-4"
          >
            {cartProducts?.length > 0 && (
              <div className="absolute -top-1 -right-1 size-5 bg-yellow-400 rounded-full grid place-items-center">
                <p className="text-center text-slate-700 text-xs font-semibold">
                  {cartProducts.length}
                </p>
              </div>
            )}
            <FontAwesomeIcon
              className="text-slate-900"
              icon={faCartShopping}
              size="xl"
            />
          </Link>
        )}

        {/* burger menu */}
        <button
          type="button"
          onClick={handleToggleMenu}
          className="bg-yellow-400 size-12 rounded-md shadow-md grid place-items-center xl:hidden ml-4"
        >
          <FontAwesomeIcon
            className="text-slate-800"
            icon={toggleMenu ? faXmark : faBars}
            size="xl"
          />
        </button>
        {toggleMenu && <MobileMenu setToggleMenu={setToggleMenu} />}
      </div>
    </header>
  );
}
