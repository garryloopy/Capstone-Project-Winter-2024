import React from 'react'
import Link from "next/link"

const MobileMenu = ({setToggleMenu}) => {
  return (
    <div className="absolute top-[100px] right-0 left-0 bg-black z-10 h-screen flex ">
      <ul className="flex flex-col text-center gap-10 mt-[2rem] w-full text-xl text-orange-300 fucus:text-orange-200">
        <li>
          <Link href="/" onClick={() => setToggleMenu(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/menu" onClick={() => setToggleMenu(false)}>
            Menu
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setToggleMenu(false)}>
            About Us
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setToggleMenu(false)}>
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu