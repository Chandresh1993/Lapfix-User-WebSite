import React, { useState, useEffect, useRef } from "react";

import img1 from "../../assets/contact-banner.png";
import img2 from "../../assets/events-banner.png";
import img3 from "../../assets/facility-banners.png";

const images = [
  { src: img1, alt: "DLF Golf Country Club" },
  { src: img2, alt: "Eastpoint Golf Club" },
  { src: img3, alt: "Gaekwad Baroda Golf Club" },
];

const transitionDuration = 600; // milliseconds

const SimpleSliderTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const timeoutRef = useRef(null);

  // Clear timeout on unmount or when changing slide
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Automatic slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fadeToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const fadeToNextSlide = () => {
    setFadeIn(false); // start fade out
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFadeIn(true); // fade in new image
    }, transitionDuration);
  };

  const fadeToPrevSlide = () => {
    setFadeIn(false);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFadeIn(true);
    }, transitionDuration);
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    fontSize: 24,
    width: 40,
    height: 40,
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 500,
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <img
        key={currentIndex} // force React to re-render image element on index change
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: fadeIn ? 1 : 0,
          transition: `opacity ${transitionDuration}ms ease-in-out`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Prev Button */}
      <button
        onClick={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          fadeToPrevSlide();
        }}
        style={{ ...buttonStyle, left: 10 }}
        aria-label="Previous Slide"
      >
        ◀
      </button>

      {/* Next Button */}
      <button
        onClick={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          fadeToNextSlide();
        }}
        style={{ ...buttonStyle, right: 10 }}
        aria-label="Next Slide"
      >
        ▶
      </button>
    </div>
  );
};

export default SimpleSliderTest;
