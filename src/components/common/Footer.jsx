// import React from 'react'
// import logo from '../../assets/IMG_3330.PNG'
// import { Link } from 'react-router-dom'

// export default function Footer() {
//   return (
// <footer className="bg-gradient-to-t from-[#010000]  to-[#111] text-[#ccc] pt-10 pb-6 px-4 z-20">
// {/* <footer className="bg-gradient-to-t from-[#010000] rounded-t-[30px] to-[#111] text-[#ccc] pt-10 pb-6 px-4"> */}
//   <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

//     <div className='text-center'>
//       <div className="text-2xl font-bold text-white mb-5"><img src={logo} alt="logo" className="w-[100px] m-auto" /></div>
//       <p className="text-sm">Premium marble tiles crafted for timeless beauty and durability.</p>
//     </div>

//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
//       <ul className="space-y-2 text-sm">
//         <li><Link to="/" className="hover:text-[#D5251D] transition">Home</Link></li>
//         <li><Link to="" className="hover:text-[#D5251D] transition">Collection</Link></li>
//         <li><Link to="about" className="hover:text-[#D5251D] transition">About</Link></li>
//         <li><Link to="contact" className="hover:text-[#D5251D] transition">Contact</Link></li>
//       </ul>
//     </div>

//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
//       <ul className="space-y-2 text-sm">
//         <li><a href="#" className="hover:text-[#D5251D] transition">Porcelain</a></li>
//         <li><a href="#" className="hover:text-[#D5251D] transition">Granite</a></li>
//         <li><a href="#" className="hover:text-[#D5251D] transition">Wall Tiles</a></li>
//         <li><a href="#" className="hover:text-[#D5251D] transition">Floor Tiles</a></li>
//       </ul>
//     </div>

//     <div>
//       <h3 className="text-lg font-semibold text-white mb-3">Subscribe</h3>
//       <p className="text-sm mb-3">Get updates about new arrivals and offers.</p>
//       <form className="flex flex-col sm:flex-row gap-2">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className=" p-3 bg-[#2c2c2c] border border-[#333] focus:outline-none focus:border-[#d5251d] px-3 py-2 rounded-md text-sm text-[#ccc] w-full sm:flex-1"
//         />
//         <button className="bg-[#D5251D] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition">
//           Subscribe
//         </button>
//       </form>
//     </div>
//   </div>

//   <div className="mt-10 border-t border-[#222] pt-4 text-center text-xs text-[#888]">
//     © {new Date().getFullYear()} Panth Enterprise. All rights reserved. Developed & Managed by Infix technology
//   </div>
// </footer>

//   )
// }
import React, { useEffect, useRef } from "react";
import logo from "../../assets/logo.PNG";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  // Create refs for animated elements
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const textLineRef = useRef(null);
  const quickLinksRef = useRef(null);
  const categoriesRef = useRef(null);
  const subscribeRef = useRef(null);
  const linkRefs = useRef([]);
  const copyrightRef = useRef(null);
  const sectionRefs = useRef([]);
  const redLineRefs = useRef([]);

  // Setup GSAP timeline animations when component mounts
  useEffect(() => {
    // // Main timeline with scroll trigger
    // const mainTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: footerRef.current,
    //     start: "top bottom-=50",
    //     toggleActions: "play none none reset"
    //   },
    //   defaults: {
    //     ease: "power2.out",
    //     duration: 0.3
    //   }
    // });
    // // Initial state - everything hidden
    // gsap.set([
    //   footerRef.current,
    //   logoRef.current,
    //   textLineRef.current,
    //   quickLinksRef.current,
    //   categoriesRef.current,
    //   subscribeRef.current,
    //   linkRefs.current,
    //   copyrightRef.current,
    //   redLineRefs.current
    // ], { opacity: 0 });
    // // Create a subtle reveal for the footer background
    // mainTl.fromTo(
    //   footerRef.current,
    //   {
    //     opacity: 0,
    //     backgroundPosition: "0 20px"
    //   },
    //   {
    //     opacity: 1,
    //     backgroundPosition: "0 0",
    //     duration: 0.5
    //   }
    // );
    // // Add a stylish entrance for the logo
    // mainTl.fromTo(
    //   logoRef.current,
    //   {
    //     opacity: 0,
    //     y: -20,
    //     scale: 0.9
    //   },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scale: 1,
    //     duration: 0.8,
    //     ease: "back.out(1.7)"
    //   },
    //   "-=0.5"
    // );
    // // Animate the tagline
    // mainTl.fromTo(
    //   textLineRef.current,
    //   {
    //     opacity: 0,
    //     y: 10
    //   },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.6
    //   },
    //   "-=0.4"
    // );
    // // Sequence the section headers with a professional fade
    // mainTl.fromTo(
    //   [quickLinksRef.current, categoriesRef.current, subscribeRef.current],
    //   {
    //     opacity: 0,
    //     y: 15
    //   },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     stagger: 0.12,
    //     ease: "power1.out"
    //   },
    //   "-=0.3"
    // );
    // // Animate the red underlines with a drawing effect
    // mainTl.fromTo(
    //   redLineRefs.current,
    //   {
    //     width: 0,
    //     opacity: 0
    //   },
    //   {
    //     width: "16px",
    //     opacity: 1,
    //     duration: 0.5,
    //     stagger: 0.12,
    //     ease: "power1.inOut"
    //   },
    //   "-=0.25"
    // );
    // // Create a smoother staggered animation for links
    // mainTl.fromTo(
    //   linkRefs.current,
    //   {
    //     opacity: 0,
    //     x: -8,
    //     y: 3
    //   },
    //   {
    //     opacity: 1,
    //     x: 0,
    //     y: 0,
    //     stagger: 0.03,
    //     duration: 0.4,
    //     ease: "power1.out"
    //   },
    //   "-=0.1"
    // );
    // // Polished copyright animation
    // mainTl.fromTo(
    //   copyrightRef.current,
    //   {
    //     opacity: 0,
    //     y: 8
    //   },
    //   {
    //     opacity: 0.8,
    //     y: 0,
    //     duration: 0.6
    //   },
    //   "-=0.2"
    // );
    // // Enhance the section transitions with subtle reveals
    // sectionRefs.current.forEach((section, index) => {
    //   mainTl.fromTo(
    //     section,
    //     {
    //       backgroundPosition: `${index % 2 === 0 ? '-10px' : '10px'} 0`,
    //       opacity: 0.95
    //     },
    //     {
    //       backgroundPosition: "0 0",
    //       opacity: 1,
    //       duration: 0.8
    //     },
    //     "-=0.65"
    //   );
    // });
    // // Enhanced hover effects for links - more subtle and professional
    // linkRefs.current.forEach(link => {
    //   // Create a mini timeline for each link hover
    //   const hoverTl = gsap.timeline({ paused: true });
    //   hoverTl
    //     .to(link, {
    //       color: '#D5251D',
    //       duration: 0.25,
    //       ease: "power1.inOut"
    //     })
    //     .to(link, {
    //       x: 3,
    //       duration: 0.2,
    //       ease: "power1.out"
    //     }, "-=0.2");
    //   link.addEventListener('mouseenter', () => hoverTl.play());
    //   link.addEventListener('mouseleave', () => hoverTl.reverse());
    // });
    // // Cleanup function
    // return () => {
    //   // Remove hover event listeners
    //   linkRefs.current.forEach(link => {
    //     if (link) {
    //       link.removeEventListener('mouseenter', () => {});
    //       link.removeEventListener('mouseleave', () => {});
    //     }
    //   });
    //   // Kill all animations and ScrollTriggers
    //   mainTl.kill();
    //   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // };
  }, []);

  // Enhanced form interactions with smoother animations
  const handleFocus = (e) => {
    // Create a more elegant focus animation
    gsap
      .timeline()
      .to(e.target, {
        borderColor: "#D5251D",
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        e.target,
        {
          boxShadow: "0 0 8px rgba(213, 37, 29, 0.3)",
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.2"
      );
  };

  const handleBlur = (e) => {
    gsap.to(e.target, {
      borderColor: "#333",
      boxShadow: "none",
      duration: 0.4,
      ease: "power1.inOut",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a professional animation sequence for the submit action
    const formTl = gsap.timeline();
    const button = e.target.querySelector("button");
    const input = e.target.querySelector("input");
    const buttonText = button.textContent;

    // Check input validity
    if (!input.value) {
      // Error animation for empty input
      formTl
        .to(input, {
          x: -5,
          duration: 0.1,
          ease: "power1.in",
        })
        .to(input, {
          x: 5,
          duration: 0.1,
        })
        .to(input, {
          x: -3,
          duration: 0.1,
        })
        .to(input, {
          x: 3,
          duration: 0.1,
        })
        .to(input, {
          x: 0,
          duration: 0.1,
          ease: "power1.out",
        })
        .to(
          input,
          {
            borderColor: "#ff3a3a",
            boxShadow: "0 0 8px rgba(255, 58, 58, 0.4)",
            duration: 0.3,
          },
          "-=0.4"
        );

      return;
    }

    // Success animation sequence with professional timing
    formTl
      // Button press effect
      .to(button, {
        scale: 0.95,
        backgroundColor: "#c02018",
        duration: 0.15,
        ease: "power2.in",
      })
      // Button release with bounce
      .to(button, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
      })
      // Change button color to success
      .to(
        button,
        {
          backgroundColor: "#28a745",
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.2"
      )
      // Update button text
      .call(() => {
        button.textContent = "Subscribed!";
      })
      // Add checkmark animation (optional - just changing text for now)
      // Wait a moment before resetting
      .to(
        {},
        {
          duration: 1.5,
        }
      )
      // Fade back to original color
      .to(button, {
        backgroundColor: "#D5251D",
        duration: 0.5,
        ease: "power1.inOut",
      })
      // Reset text and clear input
      .call(() => {
        button.textContent = buttonText;

        // Clear input with a fade effect
        gsap.to(input, {
          opacity: 0.5,
          duration: 0.2,
          onComplete: () => {
            input.value = "";
            gsap.to(input, {
              opacity: 1,
              duration: 0.3,
            });
          },
        });
      });
  };

  // Add links to refs collection
  const addToLinkRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  // Add section to refs collection
  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Add red underline to refs collection
  const addToRedLineRefs = (el) => {
    if (el && !redLineRefs.current.includes(el)) {
      redLineRefs.current.push(el);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-t from-[#010000] to-[#111] text-[#ccc] pt-10 pb-6 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
        <div className="text-center" ref={addToSectionRefs}>
          <div ref={logoRef} className="text-2xl font-bold text-white mb-5">
            <Link to={'/'}><img src={logo} alt="logo" className="w-[130px] m-auto" /></Link>
          </div>
          <p ref={textLineRef} className="text-sm">
            Premium marble tiles crafted for timeless beauty and durability.
          </p>
        </div>

        <div ref={addToSectionRefs} className="md:pl-[70px]">
          <h3
            ref={quickLinksRef}
            className="text-lg font-semibold text-white mb-3 relative"
          >
            Quick Links
            <span
              ref={addToRedLineRefs}
              className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D5251D]"
            ></span>
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                ref={addToLinkRefs}
                to="/"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                ref={addToLinkRefs}
                to={"/e-catalogue"}
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                E-Catalogue
              </Link>
            </li>
            <li>
              <Link
                ref={addToLinkRefs}
                to="about"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                ref={addToLinkRefs}
                to="contact"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div ref={addToSectionRefs}>
          <h3
            ref={subscribeRef}
            className="text-lg font-semibold text-white mb-3 relative"
          >
            Contact Info.
            <span
              ref={addToRedLineRefs}
              className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D5251D]"
            ></span>
          </h3>

          <p className="text-sm mb-3 text-white">Get in touch with us.</p>

          <div className="space-y-2 text-sm text-white">
            <p>
              <b className="text-sm">Email :</b>{" "}
              <a
                href="mailto:info.panthenterprise@gmail.com"
                className="text-blue-400 hover:underline"
              >
                info.panthenterprise@gmail.com
              </a>
            </p>
            <p>
              <b className="text-sm">Mobile No. :</b>{" "}
              <a
                href="tel:+919727896779"
                className="text-blue-400 hover:underline"
              >
                +91 97278 96779
              </a>
            </p>
            <p>
              <b className="text-sm">WhatsApp No. :</b>{" "}
              <a
                href="https://wa.me/918000557122"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                +91 80005 57122
              </a>
            </p>
          </div>
        </div>

        <div ref={addToSectionRefs}>
          <h3
            ref={categoriesRef}
            className="text-lg font-semibold text-white mb-3 relative"
          >
            Our Location
            <span
              ref={addToRedLineRefs}
              className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D5251D]"
            ></span>
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78385.89422673696!2d70.7788557436316!3d22.805038235998992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598cd96ce15487%3A0x294863999340c94e!2sMorbi%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1747577736298!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-2xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <ul className="space-y-2 text-sm">
            <li>
              <a
                ref={addToLinkRefs}
                href="#"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Porcelain
              </a>
            </li>
            <li>
              <a
                ref={addToLinkRefs}
                href="#"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Granite
              </a>
            </li>
            <li>
              <a
                ref={addToLinkRefs}
                href="#"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Wall Tiles
              </a>
            </li>
            <li>
              <a
                ref={addToLinkRefs}
                href="#"
                className="hover:text-[#D5251D] transition-colors duration-300 inline-block"
              >
                Floor Tiles
              </a>
            </li>
          </ul> */}
        </div>

        
      </div>

      <div
        ref={copyrightRef}
        className="mt-10 border-t border-[#222] pt-4 text-center text-xs text-[#888]"
      >
        © {new Date().getFullYear()} Panth Enterprise. All rights reserved.
        Developed & Managed by <a className="text-blue-400 font-bold" href='https://www.instagram.com/infix.technology?igsh=ZHBtMmR4MnN6OW0%3D&utm_source=qr' target='_blanck'>Infix technology</a>
      </div>
    </footer>
  );
}
