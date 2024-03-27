
import React from "react";

const SlideContent = ({ imageUrl, slideText }) => {
  return (
    <div className="each-slide-effect">
      <div style={{ backgroundImage: `url(${imageUrl})` }}>
        <span>{slideText}</span>
      </div>
    </div>
  );
};

export default SlideContent;
