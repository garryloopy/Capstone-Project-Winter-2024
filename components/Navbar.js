"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className=" xl:flex hidden justify-center items-center gap-10 text-slate-800 font-semibold sm:text-2xl text-md ">
      <Link
        href="/"
        className={`hover:opacity-100 transition-opacity duration-500 ${
          path === "/" ? "opacity-100" : "opacity-50"
        }`}
      >
        Home
      </Link>
      <Link
        href="/menu"
        className={`hover:opacity-100 transition-opacity duration-500 ${
          path === "/menu" ? "opacity-100" : "opacity-50"
        }`}
      >
        Menu
      </Link>
      <Link
        href="/contact"
        className={`hover:opacity-100 transition-opacity duration-500 ${
          path === "/contact" ? "opacity-100" : "opacity-50"
        }`}
      >
        Contact us
      </Link>
    </nav>
  );
};

export default Navbar;
