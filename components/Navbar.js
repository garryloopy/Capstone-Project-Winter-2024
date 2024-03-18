"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <>
      <div className="relative flex flex-col items-center">
        <Link href="/">Home</Link>
        <div className={`${path === "/" ? "active" : ""}`}></div>
      </div>

      <div className="relative flex flex-col items-center">
        <Link href="/menu">Menu</Link>
        <div className={`${path === "/menu" ? "active" : ""}`}></div>
      </div>

      {/* <div className="relative flex flex-col items-center">
        <Link href="/about">About Us</Link>

        <div className={`${path === "/about" ? "active" : ""}`}></div>
      </div>
      */}
      <div className="relative flex flex-col justify-center items-center">
        <Link href="/contact">Contact Us</Link>

        <div className={`${path === "/contact" ? "active" : ""}`}></div>
      </div>
    </>
  );
};

export default Navbar;
