import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const LoadingScreen = ({ setLoading }) => {
  useEffect(() => {
    // Create loading animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide loader after animation completes
        gsap.to(".loading-screen", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setLoading(false)
        });
      }
    });

    // Animate the logo and text
    tl.from(".loading-logo", { 
      opacity: 0, 
      scale: 0.8, 
      duration: 1, 
      ease: "power3.out" 
    })
    .from(".loading-text span", { 
      opacity: 0, 
      y: 20, 
      stagger: 0.1, 
      duration: 0.6, 
      ease: "power3.out" 
    }, "-=0.5")
    .to(".loading-progress", { 
      width: "100%", 
      duration: 1.5, 
      ease: "power2.inOut" 
    }, "-=0.5");
  }, []);

  return (
    <div className="loading-screen fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="loading-logo w-24 h-24 mb-6">
        {/* Your logo SVG or image here */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="25" height="25" fill="#FFFFFF" />
          <rect x="55" y="20" width="25" height="25" fill="#FFFFFF" />
          <rect x="20" y="55" width="25" height="25" fill="#FFFFFF" />
          <rect x="55" y="55" width="25" height="25" fill="#FFFFFF" />
        </svg>
      </div>
      <div className="loading-text text-white text-xl mb-8">
        <span>P</span>
        <span>R</span>
        <span>E</span>
        <span>M</span>
        <span>I</span>
        <span>U</span>
        <span>M</span>
        <span> </span>
        <span>T</span>
        <span>I</span>
        <span>L</span>
        <span>E</span>
        <span>S</span>
      </div>
      <div className="loading-bar w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <div className="loading-progress h-full w-0 bg-white"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;