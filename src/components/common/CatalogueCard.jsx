import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Download, FileText, ExternalLink } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function CatalogueCard({ id, title, description, thumbnail, downloadLink, fileSize, pages }) {
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

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  const handleDownload = () => {
    window.open(downloadLink, '_blank');
  };
  return (
        <div
      ref={cardRef}
      className="relative w-full rounded-[20px] bg-white flex flex-col items-center justify-between px-[8px] pt-[16px] pb-[8px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Download Button */}
      <div
        ref={btnRef}
        onClick={handleDownload}
        className="absolute w-[55px] h-[55px] bg-[#D5251D] rounded-full z-10 bottom-[5%] right-[6%] flex justify-center items-center shadow-md hover:bg-[#b91e17] transition-colors duration-300"
      >
        <Download className="w-[16px] h-[16px] text-white" />
      </div>

      {/* Text Content */}
      <div className="text-left self-start w-full">
        <h3 className="font-montserrat text-[14px] text-black min-[320px]:text-[15px] sm:text-[17px] md:text-[18px] font-semibold">
          {title}
        </h3>
        <p className="font-montserrat text-[10px] text-[#676767] font-semibold mt-[4px]">
          E-Catalogue
        </p>
        <p className="font-montserrat text-[11px] text-black sm:text-[12px] font-medium mt-1">
          {description}
        </p>
        
        {/* File Info */}
        {/* <div className="flex items-center gap-4 mt-2">
          <span className="font-montserrat text-[10px] text-[#676767] font-medium">
            {pages} pages
          </span>
          <span className="font-montserrat text-[10px] text-[#676767] font-medium">
            {fileSize}
          </span>
        </div> */}
      </div>

      {/* Thumbnail Image */}
      <div className="w-full mt-[10px] relative overflow-hidden rounded-[15px]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[280px] object-cover rounded-[15px] transition-transform duration-300 hover:scale-105"
        />
        {/* Overlay for PDF icon */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-60 rounded-lg p-2">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}
