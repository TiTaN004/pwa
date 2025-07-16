// import React, { useEffect, useRef } from "react";
// import img1 from "../assets/desktop-marbles.png";
// import img2 from "../assets/marble-windows.png";
// import AboutCard from "./common/AboutCard";
// import ico1 from "../assets/1st.png";
// import ico2 from "../assets/2nd.png";
// import ico3 from "../assets/3rd.png";
// import ico4 from "../assets/4th.png";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(useGSAP);
// export default function AboutUs() {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Animate each image with parallax fade-in
//       gsap.utils.toArray(".animate-img").forEach((img) => {
//         gsap.fromTo(
//           img,
//           { y: 60, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1.5,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: img,
//               start: "top 80%",
//               scrub: 0.1,
//               // markers: true,
//             },
//           }
//         );
//       });

//       // Animate each text block with fade + slide-up
//       gsap.utils.toArray(".animate-text").forEach((text) => {
//         gsap.fromTo(
//           text,
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1.2,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: text,
//               start: "top 85%",
//               scrub: 0.1,
//               // markers: true,
//             },
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-[#010000] text-white py-24 px-4 md:px-10 font-montserrat"
//     >
//       {/* Company Origins */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-16">
//         <img
//           src={img1}
//           className="animate-img w-full sm:w-[50%] rounded-[20px]"
//           alt="Company Origins"
//         />
//         <div className="animate-text w-full sm:w-[50%]">
//           <h1 className="text-2xl sm:text-3xl font-extrabold">Company Origins</h1>
//           <p className="text-sm sm:text-base mt-4 sm:mt-6">
//             Welcome to Panth Enterprise, where craftsmanship meets elegance.
//             Based in the heart of Morbi, Gujarat — India’s hub for ceramics and
//             tiles — we specialize in delivering premium marble and tile
//             solutions that transform ordinary spaces into timeless statements.
//           </p>
//         </div>
//       </div>

//       {/* Our Journey */}
//       <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center gap-8 mb-16">
//         <img
//           src={img2}
//           className="animate-img w-full sm:w-[50%] rounded-[20px]"
//           alt="Our Journey"
//         />
//         <div className="animate-text w-full sm:w-[50%]">
//           <h1 className="text-2xl sm:text-3xl font-extrabold">Our Journey</h1>
//           <p className="text-sm sm:text-base mt-4 sm:mt-6">
//             Since our inception in 2018, Panth Enterprise has been committed to
//             quality, innovation, and design. From luxurious porcelain tiles to
//             durable double-charge vitrified tiles, our collection is curated for
//             architects, designers, and homeowners seeking sophistication and
//             strength in every square foot.
//           </p>
//         </div>
//       </div>

//       {/* Why Choose Us */}
//       <div className="animate-text mt-16">
//         <h1 className="text-2xl sm:text-3xl font-extrabold mb-8">Why Choose Us?</h1>
//         <div className="flex flex-wrap justify-center gap-6 sm:justify-evenly w-full">
//           <AboutCard img={ico1} text="Over 6+ years of industry experience" />
//           <AboutCard img={ico2} text="Wide range of exclusive designs & categories" />
//           <AboutCard img={ico3} text="Trusted by dealers, retailers & developers across India" />
//           <AboutCard img={ico4} text="Rooted in Morbi’s rich ceramic heritage" />
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef } from "react";
import img1 from "../assets/desktop-marbles.png";
import img2 from "../assets/marble-windows.png";
import AboutCard from "./common/AboutCard";
import ico1 from "../assets/1st.png";
import ico2 from "../assets/2nd.png";
import ico3 from "../assets/3rd.png";
import ico4 from "../assets/4th.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      // Main timeline for sequence control
      const mainTL = gsap.timeline();

      // Initialize all elements at their starting positions
      gsap.set(".animate-img", { y: 100, opacity: 0 });
      gsap.set(".animate-text", { y: 60, opacity: 0 });
      gsap.set(".about-card", { scale: 0.9, opacity: 0 });

      // Create animations for each image with staggered timing
      imagesRef.current.forEach((img, index) => {
        ScrollTrigger.create({
          trigger: img,
          start: "top 85%",
          onEnter: () => {
            gsap.to(img, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              delay: index * 0.2,
            });
          },
          once: false, // Animation occurs every time it enters viewport
        });
      });

      // Create animations for each text block
      textsRef.current.forEach((text, index) => {
        ScrollTrigger.create({
          trigger: text,
          start: "top 80%",
          onEnter: () => {
            gsap.to(text, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              delay: 0.3 + index * 0.1,
            });
          },
          once: false,
        });
      });

      // Create staggered animation for the cards
      ScrollTrigger.create({
        trigger: ".about-cards-container",
        start: "top 75%",
        onEnter: () => {
          gsap.to(".about-card", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
          });
        },
        once: false,
      });

      // Add a subtle parallax effect to images
      // imagesRef.current.forEach((img) => {
      //   ScrollTrigger.create({
      //     trigger: img,
      //     start: "top bottom",
      //     end: "bottom top",
      //     scrub: 1,
      //     onUpdate: (self) => {
      //       gsap.to(img, {
      //         yPercent: -5 * (1 - self.progress),
      //         ease: "none",
      //         duration: 0.5,
      //         overwrite: "auto",
      //       });
      //     },
      //   });
      // });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  // Utility function to add elements to refs
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#010000] text-white py-24 px-4 md:px-10 font-montserrat overflow-hidden"
    >
      {/* Company Origins */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-16">
        <img
          ref={(el) => addToRefs(el, imagesRef)}
          src={img1}
          className="animate-img w-full sm:w-[50%] rounded-[20px]"
          alt="Company Origins"
        />
        <div
          ref={(el) => addToRefs(el, textsRef)}
          className="animate-text w-full sm:w-[50%]"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Company Origins
          </h1>
          <p className="text-sm sm:text-base mt-4 sm:mt-6">
            Welcome to Panth Enterprise, where craftsmanship meets elegance.
            Based in the heart of Morbi, Gujarat — India's hub for ceramics and
            tiles — we specialize in delivering premium marble and tile
            solutions that transform ordinary spaces into timeless statements.
          </p>
        </div>
      </div>

      {/* Our Journey */}
      <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center gap-8 mb-16">
        <img
          ref={(el) => addToRefs(el, imagesRef)}
          src={img2}
          className="animate-img w-full sm:w-[50%] rounded-[20px]"
          alt="Our Journey"
        />
        <div
          ref={(el) => addToRefs(el, textsRef)}
          className="animate-text w-full sm:w-[50%]"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold">Our Journey</h1>
          <p className="text-sm sm:text-base mt-4 sm:mt-6">
            Since our inception in 2018, Panth Enterprise has been committed to
            quality, innovation, and design. From luxurious porcelain tiles to
            durable double-charge vitrified tiles, our collection is curated for
            architects, designers, and homeowners seeking sophistication and
            strength in every square foot.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div ref={(el) => addToRefs(el, textsRef)} className="animate-text mt-16">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8">
          Why Choose Us?
        </h1>
        <div className="overflow-hidden grid grid-cols-2 md:flex md:flex-nowrap md:justify-center gap-4 md:gap-6 w-full max-w-full overflow-x-hidden about-cards-container ">
          <div className="about-card w-full mx-auto place-items-center">
            <AboutCard
              img={ico1}
              text="Over 10+ years of industry experience"
            />
          </div>
          <div className="about-card w-full mx-auto place-items-center">
            <AboutCard
              img={ico2}
              text="Wide range of exclusive designs & categories"
            />
          </div>
          <div className="about-card w-full mx-auto place-items-center">
            <AboutCard
              img={ico3}
              text="Trusted by dealers, retailers & developers across India"
            />
          </div>
          <div className="about-card w-full mx-auto place-items-center">
            <AboutCard
              img={ico4}
              text="Rooted in Morbi's rich ceramic heritage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="mt-16">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8">Visit Us</h1>
        <div className="mt-10 flex justify-evenly flex-col sm:flex-row">
          <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-[20px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78385.89422673696!2d70.7788557436316!3d22.805038235998992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598cd96ce15487%3A0x294863999340c94e!2sMorbi%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1747577736298!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="md:ml-[50px] mt-[50px] md:mt-[0px] text-left w-full">
            <h4 className="text-2xl font-semibold">Address</h4>
            <p className="mt-[50px] text-[12px]">
              Floor No.: 312 Building <br /> No./Flat No.: PLOT NO A SURVEY NO
              1036/P1/P1
              <br />
              Name Of Premises/Building: SARDAR PATEL ARCADE <br /> Road/Street:
              Sardar Patel Road <br />
              Nearby Landmark: HDFC BANK <br />
              Locality/Sub Locality: SURVEY NO 1035 P1 <br />
              City/Town/Village: Morbi <br />
              District: Morbi State: Gujarat <br /> PIN Code: 363641
            </p>
          </div>
        </div>
      </div> */
}
