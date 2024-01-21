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


export default function Header() {
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
        <nav className=" lg:flex hidden justify-center items-center gap-16 text-white mt-16 sm:text-xl text-md ">
          <Navbar />
        </nav>

        {/* cart Icon */}
        <div className="flex gap-6 items-center">
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
          {/* burger menu */}
          <div className="bg-orange-500 rounded-md p-2 transition-all lg:hidden flex">
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
          {toggleMenu && (
            <MobileMenu setToggleMenu={setToggleMenu}/>
          )}
        </div>
      </header>
    );
}