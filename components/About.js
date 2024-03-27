import React from 'react'
import Link from "next/link"
import Image from "next/image"
import SubHeader from './SubHeader';

const About = () => {
  return (
    <>
    <SubHeader header2="About Us"/>
      <div className="flex lg:flex-row flex-col justify-evenly gap-10 lg:w-[80%] mx-auto w-full p-[2rem] ">
        <div>
          <div>
            <Image
              src="/images/macaroni_shutterstock.jpg"
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
                {" "}
                {/* add link to social media */}
                <Image
                  src="/images/onlyfans.png"
                  alt="other-sc-logo"
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
          <p className="p__opensans">
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
              <li>Address: 79 Castleridge Close NE, Calgary, AB, Canada</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default About