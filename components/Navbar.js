"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollTop } from "@/app/hooks/use-scroll-top";

const Navbar = () => {
  const path = usePathname();
  const scrolled = useScrollTop();

  return (
    <nav
      className={`lg:flex hidden justify-center items-center font-semibold text-md `}
    >
      <Link
        href="/"
        data-scrolled={scrolled}
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-70 data-[scrolled=true]:text-white"
        }`}
      >
        Home
      </Link>
      <Link
        href="/menu"
        data-scrolled={scrolled}
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/menu"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-70 data-[scrolled=true]:text-white"
        }`}
      >
        Menu
      </Link>
      <Link
        href="/contact"
        data-scrolled={scrolled}
        className={`hover:opacity-100 transition-opacity duration-500 min-w-40 py-2 grid place-items-center ${
          path === "/contact"
            ? "opacity-100 bg-yellow-400 rounded-3xl shadow-md"
            : "opacity-70 data-[scrolled=true]:text-white"
        }`}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default Navbar;
