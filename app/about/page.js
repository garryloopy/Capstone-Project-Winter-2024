import React from "react";

const AboutPage = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center justify-evenly gap-10 lg:w-[80%] mx-auto w-full ">
      <p>AboutPage</p>
      <p>Development Team: </p>
      <ul className="text-white text-center">
        <li>
          Garry Jr Dayag (Main Developer - Front-end) | Email:
          garryjr.dayag@edu.sait.ca
        </li>
      </ul>
      <ul className="text-white text-center">
        <li>
          Rimon Alqoshi (Main Developer - Back-end) | Email:
          rimon.alqoshi@edu.sait.ca
        </li>
      </ul>
      <ul className="text-white text-center">
        <li>
          Edward Montilla (UI/UX Designer) | Email: edward.montilla@edu.sait.ca
        </li>
      </ul>
      <ul className="text-white text-center">
        <li>
          Kevin Wong (Associate Developer) | Email: homingkevin.wong@edu.sait.ca
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
