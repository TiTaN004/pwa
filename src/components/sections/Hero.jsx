
// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import model from "../../assets/model1.png";
// import bg from "../../assets/bg.png";
// import { Button } from "@material-tailwind/react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { Link } from "react-router-dom";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import img1 from "../../assets/slider/001.webp";
// import img2 from "../../assets/slider/002.webp";
// import img3 from "../../assets/slider/003.webp";
// import img4 from "../../assets/slider/004.webp";
// import img5 from "../../assets/slider/005.webp";
// import img6 from "../../assets/slider/006.webp";
// import img7 from "../../assets/slider/007.webp";
// import img8 from "../../assets/slider/008.webp"; // Uncomment if needed
// import img9 from "../../assets/slider/009.webp"; // Uncomment if needed
// import img10 from "../../assets/slider/010.webp"; // Uncomment if needed

// const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]; // Add more images here

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// export default function Hero({
//   onImageChange,
//   enableAutoPlay,
//   autoChangeInterval = 4000,
// }) {
//   // const containerRef = useRef(null);
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const btnRef = useRef(null);


//   const sectionRef = useRef(null);
//   const imgContainerRef = useRef(null);
//   const textRef = useRef(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const intervalRef = useRef(null);
//   const animationRef = useRef(null);
//   const isInViewRef = useRef(false);

//   // const enableAutoPlay = true; // Enable auto-play by default
//   const [isPlaying, setIsPlaying] = useState(enableAutoPlay);

//   // Generate stable unique ID for this component instance
//   const componentId = useMemo(
//     () => `tile-section-${Math.random().toString(36).substr(2, 9)}`,
//     []
//   );

//   // Validate images prop
//   const validImages = useMemo(() => {
//     if (!Array.isArray(images) || images.length === 0) {
//       console.warn("TileTypeSection: images prop should be a non-empty array");
//       return [];
//     }
//     return images.filter((img) => typeof img === "string" && img.trim() !== "");
//   }, [images]);

//   // Preload images for better performance
//   useEffect(() => {
//     if (validImages.length === 0) return;

//     let loadedCount = 0;
//     const totalImages = validImages.length;

//     const checkAllLoaded = () => {
//       loadedCount++;
//       if (loadedCount === totalImages) {
//         setImagesLoaded(true);
//       }
//     };

//     validImages.forEach((src) => {
//       const img = new Image();
//       img.onload = checkAllLoaded;
//       img.onerror = checkAllLoaded; // Still count as "loaded" to prevent hanging
//       img.src = src;
//     });
//   }, [validImages]);

//   // Handle image change with callback
//   const changeImage = useCallback(
//     (newIndex) => {
//       if (newIndex === currentImageIndex || newIndex >= validImages.length)
//         return;

//       setCurrentImageIndex(newIndex);
//       if (onImageChange) {
//         onImageChange(newIndex, validImages[newIndex]);
//       }
//     },
//     [currentImageIndex, validImages, onImageChange]
//   );

//   // Auto-change images effect with proper cleanup
//   useEffect(() => {
//     if (!isPlaying || validImages.length <= 1 || !isInViewRef.current) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       return;
//     }

//     intervalRef.current = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => {
//         const nextIndex =
//           prevIndex === validImages.length - 1 ? 0 : prevIndex + 1;
//         if (onImageChange) {
//           onImageChange(nextIndex, validImages[nextIndex]);
//         }
//         return nextIndex;
//       });
//     }, autoChangeInterval);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [isPlaying, validImages.length, autoChangeInterval, onImageChange]);

//   // Clean up on unmount
//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//       if (animationRef.current) {
//         animationRef.current.kill();
//       }
//     };
//   }, []);

//   // Main GSAP animations
//   useGSAP(() => {
//     if (!imagesLoaded || validImages.length === 0) return;

//     const ctx = gsap.context(() => {
//       // Container parallax effect with intersection observer
//       const containerAnimation = gsap.fromTo(
//         imgContainerRef.current,
//         { y: 60, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1.5,
//           ease: "power3.out",
//           paused: true,
//           scrollTrigger: {
//             trigger: imgContainerRef.current,
//             start: "top 80%",
//             end: "bottom 20%",
//             scrub: 0.1,
//             id: `${componentId}-img`,
//             onEnter: () => {
//               isInViewRef.current = true;
//               if (enableAutoPlay) setIsPlaying(true);
//             },
//             onLeave: () => {
//               isInViewRef.current = false;
//               setIsPlaying(false);
//             },
//             onEnterBack: () => {
//               isInViewRef.current = true;
//               if (enableAutoPlay) setIsPlaying(true);
//             },
//             onLeaveBack: () => {
//               isInViewRef.current = false;
//               setIsPlaying(false);
//             },
//           },
//         }
//       );

//       // Text fade + slide
//       gsap.fromTo(
//         textRef.current,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: textRef.current,
//             start: "top 90%",
//             scrub: 0.1,
//             id: `${componentId}-text`,
//           },
//         }
//       );

//       // Initial image setup
//       const imageElements =
//         imgContainerRef.current?.querySelectorAll(".tile-image");
//       if (imageElements && imageElements.length > 0) {
//         gsap.set(imageElements, {
//           opacity: 0,
//           scale: 1.05,
//           filter: "blur(2px)",
//           transformOrigin: "center center",
//         });
//         gsap.set(imageElements[0], {
//           opacity: 1,
//           scale: 1,
//           filter: "blur(0px)",
//         });
//       }
//     }, sectionRef);

//     return () => {
//       ctx.revert();
//     };
//   }, [imagesLoaded, validImages.length, componentId, enableAutoPlay]);

//   // Handle image transitions
//   useGSAP(() => {
//     if (!imagesLoaded || validImages.length <= 1 || !imgContainerRef.current)
//       return;

//     const imageElements =
//       imgContainerRef.current.querySelectorAll(".tile-image");
//     if (!imageElements || imageElements.length === 0) return;

//     // Kill previous animation
//     if (animationRef.current) {
//       animationRef.current.kill();
//     }

//     const currentImg = imageElements[currentImageIndex];
//     const prevImg =
//       imageElements[
//         currentImageIndex === 0
//           ? imageElements.length - 1
//           : currentImageIndex - 1
//       ];

//     if (!currentImg) return;

//     // Create timeline for smooth transition
//     const tl = gsap.timeline();

//     // Fade out previous image
//     if (prevImg) {
//       tl.to(
//         prevImg,
//         {
//           opacity: 0,
//           scale: 0.95,
//           filter: "blur(3px)",
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         0
//       );
//     }

//     // Fade in current image
//     tl.fromTo(
//       currentImg,
//       {
//         opacity: 0,
//         scale: 1.05,
//         filter: "blur(2px)",
//         zIndex: 2,
//       },
//       {
//         opacity: 1,
//         scale: 1,
//         filter: "blur(0px)",
//         duration: 0.8,
//         ease: "power2.out",
//         zIndex: 3,
//       },
//       0.2
//     );

//     animationRef.current = tl;
//   }, [currentImageIndex, imagesLoaded, validImages.length]);

//   // Handle manual image change
//   const handleIndicatorClick = useCallback(
//     (index) => {
//       changeImage(index);
//       // Pause auto-play temporarily when user interacts
//       setIsPlaying(false);
//       setTimeout(() => {
//         if (enableAutoPlay && isInViewRef.current) {
//           setIsPlaying(true);
//         }
//       }, 3000); // Resume after 3 seconds
//     },
//     [changeImage, enableAutoPlay]
//   );

//   // Early return if no valid images
//   if (validImages.length === 0) {
//     console.warn("Hero: No valid images provided");
//     return null;
//   }

//   return (
//     <>
//       <section
//         ref={imgContainerRef}
//         className="relative h-screen text-white pt-20 bg-[#010000] flex justify-center"
//       >
//         <img
//           src={bg}
//           alt="bg image"
//           className="absolute left-[-115px] bottom-[-170px] w-[60vw] opacity-[17%] z-[1] 
//                max-[500px]:w-[200px] max-[500px]:left-[-80px] max-[500px]:bottom-[-100px]
//                md:w-[360px] lg:w-[360px]"
//         />
//         <div className="relative z-20 w-[95%] md:w-[95%] max-w-[95%] mx-auto flex flex-col-reverse md:flex-row items-center justify-center lg:justify-between">
//           <div className="text-center md:text-left mt-10 md:mt-0">
//             <h1
//               ref={titleRef}
//               className="font-montserrat text-[#fff] font-semibold text-3xl md:text-6xl lg:text-7xl leading-tight max-w-[90vw] md:max-w-none"
//             >
//               ELEGANT MARBLE
//             </h1>
//             <h3
//               ref={subtitleRef}
//               className="font-montserrat text-sm md:text-base lg:text-lg font-light mt-3 max-w-[90vw] md:max-w-[330px]"
//             >
//               High-quality, luxurious, marble tiles for your home.
//             </h3>
//             <div ref={btnRef}>
//               <Link to={"/products"}>
//                 <Button className="bg-[#D5251D] mt-6 md:mt-8 rounded-md h-[45px] w-full sm:w-auto px-6 font-montserrat font-semibold text-sm md:text-base">
//                   Explore Collection
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Image Slider Container */}
//           <div
//             className="flex justify-center items-center"
//             ref={imgContainerRef}
//             role="img"
//             aria-label={`Hero Image ${currentImageIndex + 1} of ${
//               validImages.length
//             }`}
//           >
//             <div className="lg:w-[80%] overflow-hidden relative rounded-[20px]">
//               <div
//                 ref={imgContainerRef}
//                 className="relative w-full h-auto"
//                 role="img"
//                 aria-label={` - Image ${currentImageIndex + 1} of ${
//                   validImages.length
//                 }`}
//               >
//                 {validImages.map((image, index) => (
//                   <img
//                     key={`${componentId}-img-${index}`}
//                     src={image}
//                     alt={` ${index + 1}`}
//                     className={`tile-image w-full h-auto object-cover shadow-lg  ${
//                       index === 0 ? "relative" : "absolute top-0 left-0"
//                     }`}
//                     style={{
//                       opacity: index === 0 ? 1 : 0,
//                       zIndex: index === 0 ? 2 : 1,
//                       willChange: "opacity, transform, filter",
//                     }}
//                     loading={index === 0 ? "eager" : "lazy"}
//                     decoding="async"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import bg from "../../assets/bg.png";
import { Button } from "@material-tailwind/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../assets/slider/001.webp";
import img2 from "../../assets/slider/002.webp";
import img3 from "../../assets/slider/003.webp";
import img4 from "../../assets/slider/004.webp";
import img5 from "../../assets/slider/005.webp";
import img6 from "../../assets/slider/006.webp";
import img7 from "../../assets/slider/007.webp";
import img8 from "../../assets/slider/008.webp";
import img9 from "../../assets/slider/009.webp";
import img10 from "../../assets/slider/010.webp";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero({
  onImageChange,
  enableAutoPlay = true,
  autoChangeInterval = 4000,
}) {
  // Fixed: Renamed refs to avoid conflicts
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageSliderRef = useRef(null); // Fixed: Renamed from imgContainerRef
  const imageContainerRef = useRef(null); // Fixed: New ref for the inner container
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(enableAutoPlay);
  
  const intervalRef = useRef(null);
  const animationRef = useRef(null);
  const isInViewRef = useRef(false);

  // Generate stable unique ID for this component instance
  const componentId = useMemo(
    () => `hero-section-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // Validate images prop
  const validImages = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) {
      console.warn("Hero: images prop should be a non-empty array");
      return [];
    }
    return images.filter((img) => typeof img === "string" && img.trim() !== "");
  }, []);

  // Preload images for better performance
  useEffect(() => {
    if (validImages.length === 0) return;

    let loadedCount = 0;
    const totalImages = validImages.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    validImages.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });
  }, [validImages]);

  // Handle image change with callback
  const changeImage = useCallback(
    (newIndex) => {
      if (newIndex === currentImageIndex || newIndex >= validImages.length)
        return;

      setCurrentImageIndex(newIndex);
      if (onImageChange) {
        onImageChange(newIndex, validImages[newIndex]);
      }
    },
    [currentImageIndex, validImages, onImageChange]
  );

  // Auto-change images effect with proper cleanup
  useEffect(() => {
    if (!isPlaying || validImages.length <= 1 || !isInViewRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex =
          prevIndex === validImages.length - 1 ? 0 : prevIndex + 1;
        if (onImageChange) {
          onImageChange(nextIndex, validImages[nextIndex]);
        }
        return nextIndex;
      });
    }, autoChangeInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, validImages.length, autoChangeInterval, onImageChange]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Initial load animations (immediate, no scroll trigger)
  useGSAP(() => {
    if (!imagesLoaded || validImages.length === 0) return;

    const ctx = gsap.context(() => {
      // Immediate text animations on load
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            delay: 0.4,
          }
        );
      }

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.6,
          }
        );
      }

      // Immediate image slider animation on load
      if (imageSliderRef.current) {
        gsap.fromTo(
          imageSliderRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.3,
            onComplete: () => {
              // Start autoplay immediately after animation completes
              isInViewRef.current = true;
              if (enableAutoPlay) setIsPlaying(true);
            }
          }
        );
      }

      // Initial image setup
      if (imageContainerRef.current) {
        const imageElements = imageContainerRef.current.querySelectorAll(".tile-image");
        if (imageElements && imageElements.length > 0) {
          gsap.set(imageElements, {
            opacity: 0,
            scale: 1.05,
            filter: "blur(2px)",
            transformOrigin: "center center",
          });
          gsap.set(imageElements[0], {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          });
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [imagesLoaded, validImages.length, enableAutoPlay]);

  // Separate ScrollTrigger for in-view detection (for autoplay control)
  useGSAP(() => {
    if (!imageSliderRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: imageSliderRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          isInViewRef.current = true;
          if (enableAutoPlay) setIsPlaying(true);
        },
        onLeave: () => {
          isInViewRef.current = false;
          setIsPlaying(false);
        },
        onEnterBack: () => {
          isInViewRef.current = true;
          if (enableAutoPlay) setIsPlaying(true);
        },
        onLeaveBack: () => {
          isInViewRef.current = false;
          setIsPlaying(false);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [enableAutoPlay]);

  // Handle image transitions - Fixed target references
  useGSAP(() => {
    if (!imagesLoaded || validImages.length <= 1 || !imageContainerRef.current)
      return;

    const imageElements = imageContainerRef.current.querySelectorAll(".tile-image");
    if (!imageElements || imageElements.length === 0) return;

    // Kill previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const currentImg = imageElements[currentImageIndex];
    const prevImg =
      imageElements[
        currentImageIndex === 0
          ? imageElements.length - 1
          : currentImageIndex - 1
      ];

    if (!currentImg) return;

    // Create timeline for smooth transition
    const tl = gsap.timeline();

    // Fade out previous image
    if (prevImg) {
      tl.to(
        prevImg,
        {
          opacity: 0,
          scale: 0.95,
          filter: "blur(3px)",
          duration: 0.6,
          ease: "power2.out",
        },
        0
      );
    }

    // Fade in current image
    tl.fromTo(
      currentImg,
      {
        opacity: 0,
        scale: 1.05,
        filter: "blur(2px)",
        zIndex: 2,
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        zIndex: 3,
      },
      0.2
    );

    animationRef.current = tl;
  }, [currentImageIndex, imagesLoaded, validImages.length]);

  // Handle manual image change
  const handleIndicatorClick = useCallback(
    (index) => {
      changeImage(index);
      setIsPlaying(false);
      setTimeout(() => {
        if (enableAutoPlay && isInViewRef.current) {
          setIsPlaying(true);
        }
      }, 3000);
    },
    [changeImage, enableAutoPlay]
  );

  // Early return if no valid images
  if (validImages.length === 0) {
    console.warn("Hero: No valid images provided");
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen text-white pt-20 bg-[#010000] flex justify-center"
    >
      <img
        src={bg}
        alt="bg image"
        className="absolute left-[-115px] bottom-[-170px] w-[60vw] opacity-[17%] z-[1] 
             max-[500px]:w-[200px] max-[500px]:left-[-80px] max-[500px]:bottom-[-100px]
             md:w-[360px] lg:w-[360px]"
      />
      <div className="relative z-20 w-[95%] md:w-[95%] max-w-[95%] mx-auto flex flex-col-reverse md:flex-row items-center justify-center lg:justify-between">
        {/* Text Content */}
        <div ref={textContainerRef} className="text-center md:text-left mt-10 md:mt-0">
          <h1
            ref={titleRef}
            className="font-montserrat text-[#fff] font-semibold text-3xl md:text-6xl lg:text-7xl leading-tight max-w-[90vw] md:max-w-none"
          >
            ELEGANT MARBLE
          </h1>
          <h3
            ref={subtitleRef}
            className="font-montserrat text-sm md:text-base lg:text-lg font-light mt-3 max-w-[90vw] md:max-w-[330px]"
          >
            High-quality, luxurious, marble tiles for your home.
          </h3>
          <div ref={btnRef}>
            <Link to={"/products"}>
              <Button className="bg-[#D5251D] mt-6 md:mt-8 rounded-md h-[45px] w-full sm:w-auto px-6 font-montserrat font-semibold text-sm md:text-base">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Slider Container */}
        <div
          ref={imageSliderRef}
          className="flex justify-center items-center"
          role="img"
          aria-label={`Hero Image ${currentImageIndex + 1} of ${validImages.length}`}
        >
          <div className="lg:w-[80%] overflow-hidden relative rounded-[20px]">
            <div
              ref={imageContainerRef}
              className="relative w-full h-auto"
              role="img"
              aria-label={`Image ${currentImageIndex + 1} of ${validImages.length}`}
            >
              {validImages.map((image, index) => (
                <img
                  key={`${componentId}-img-${index}`}
                  src={image}
                  alt={`Marble tile ${index + 1}`}
                  className={`tile-image w-full h-auto object-cover shadow-lg ${
                    index === 0 ? "relative" : "absolute top-0 left-0"
                  }`}
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === 0 ? 2 : 1,
                    willChange: "opacity, transform, filter",
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}