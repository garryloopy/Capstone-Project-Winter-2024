"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./Providers";

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
    <header className="md:px-[4rem] px-2 py-[1rem] flex justify-between items-center bg-slate-800 border-b border-gray-600 shadow-md z-10 sticky top-0">
      {/* logo and text */}
      <Link
        className="flex gap-4 justify-center items-center text-white md:w-[30%] w-1/2"
        href="/"
      >
        <div className="">
          <Image
            src="/images/macaroni_shutterstock.jpg"
            alt="logo"
            width={80}
            height={80}
            className="rounded-full border-2 border-orange-400"
          />
        </div>
        <p className="md:text-lg text-sm header-font">
          <span className="lg:text-[40px] text-md text-orange-400">M</span>
          iggy's{" "}
          <span className="lg:text-[40px] text-md text-orange-400">M</span>
          unchies
        </p>
      </Link>

      {/* navbar links */}
      <nav className=" xl:flex hidden justify-center items-center gap-16 text-white mt-16 sm:text-xl text-md ">
        <Navbar />
      </nav>

      {/* cart Icon */}
      <div className="flex gap-6 items-center justify-center">
        {session.status === "authenticated" ? (
          <div className="xl:flex hidden gap-4 text-white lg:text-lg text-md items-center ">
            <div className="font-semibold ">
              <Link href="/menu-list">
                <h2>Hello, {username}</h2>
              </Link>
            </div>
            <div>
              <button
                className="px-2 py-1 border border-gray-400 rounded-md hover:bg-black hover:text-white"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/cart"
            className="relative flex justify-center items-center p-3 rounded-md"
          >
            {cartProducts?.length > 0 && (
              <div className="absolute -top-1 -right-1 text-[.7rem] w-[1.2rem] h-[1.2rem] bg-orange-500 flex items-center justify-center rounded-full">
                <p className="text-center text-white">{cartProducts.length}</p>
              </div>
            )}
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "#F1F0E8" }}
              size="lg"
            />
          </Link>
        )}
        {/* burger menu */}
        <div className="bg-orange-500 rounded-md p-2 xl:hidden flex">
          {toggleMenu ? (
            <button type="button" onClick={handleToggleMenu}>
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                style={{ color: "#F1F0E8" }}
              />
            </button>
          ) : (
            <button type="button" onClick={handleToggleMenu}>
              <FontAwesomeIcon
                icon={faBars}
                size="xl"
                style={{ color: "#F1F0E8" }}
              />
            </button>
          )}
        </div>
        {toggleMenu && <MobileMenu setToggleMenu={setToggleMenu} />}
      </div>
    </header>
  );
}
