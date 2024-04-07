import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubHeader from "./SubHeader";
import "@/app/globals.css";

const About = () => {
  // we can use google maps' static API to show just the map image
  // instead of opening a new window to Google Maps

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
    <div className="flex flex-col items-center shadow-2xl backdrop-blur-sm rounded-2xl">
      <h2 className="lnFont text-4xl font-bold text-slate-700 mt-10">About Us</h2>
      {/* <SubHeader header2="About Us" /> */}
      <div className="flex lg:flex-row flex-col justify-evenly items-center gap-10 lg:w-[80%] mx-auto w-full p-[2rem] ">
        <div>
          <div>
            <Image
              src="/images/Logo-01.jpg"
              alt="logo"
              width={400}
              height={400}
              className="rounded-full border-2 border-slate-500"
            />
          </div>
          
        </div>
        <div className="w-full mb-12">
          <p className="leading-8 lnFont font-bold text-slate-700">
            Our journey began with our newborn, leading me to discover solace
            and joy in the kitchen during maternity leave amidst the pandemic.
            What started as a quest to beat boredom evolved into a passion for
            creating homemade delicacies. Experimenting with recipes became my
            creative outlet, inspired by the little one who brought newfound
            purpose into our lives. Encouraged by positive feedback, Miggy’s
            Munchies was born—a commitment to crafting delicious, heartwarming
            treats reflecting our family's journey. Each recipe tells a story of
            quality, authenticity, and innovation. Join us for a flavorful
            adventure, where every bite embodies love, passion, and creativity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
