"use client"
import React from 'react'
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react';

const MobileMenu = ({setToggleMenu}) => {
  const session = useSession()
   const { name } = session?.data?.user || {};
   let username = name;
   if (username && username.includes(" ")) {
     username = username.split(" ")[0];
   }
  return (
    <>
      <div className="fixed top-[100px] right-0 left-0 bottom-0 bg-black z- 50 h-screen flex flex-col gap-8">
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
          {/* <li>
            <Link href="/about" onClick={() => setToggleMenu(false)}>
              About Us
            </Link>
          </li>
          */}
          <li>
            <Link href="/contact" onClick={() => setToggleMenu(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        {session.status === "authenticated" && (
          <div className="flex flex-col gap-4 text-white lg:text-lg text-md items-center ">
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
        )}
      </div>
    </>
  );
}

export default MobileMenu