"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";


export default function Header() {
  const session = useSession()
   const {name} = session?.data?.user || {};
   let username = name
   if (username && username.includes(" ")) {
     username = username.split(" ")[0];
   }
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleMenu = () => {
      setToggleMenu(!toggleMenu)
    }

    return (
      <header className="md:px-[4rem] px-2 py-[1rem] flex justify-between items-center bg-black/25 border-b border-gray-600 shadow-md z-10 sticky top-0">
        {/* logo and text */}
        <div className="flex gap-4 justify-center items-center text-white md:w-[30%] w-1/2">
          <div className="">
            <Image
              src="/images/logo-01.jpg"
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
        </div>

        {/* navbar links */}
        <nav className=" xl:flex hidden justify-center items-center gap-16 text-white mt-16 sm:text-xl text-md ">
          <Navbar />
        </nav>

        {/* cart Icon */}
        <div className="flex gap-6 items-center justify-center">
          {session.status === "authenticated" ? (
            <div className="xl:flex hidden gap-4 text-white lg:text-lg text-md items-center ">
              <div className="font-semibold ">
                <h2>Hello, {username}</h2>
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
              className="flex flex-col justify-center items-center"
            >
              <span className=" text-white">0</span>
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