"use client";

import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { TbBrandGoogleMaps } from "react-icons/tb";
import Link from "next/link";
import Image from 'next/image'
import "@/app/globals.css";

export default function Footer() {
  const openGoogleMaps = () => {
    // can be any url so long as it's a valid URL
    const googleMapsUrl =
      "https://www.google.com/maps/place/79+Castleridge+Close+NE,+Calgary,+AB,+Canada";
    window.open(
      googleMapsUrl,
      "_blank",
      "noopener,noreferrer,width=800,height=600"
    );
    // added noopener and noreferrer to the window.open for security measures, just googled it lol
  };
  return (
    <footer className="flex flex-col items-center justify-start pb-4 text-gray-400 bg-miggy">
      <div className="w-full flex  lg:flex-row flex-col justify-center items-center mt-[2rem] py-0 px-[2rem]">
        <div className="flex-1 m-[1rem] lnFont text-center">
          {/* <h1 className="text-white tracking-[0.08em] text-lg mb-[1rem]">
            Find Us
          </h1>
          <p className="text-white lnFont opacity-85">
            79 Castleridge Close NE,
            <br /> Calgary, AB,
            <br />
            Canada
          </p> */}
          <h1 className="text-white tracking-[0.08em] text-lg mb-[1rem]">
          Business Hours
          </h1>
            <ul className="text-white opacity-95">
              <li>Sat: 12:00pm - 8:00pm</li>
              <li>Sun: 12:00pm - 8:00pm</li>
            </ul>
        </div>

        <div className="flex-1 m-[1rem] flex flex-col justify-start items-center">
          {/* text-[#DCCA87]  */}
          <h2 className="text-[2rem] text-yellow-400 mb-[2rem] text-center lnFont">
            Miggy&apos;s Munchies
          </h2>
          <Image
            src="/images/spoon.png"
            alt="spoon"
            width={45}
            height={45}
            style={{ marginTop: 15 }}
          />
          <div className="mt-[1rem] flex">
            <button onClick={openGoogleMaps}>
              <TbBrandGoogleMaps className="text-white m-[.5rem] text-[1.5rem] cursor-pointer hover:text-[#DCCA87]" />
            </button>

            <Link href="https://www.instagram.com/miggysmunchies/">
              <FiInstagram className="text-white m-[.5rem] text-[1.5rem] cursor-pointer hover:text-[#DCCA87]" />
            </Link>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
      {/* <p className="my-[1rem]">
        Copyright ©️ Miggy's Munchies {new Date().getFullYear()}
      </p> */}
      <div className="w-full p-4 my-[1rem] text-center">
        <p className="text-white">
          ©️ {new Date().getFullYear()}{" "}
          <span className="font-bold text-yellow-400">
            Miggy&apos;s Munchies
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
