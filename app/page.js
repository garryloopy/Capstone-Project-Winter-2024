"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import AdminModal from "./(admin)/components/AdminModal";
export default function HomePage() {
  

  
  return (
    <section className="md:px-[4rem] px-[2rem] py-[2rem] text-white flex flex-col items-center justify-center my-[6rem]">
      <div className="flex lg:flex-row flex-col items-center justify-evenly gap-10 lg:w-[80%] mx-auto w-full ">
        <div>
          <Image
            src="/images/Logo-02.jpg"
            alt="logo"
            width={400}
            height={400}
            className="rounded-full border-2 border-orange-400"
          />
        </div>
        <div>
          <Image
            src="/images/facebook-logo.png"
            alt="facebook-logo"
          />
        </div>
        <div className="w-full">
          <p className="">
            --About Us will be displayed here--
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="mt-[6rem]">
        <Link className="btnStyle" href="/menu">
          Order Now
        </Link>
      </div>

      <div>
       
          <AdminModal />
      </div>
    </section>
  );
}
