import React, { useRef } from "react";
import arrow from "../../assets/arrow.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils";

gsap.registerPlugin(useGSAP);

export default function Card({ id, name, slug, img, type }) {
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Set initial button state
      gsap.set(btnRef.current, { y: 40, opacity: 0 });

      const onEnter = () => {
        gsap.to(btnRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(btnRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });
      };

      const el = cardRef.current;
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      // Cleanup
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => mm.revert(); // Clean up all media queries when component unmounts
  }, []);

  return (
    <>
      {/* <div className="relative w-full  rounded-[20px] bg-white flex flex-col items-center justify-between px-[8px] pt-[16px] pb-[8px]">
          <div
            ref={btnRef}
            className="absolute w-[55px] h-[55px] sm:w-[55px] sm:h-[55px] bg-white rounded-full z-10 bottom-[5%] right-[6%] cursor-pointer flex justify-center items-center shadow-md"
          >
            <img src={arrow} alt="arrow" className="w-[14px] sm:w-[16px]" />
          </div>

          <div className="text-left self-start">
            <p className="font-montserrat text-[14px] text-black min-[320px]:text-[15px] sm:text-[17px] md:text-[18px] font-semibold">
              PORCELINE Tile
            </p>
            <p className="font-montserrat text-[10px] text-[#676767] font-semibold mt-[4px]">
              Series
            </p>
            <p className="font-montserrat text-[11px] text-black sm:text-[12px] font-semibold">
              Double Charge
            </p>
          </div>

          <img
            src={tile}
            alt="tile"
            className="w-full rounded-[20px] mt-[10px]"
          />
        </div> */}
      <div
        ref={cardRef}
        className="relative w-full rounded-[20px] bg-white flex flex-col items-center justify-between px-[8px] pt-[16px] pb-[8px] cursor-pointer"
      >
        {/* Floating Circle Button */}
        <Link to={`/product/${id}-${slug}`}>
          <div
            ref={btnRef}
            className="absolute w-[55px] h-[55px] bg-white rounded-full z-10 bottom-[5%] right-[6%] flex justify-center items-center shadow-md"
          >
            <img src={arrow} alt="arrow" className="w-[14px] sm:w-[16px]" />
          </div>
        </Link>

        {/* Text Content */}
        <div className="text-left self-start">
          <p className="font-montserrat text-[14px] text-black min-[320px]:text-[15px] sm:text-[17px] md:text-[18px] font-semibold">
            {name}
          </p>
          <p className="font-montserrat text-[10px] text-[#676767] font-semibold mt-[4px]">
            Series
          </p>
          <p className="font-montserrat text-[11px] text-black sm:text-[12px] font-semibold">
            {type}
          </p>
        </div>

        {/* Tile Image */}
        <img
          // src={`http://localhost/freelancing/panthenterprise/uploads/tile_684b0203d3eb9_tile.png`}
          src={`${baseUrl}/${img}`}
          alt="tile"
          className="w-full rounded-[20px] mt-[10px] h-[311px]"
        />
      </div>
    </>
  );
}
{
  /* <div className="relative max-[500px]:h-[270px] max-[500px]:w-[200px]  md:h-[350px] md:w-[260px] max-w-[260px] max-h-[350px] rounded-[20px] bg-white flex flex-col items-center justify-between ">
        <div className="rounded-full bg-white w-[55px] h-[55px] z-10 absolute top-[281px] right-[14px] cursor-pointer flex justify-center items-center">
            <img src={arrow} alt="arrow" srcset="" className=""/>
        </div>
        <div className="text-left ml-[6px] mt-[20px] clear-both self-start">
        <p className="font-montserrat text-[18px] font-semibold ">PORCELINE Tile </p>
        <p className="font-montserrat text-[10px] text-[#676767] font-semibold mt-[8px]">Series</p>
        <p className="font-montserrat text-[12px] font-semibold">Double Charge</p>
        </div>
        <img src={tile} alt="tile" srcset="" className="w-[247px] max-w-[247px]  rounded-[20px] mb-[6px]"/>
        
      </div> */
}
{
  /* <div className="relative w-[90vw] max-w-[260px] h-[90vw] max-h-[350px] rounded-[20px] bg-white flex flex-col items-center justify-between">
          <div className="absolute w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] md:w-[55px] md:h-[55px] bg-white rounded-full z-10 bottom-[12px] right-[12px] cursor-pointer flex justify-center items-center shadow-md">
            <img src={arrow} alt="arrow" className="w-[16px] sm:w-[20px]" />
          </div>

          <div className="text-left ml-[6px] mt-[20px] self-start">
            <p className="font-montserrat text-[16px] sm:text-[17px] md:text-[18px] font-semibold">
              PORCELINE Tile
            </p>
            <p className="font-montserrat text-[10px] text-[#676767] font-semibold mt-[6px]">
              Series
            </p>
            <p className="font-montserrat text-[11px] sm:text-[12px] font-semibold">
              Double Charge
            </p>
          </div>
          <img
            src={tile}
            alt="tile"
            className="w-[95%] sm:w-[95%] sm:h-[95%] rounded-[20px] mb-[6px]"
          />
        </div> */
}
