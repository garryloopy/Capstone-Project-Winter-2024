"use client";

import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import Link from "next/link";

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
    <footer className="bg-slate-700 flex-col flex justify-start items-center text-gray-400 pb-4">
      <div className="w-full flex  lg:flex-row flex-col justify-center items-center mt-[5rem] py-0 px-[2rem]">
        <div className="flex-1 m-[1rem] text-center">
          <h1 className="text-white font-bold tracking-[0.08em] text-lg mb-[1rem]">
            Find Us
          </h1>
          <p className="p__opensans">
            79 Castleridge Close NE, <br /> Calgary, AB, <br />
            Canada
          </p>
        </div>

        <div className="flex-1 m-[1rem] flex flex-col justify-start items-center">
          {/* text-[#DCCA87]  */}
          <h2 className="text-[2rem] text-yellow-400 tilt-neon-miggys mb-[2rem] text-center">
            Miggy's Munchies
          </h2>
          <img
            src="/images/spoon.png"
            alt="spoon"
            className="w-[45px]"
            style={{ marginTop: 15 }}
          />
          <div className="mt-[1rem] flex">
            <button onClick={openGoogleMaps}>
              <FiFacebook className="text-white m-[.5rem] text-[1.5rem] cursor-pointer hover:text-[#DCCA87]" />
            </button>

            <Link href="https://www.instagram.com/miggysmunchies/">
              <FiInstagram className="text-white m-[.5rem] text-[1.5rem] cursor-pointer hover:text-[#DCCA87]" />
            </Link>
          </div>
        </div>

        <div className="flex-1 m-[1rem] pb-4 text-center">
          <h1 className="text-white font-bold tracking-[0.08em] text-lg mb-[1rem]">
            Business Hours
          </h1>
          <p className="p__opensans">
            <ul>
              <li>Sat: 12:00pm - 8:00pm</li>
              <li>Sun: 12:00pm - 8:00pm</li>
            </ul>
          </p>
        </div>
      </div>
      {/* <p className="my-[1rem]">
        Copyright ©️ Miggy's Munchies {new Date().getFullYear()}
      </p> */}
      <div className="w-full p-4 my-[1rem] text-center">
        <p className=" ">
          ©️ {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 tilt-neon-miggys">Miggy's Munchies</span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
