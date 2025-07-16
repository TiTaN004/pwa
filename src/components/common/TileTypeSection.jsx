// import { useGSAP } from "@gsap/react";
// import { Button } from "@material-tailwind/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import React, { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export default function TileTypeSection({
//   img,
//   isReverse,
//   content,
//   heading,
//   subHeading,
//   buttonText,
//   className,
//   imgClass,
//   isSectionRev,
// }) 
// {
//   const sectionRef = useRef(null);
//   const imgRef = useRef(null);
//   const textRef = useRef(null);

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       // Image parallax
//       gsap.fromTo(
//         imgRef.current,
//         { opacity: 0 },
//         {
//           opacity: 1,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: imgRef.current,
//             start: "top 80%",
//             scrub: 0.1
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
//             start: "top 85%",
//             scrub: 0.1
//           },
//         }
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);
//   return (
//     <>
//       <section
//       ref={sectionRef}
//       className={`py-16 px-8 md:px-16 lg:px-24 ${
//         isSectionRev ? "bg-[#010000]" : "bg-[#010000]"
//       } ${className}`}
//     >
//       <div
//         className={`container mx-auto flex flex-col ${
//           isReverse ? "lg:flex-row" : "lg:flex-row-reverse"
//         } items-center gap-12`}
//       >
//         <div className="lg:w-1/2 overflow-hidden">
//           <img
//             ref={imgRef}
//             src={img}
//             alt={heading}
//             className={`relative z-10 w-full rounded-[20px] h-auto object-cover shadow-lg transform transition-transform ${imgClass}`}
//           />
//         </div>
//         <div ref={textRef} className="lg:w-1/2 text-white">
//           <h2 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
//           <h3 className="text-xl text-gray-300 mb-6">{subHeading}</h3>
//           <p className="text-gray-400 mb-8 leading-relaxed">{content}</p>
//           <button className="bg-[#D5251D] text-white px-8 py-3 rounded uppercase font-medium tracking-wider hover:bg-[#d7423a] transition-colors duration-300">
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </section>
//     </>
//   );
// }

import { useGSAP } from "@gsap/react";
import { Button } from "@material-tailwind/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TileTypeSection({
  images = [], // Default empty array
  isReverse = false,
  content,
  heading,
  subHeading,
  buttonText,
  className = "",
  imgClass = "",
  isSectionRev = false,
  autoChangeInterval = 4000,
  enableAutoPlay = true,
  onImageChange, // Callback for image changes
}) {
  const sectionRef = useRef(null);
  const imgContainerRef = useRef(null);
  const textRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(enableAutoPlay);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef(null);
  const animationRef = useRef(null);
  const isInViewRef = useRef(false);
  
  // Generate stable unique ID for this component instance
  const componentId = useMemo(() => 
    `tile-section-${Math.random().toString(36).substr(2, 9)}`, []
  );

  // Validate images prop
  const validImages = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) {
      console.warn('TileTypeSection: images prop should be a non-empty array');
      return [];
    }
    return images.filter(img => typeof img === 'string' && img.trim() !== '');
  }, [images]);

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

    validImages.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Still count as "loaded" to prevent hanging
      img.src = src;
    });
  }, [validImages]);

  // Handle image change with callback
  const changeImage = useCallback((newIndex) => {
    if (newIndex === currentImageIndex || newIndex >= validImages.length) return;
    
    setCurrentImageIndex(newIndex);
    if (onImageChange) {
      onImageChange(newIndex, validImages[newIndex]);
    }
  }, [currentImageIndex, validImages, onImageChange]);

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
      setCurrentImageIndex(prevIndex => {
        const nextIndex = prevIndex === validImages.length - 1 ? 0 : prevIndex + 1;
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

  // Main GSAP animations
  useGSAP(() => {
    if (!imagesLoaded || validImages.length === 0) return;

    const ctx = gsap.context(() => {
      // Container parallax effect with intersection observer
      const containerAnimation = gsap.fromTo(
        imgContainerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          paused: true,
          scrollTrigger: {
            trigger: imgContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.1,
            id: `${componentId}-img`,
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
          },
        }
      );

      // Text fade + slide
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            scrub: 0.1,
            id: `${componentId}-text`
          },
        }
      );

      // Initial image setup
      const imageElements = imgContainerRef.current?.querySelectorAll('.tile-image');
      if (imageElements && imageElements.length > 0) {
        gsap.set(imageElements, { 
          opacity: 0, 
          scale: 1.05,
          filter: "blur(2px)",
          transformOrigin: "center center"
        });
        gsap.set(imageElements[0], { 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)"
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [imagesLoaded, validImages.length, componentId, enableAutoPlay]);

  // Handle image transitions
  useGSAP(() => {
    if (!imagesLoaded || validImages.length <= 1 || !imgContainerRef.current) return;

    const imageElements = imgContainerRef.current.querySelectorAll('.tile-image');
    if (!imageElements || imageElements.length === 0) return;

    // Kill previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const currentImg = imageElements[currentImageIndex];
    const prevImg = imageElements[currentImageIndex === 0 ? imageElements.length - 1 : currentImageIndex - 1];
    
    if (!currentImg) return;

    // Create timeline for smooth transition
    const tl = gsap.timeline();
    
    // Fade out previous image
    if (prevImg) {
      tl.to(prevImg, {
        opacity: 0,
        scale: 0.95,
        filter: "blur(3px)",
        duration: 0.6,
        ease: "power2.out"
      }, 0);
    }
    
    // Fade in current image
    tl.fromTo(currentImg, 
      { 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(2px)",
        zIndex: 2
      },
      { 
        opacity: 1, 
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        zIndex: 3
      }, 0.2
    );

    animationRef.current = tl;

  }, [currentImageIndex, imagesLoaded, validImages.length]);

  // Handle manual image change
  const handleIndicatorClick = useCallback((index) => {
    changeImage(index);
    // Pause auto-play temporarily when user interacts
    setIsPlaying(false);
    setTimeout(() => {
      if (enableAutoPlay && isInViewRef.current) {
        setIsPlaying(true);
      }
    }, 3000); // Resume after 3 seconds
  }, [changeImage, enableAutoPlay]);

  // Early return if no valid images
  if (validImages.length === 0) {
    console.warn('TileTypeSection: No valid images provided');
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-8 md:px-16 lg:px-24 ${
        isSectionRev ? "bg-[#010000]" : "bg-[#010000]"
      } ${className}`}
      role="region"
      aria-label={heading}
    >
      <div
        className={`container mx-auto flex flex-col ${
          isReverse ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-12`}
      >
        <div className="lg:w-1/2 overflow-hidden relative">
          <div 
            ref={imgContainerRef}
            className="relative w-full h-auto"
            role="img"
            aria-label={`${heading} - Image ${currentImageIndex + 1} of ${validImages.length}`}
          >
            {validImages.map((image, index) => (
              <img
                key={`${componentId}-img-${index}`}
                src={image}
                alt={`${heading} ${index + 1}`}
                className={`tile-image w-full rounded-[20px] h-auto object-cover shadow-lg ${imgClass} ${
                  index === 0 ? 'relative' : 'absolute top-0 left-0'
                }`}
                style={{
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 2 : 1,
                  willChange: 'opacity, transform, filter'
                }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>
        </div>
        
        <div ref={textRef} className="lg:w-1/2 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
          <h3 className="text-xl text-gray-300 mb-6">{subHeading}</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">{content}</p>
          <Link to={'/products'}>
          <button className="bg-[#D5251D] text-white px-8 py-3 rounded uppercase font-medium tracking-wider hover:bg-[#d7423a] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#d7423a] focus:ring-offset-2 focus:ring-offset-black">
            {buttonText}
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

            {/* Image indicators - only show if more than 1 image */}
            {/* {validImages.length > 1 && (
              <div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
                role="tablist"
                aria-label="Image navigation"
              >
                {validImages.map((_, index) => (
                  <button
                    key={`${componentId}-indicator-${index}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => handleIndicatorClick(index)}
                    aria-label={`Go to image ${index + 1}`}
                    role="tab"
                    aria-selected={index === currentImageIndex}
                    tabIndex={index === currentImageIndex ? 0 : -1}
                  />
                ))}
              </div>
            )} */}

            {/* Play/Pause button for accessibility */}
            {/* {validImages.length > 1 && enableAutoPlay && (
              <button
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
            )} */}