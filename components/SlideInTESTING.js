// import React, { useState, useEffect } from "react";


// I think i'll omit this for now, getting hydration error
// must be something to do with nesting components
// This is a test component to see if I can animate the About component

// const SlideIn = ({ children }) => {
    
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const element = document.getElementById("slideAnimElement");
//       const elementTop = element.getBoundingClientRect().top;
  
//       if (scrollY > elementTop + windowHeight / 2 && !isVisible) {
//         setIsVisible(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//      // this should handle the repeated event listener
//      // revised: added return statement to remove event listener
        // added isVisible to the dependency array
        
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [isVisible]);

//   return (
//     <div
//       id="slideAnimElement"
//       className={`${isVisible ? "slide-in-left visible" : "slide-in-left"}`}
//     >
//       {children}
//     </div>
//   );
// };

// export default SlideIn;
