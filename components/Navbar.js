"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollTop } from "@/app/hooks/use-scroll-top";

const Navbar = () => {
  const path = usePathname();
  const scrolled = useScrollTop()

  return (
    <nav
      className={`lg:flex hidden justify-center items-center font-semibold text-md ${
        scrolled ? "text-white" : "text-slate-800 "
      }`}
    >
      <Link
        href="/"
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-50"
        }`}
      >
        Home
      </Link>
      <Link
        href="/menu"
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/menu"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-50"
        }`}
      >
        Menu
      </Link>
      <Link
        href="/contact"
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/contact"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-50"
        }`}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default Navbar;
