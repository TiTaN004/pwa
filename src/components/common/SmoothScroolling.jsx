import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const SmoothScroller = ({ children, smoothFactor = 1.5, disableOnMobile = true }) => {
  // Store the mobile status in state
  const [isMobile, setIsMobile] = useState(false);
  
  // Store the smoother and cursor references
  const smootherRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  // Determine if we're on mobile - only run once after component mounts
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    // Check on mount
    checkMobile();
    
    // Also set up a resize listener for orientation changes
    const handleResize = () => {
      checkMobile();
      // Need to refresh ScrollTrigger when screen size changes
      ScrollTrigger.refresh(true);
    };
    
    // Throttled resize handler
    let resizeTimer;
    const throttledResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };
    
    window.addEventListener("resize", throttledResize);
    return () => window.removeEventListener("resize", throttledResize);
  }, []);

  // Handle the scroll smoother initialization
  useEffect(() => {
    // Don't initialize on mobile if disabled
    if (disableOnMobile && isMobile) return;
    
    // Make sure we have our references
    if (!wrapperRef.current || !contentRef.current) return;
    
    // Create scroll smoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: smoothFactor,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
      smoothTouch: 0.1, // Light smooth scrolling for touch devices
    });
    
    // Refresh ScrollTrigger after images and fonts load for better accuracy
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("load", refreshScrollTrigger);
    
    // Track image loading
    const images = document.querySelectorAll("img");
    let loadedImages = 0;
    
    const onImageLoad = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        refreshScrollTrigger();
      }
    };
    
    images.forEach(img => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
      }
    });
    
    // Also refresh when fonts are ready
    if (document.fonts) {
      document.fonts.ready.then(refreshScrollTrigger);
    }
    
    // Clean up
    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      images.forEach(img => img.removeEventListener("load", onImageLoad));
      
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, [isMobile, smoothFactor, disableOnMobile]);
  
  // Memoize cursor handlers to prevent unnecessary re-renders
  const moveCursor = useCallback((e) => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Immediate movement for the dot
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0, // Instantaneous
    });
    
    // Smooth follow for the circle
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3, 
      ease: "power2.out",
    });
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    gsap.to(cursorRef.current, { scale: 1.5, opacity: 0.7, duration: 0.3 });
    gsap.to(cursorDotRef.current, { scale: 0, duration: 0.3 });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    gsap.to(cursorRef.current, { scale: 1, opacity: 0.3, duration: 0.3 });
    gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3 });
  }, []);

  // Setup and cleanup cursor effects
  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;
    
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Initialize cursor positions centered on their divs
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    
    // Initially hide cursor until first mouse movement
    gsap.set([cursor, cursorDot], { opacity: 0 });
    
    // Show cursor when mouse moves
    const handleFirstMove = () => {
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.3 });
      window.removeEventListener("mousemove", handleFirstMove);
    };
    
    window.addEventListener("mousemove", handleFirstMove);
    window.addEventListener("mousemove", moveCursor);
    
    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .product-card, input, textarea, [role='button'], .interactive"
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    
    // Hide cursor when it leaves the window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.3 });
    };
    
    const handleMouseEnterWindow = () => {
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.3 });
    };
    
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    
    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleFirstMove);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile, moveCursor, handleMouseEnter, handleMouseLeave]);

  return (
    <>
      {/* Custom Cursor - Only shown on non-mobile */}
      {/* {!isMobile && (
        <div className="custom-cursor-container pointer-events-none fixed inset-0 z-50">
          <div
            ref={cursorRef}
            className="custom-cursor fixed w-8 h-8 rounded-full border border-white opacity-30 will-change-transform"
          />
          <div
            ref={cursorDotRef}
            className="custom-cursor-dot fixed w-2 h-2 bg-white rounded-full will-change-transform"
          />
        </div>
      )} */}

      {/* Render with or without smooth scrolling based on mobile status */}
      {!isMobile ? (
        <div id="smooth-wrapper" ref={wrapperRef} className="overflow-hidden">
          <div id="smooth-content" ref={contentRef}>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SmoothScroller;