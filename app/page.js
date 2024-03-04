"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AdminModal from "./(admin)/components/AdminModal";
export default function HomePage() {
  return (
    <section className="md:px-[4rem] px-[2rem] py-[2rem] text-white flex flex-col items-center justify-center my-[6rem]">
      <div className="flex lg:flex-row flex-col justify-evenly gap-10 lg:w-[80%] mx-auto w-full ">
        <div>
          <div>
            <Image
              src="/images/Logo-02.jpg"
              alt="logo"
              width={400}
              height={400}
              className="rounded-full border-2 border-orange-400"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="mt-[2rem] mb-3 text-lg">Follow us on:</p>

            <div className="flex gap-4 items-center">
              <Link href="">
                <Image
                  src="/images/facebook-logo2.png"
                  alt="facebook-logo"
                  width={34}
                  height={34}
                />
              </Link>
              <Link href="https://www.instagram.com/miggysmunchies/">
                <Image
                  src="/images/instagram-logo.png"
                  alt="facebook-logo"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full mt-[5rem]">
          <p className="">--About Us will be displayed here--</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex flex-col items-left mt-4">
            <p>Hours of Operation:</p>
            <ul>
              <li>Saturday - Sunday: 12:00pm - 8:00pm</li>
              <li>Address: 123 AddressHere NE, Calgary, AB, Canada</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
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
