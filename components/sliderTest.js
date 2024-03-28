import React, { useEffect, useRef, useState } from "react";

// use whatever images you want but include the path
const imagePaths = [
  "images/gallery01.png", 
  "images/gallery02.png", 
  "images/gallery03.png",
  "images/background.jpg",
  "images/Lord_farquaad.jpg"
];

function Slideshow() {
  const slideshowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      const currentScrollLeft = slideshowRef.current.scrollLeft;
      const slideWidth = slideshowRef.current.offsetWidth;
      const maxScrollLeft = slideshowRef.current.scrollWidth - slideWidth;

      if (currentScrollLeft === maxScrollLeft) {
        slideshowRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slideshowRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
      }
    }, 3000); // --- this is to set the timer (in milliseconds) ---

    return () => clearInterval(slideshowInterval);
  }, []);

  // to make the dots clickable
  const handleOnClick = (index) => {
    setActiveIndex(index);
    slideshowRef.current.scrollTo({
      left: index * slideshowRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="slideshow">
      <div className="slider" ref={slideshowRef}>
        {imagePaths.map((imagePath, index) => (
          <div className="slide" key={index}>
            <img src={imagePath} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div>
        <ul className="slideDots">
          {imagePaths.map((_, index) => (
            <li
              key={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleOnClick(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Slideshow;
