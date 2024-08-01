/*

Carousel.jsx

Displays given data in a web carousel.
Code from CodeCompleteYT - https://github.com/CodeCompleteYT/react-image-carousel

Calls:
Called In: Recommendations

*/

import React, { useState } from "react";
import "./Carousel.css";

function Carousel (props) {
    const data = props.data
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <span class="material-symbols-outlined" onClick={prevSlide}
        id="arrow-left">arrow_back_ios</span>
      {data.map((item, idx) => {
        return (
            <div style={{backgroundImage: `url(${item.src})`}} key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}>
                <caption className="slide-caption">
                    <h2 className="slide-title">{item.name}</h2>
                </caption>
            </div>
        );
      })}
      <span class="material-symbols-outlined" onClick={nextSlide}
        id="arrow-right">arrow_forward_ios</span>
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel