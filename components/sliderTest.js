import React, { useEffect, useRef, useState } from "react";

// use whatever images you want but include the path
const imagePaths = [
  "images/gallery01.png",
  "images/gallery02.png",
  "images/gallery03.png",
  "images/background.jpg",
  "images/Lord_farquaad.jpg",
];

function Slideshow() {
  const [slider, setSlider] = useState(0);

  // const slideshowRef = useRef(null);
  // const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const slideshowInterval = setInterval(() => {
  //     const currentScrollLeft = slideshowRef.current.scrollLeft;
  //     const slideWidth = slideshowRef.current.offsetWidth;
  //     const maxScrollLeft = slideshowRef.current.scrollWidth - slideWidth;

  //     if (currentScrollLeft === maxScrollLeft) {
  //       slideshowRef.current.scrollTo({ left: 0, behavior: "smooth" });
  //     } else {
  //       slideshowRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
  //     }
  //   }, 3000); // --- this is to set the timer (in milliseconds) ---

  //   return () => clearInterval(slideshowInterval);
  // }, []);

  // other way: use setTimeout
  const nextSlide = () => {
    setSlider(slider === imagePaths.length - 1 ? 0 : slider + 1);
  };
  useEffect(() => {
      setTimeout(() => {
        nextSlide();
      }, 3000);
  }, [nextSlide]);

 

  // to make the dots clickable
  // const handleOnClick = (index) => {
  //   setActiveIndex(index);
  //   slideshowRef.current.scrollTo({
  //     left: index * slideshowRef.current.offsetWidth,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="slideshow">
      <div className="slider">
        {imagePaths.map((imagePath, index) => (
          <div
            className={slider === index ? "slide" : "slide slide-hidden"}
            key={index}
          >
            <img src={imagePath} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {imagePaths.map((_, index) => (
          <div
            key={index}
            className={
              slider === index ? "slideshowDot" : "slideshowDot activeDot"
            }
            onClick={() => setSlider(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
