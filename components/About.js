import React from "react";
import Link from "next/link";
import Image from "next/image";
import SubHeader from "./SubHeader";

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
    <div className="flex flex-col items-center">
      <SubHeader header2="About Us" />
      <div className="flex lg:flex-row flex-col justify-evenly items-center gap-10 lg:w-[80%] mx-auto w-full p-[2rem] ">
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
              {/* adding more comments so I don't forget what I did here
              add OnClick Handler to the logo */}
              <Image
                src="/images/facebook-logo2.png"
                alt="other-logo"
                width={34}
                height={34}
                onClick={openGoogleMaps}
                style={{ cursor: "pointer" }}
                className="logo-animation"
              />
              <Link href="https://www.instagram.com/miggysmunchies/">
                <Image
                  src="/images/instagram-logo.png"
                  alt="instagram-logo"
                  width={40}
                  height={40}
                  className="logo-animation"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full mt-[5rem]">
          <p className="">
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
          <div className="flex flex-col items-left mt-10">
            <p>Hours of Operation:</p>
            <ul className="font-bold">
              <li>Saturday - Sunday: 12:00pm - 8:00pm</li>
              <li>Address: 79 Castleridge Close NE, Calgary, AB, Canada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
