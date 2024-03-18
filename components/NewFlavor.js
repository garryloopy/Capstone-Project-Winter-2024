import React from 'react'
import {
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";
import Link from "next/link";

const images = [
  "/images/gallery01.png",
  "/images/gallery02.png",
  "/images/gallery03.png",
];

const NewFlavor = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };
  return (
    <div className="gallery flex justify-center items-center mb-[4rem]">
      <div className="gallery-content">
        <h1 className="headtext__cormorant">Discover New Flavors</h1>
        <p className="text-gray-400 my-[2rem]">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim
        </p>
        <div className="my-[2rem]">
          <Link className="btnStyle" href="/menu">
            Order Now
          </Link>
        </div>
      </div>

      <div className="gallery-images">
        <div className="gallery-images-container" ref={scrollRef}>
          {images.map((image, index) => (
            <div
              className="gallery-images-card flex justify-center items-center"
              key={`gallery_image-${index + 1}`}
            >
              <img src={image} alt="gallery" />
              <p className="gallery-desc">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut
              </p>
            </div>
          ))}
        </div>

        <div className="gallery-images-arrow">
          <BsArrowLeftShort
            className="gallery-arrow-icon"
            onClick={() => scroll("left")}
          />
          <BsArrowRightShort
            className="gallery-arrow-icon"
            onClick={() => scroll("right")}
          />
        </div>
      </div>
    </div>
  );
}

export default NewFlavor