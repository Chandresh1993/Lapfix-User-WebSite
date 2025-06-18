// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import img1 from "../../assets/contact-banner.png";
// import img2 from "../../assets/events-banner.png";
// import img3 from "../../assets/facility-banners.png";

// const images = [
//   { src: img1, alt: "DLF Golf Country Club" },
//   { src: img2, alt: "Eastpoint Golf Club" },
//   { src: img3, alt: "Gaekwad Baroda Golf Club" },
// ];

// const transitionDuration = 500;

// const SimpleSliderTest = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const timeoutRef = useRef(null);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   const startAutoSlide = () => {
//     intervalRef.current = setInterval(() => {
//       if (!isTransitioning) {
//         fadeToNextSlide();
//       }
//     }, 5000);
//   };

//   useEffect(() => {
//     startAutoSlide();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [currentIndex, isTransitioning]);

//   const fadeToNextSlide = () => {
//     setIsTransitioning(true);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       setIsTransitioning(false);
//     }, transitionDuration);
//   };

//   const fadeToPrevSlide = () => {
//     setIsTransitioning(true);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//       setIsTransitioning(false);
//     }, transitionDuration);
//   };

//   const handleSliderHover = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   const handleSliderLeave = () => {
//     startAutoSlide();
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "500px",
//         overflow: "hidden",
//       }}
//       onMouseEnter={handleSliderHover}
//       onMouseLeave={handleSliderLeave}
//     >
//       {images.map((image, index) => (
//         <img
//           key={index}
//           src={image.src}
//           alt={image.alt}
//           loading="lazy"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             opacity: currentIndex === index ? 1 : 0,
//             transition: `opacity ${transitionDuration}ms ease-in-out`,
//             willChange: "opacity",
//           }}
//         />
//       ))}

//       {/* Left Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           if (timeoutRef.current) clearTimeout(timeoutRef.current);
//           fadeToPrevSlide();
//         }}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "20px",
//           transform: "translateY(-50%)",

//           border: "none",
//           borderRadius: "50%",
//           padding: "8px",
//           cursor: "pointer",
//           zIndex: 10,
//           transition: "all 0.3s ease",
//         }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.transform = "translateY(-50%)")
//         }
//         aria-label="Previous Slide"
//       >
//         <ChevronLeft size={32} color="#FFFFFF" />
//       </button>

//       {/* Right Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           if (timeoutRef.current) clearTimeout(timeoutRef.current);
//           fadeToNextSlide();
//         }}
//         style={{
//           position: "absolute",
//           top: "50%",
//           right: "20px",
//           transform: "translateY(-50%)",

//           border: "none",
//           borderRadius: "50%",
//           padding: "8px",
//           cursor: "pointer",
//           zIndex: 10,
//           transition: "all 0.3s ease",
//         }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.transform = "translateY(-50%)")
//         }
//         aria-label="Next Slide"
//       >
//         <ChevronRight size={32} color="#FFFFFF" />
//       </button>
//     </div>
//   );
// };

// export default SimpleSliderTest;

// import React from "react";
// import img1 from "../../assets/Banner.png";

// const Slider = () => {
//   return (
//     <div className="w-full overflow-hidden">
//       <img src={img1} alt="Banner" className="w-full h-auto object-cover" />
//     </div>
//   );
// };

// export default Slider;

import React from "react";

const Slider = () => {
  return <div></div>;
};

export default Slider;
