import React from 'react'
import Link from "next/link"
import Image from "next/image"
import SubHeader from './SubHeader';

const About = () => {
  return (
    <>
    <SubHeader header2="About Us"/>
      <div className="flex lg:flex-row flex-col justify-evenly gap-10 lg:w-[80%] mx-auto w-full ">
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
                  src="/images/facebook-logo2.png"
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
          <p className="">Our journey began with our newborn, leading me to discover solace 
          and joy in the kitchen during maternity leave amidst the pandemic. What started as 
          a quest to beat boredom evolved into a passion for creating homemade delicacies. 
          Experimenting with recipes became my creative outlet, inspired by the little one 
          who brought newfound purpose into our lives. Encouraged by positive feedback, 
          Miggy’s Munchies was born—a commitment to crafting delicious, heartwarming treats 
          reflecting our family's journey. Each recipe tells a story of quality, authenticity, 
          and innovation. Join us for a flavorful adventure, where every bite embodies love, 
          passion, and creativity.
          </p>
          <div className="flex flex-col items-left mt-10">
            <p>Hours of Operation:</p>
            <ul className="font-bold">
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