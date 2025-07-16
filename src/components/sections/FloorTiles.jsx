import { Button } from "@material-tailwind/react";
import React from "react";
import img from "../../assets/section3.png";

export default function FloorTiles() {
  return (
    // <div className=" text-white h-screen bg-[#010000] flex justify-center">
    //   <div className="w-[95%] md:w-[90%] max-[500px]:max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center min-[500px]:justify-between">
    //     <div className="flex justify-center items-center">
    //       <img
    //         src={img}
    //         alt="model image"
    //         className="w-[300px] max-w-[5000px] md:w-[490px] lg:w-[490px] rounded-[46px]"
    //       />
    //     </div>

    //     <div className=" md:text-left max-[500px]:mt-[40px] ">
    //       <h3 className="font-montserrat md:text-[15px] mt-3 text-[10px] mb-2 font-light">
    //         Built to Last, Designed to Impress
    //       </h3>
    //       <h1 className="font-montserrat text-[#ccc] font-semibold text-2xl md:text-5xl leading-tight max-[500px]:w-[90vw]">
    //         Our Floor Tiles Collection
    //       </h1>
    //       <p className="font-montserrat md:text-[15px] mt-3 text-[10px] mb-2 font-light w-[300px] md:w-[500px]">
    //         Step into elegance with our premium floor tiles, crafted to elevate
    //         every corner of your space. From sleek modern finishes to timeless
    //         textures, our collection offers the perfect blend of strength and
    //         style. Ideal for homes, offices, or commercial settings, these tiles
    //         are designed to withstand daily wear while enhancing your interior’s
    //         overall charm.{" "}
    //       </p>
    //       <Button className="bg-[#D5251D] mt-6 md:mt-8 rounded-[6px] h-[45px] w-[200px] min-[500px]:w-[220px] font-montserrat font-semibold text-sm md:text-base">
    //         Refine Your Interiors
    //       </Button>
    //     </div>
    //   </div>
    // </div>



    // <div className="text-white h-screen bg-[#010000] flex justify-center">
    //   <div className="w-[95%] md:w-[90%] max-w-[95%] mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
        <div className="text-white h-screen bg-[#010000] flex justify-center items-center">
  <div className="w-full max-w-[95%] flex flex-col md:flex-row items-center lg:justify-between gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center md:w-1/2">
          <img
            src={img}
            alt="model image"
            className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[490px] rounded-[46px]"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 mt-8 md:mt-0">
          <h3 className="font-montserrat text-[10px] md:text-[15px] font-light mb-2">
            Built to Last, Designed to Impress
          </h3>
          <h1 className="font-montserrat text-[#ccc] font-semibold text-2xl md:text-5xl leading-tight">
            Our Floor Tiles Collection
          </h1>
          <p className="font-montserrat text-[10px] md:text-[15px] font-light mt-3 w-[90%] md:w-[100%] mx-auto md:mx-0">
            Step into elegance with our premium floor tiles, crafted to elevate
            every corner of your space. From sleek modern finishes to timeless
            textures, our collection offers the perfect blend of strength and
            style. Ideal for homes, offices, or commercial settings, these tiles
            are designed to withstand daily wear while enhancing your interior’s
            overall charm.
          </p>
          <Button className="bg-[#D5251D] mt-6 md:mt-8 rounded-md h-[45px] w-4/5 sm:w-auto px-6 font-montserrat font-semibold text-sm md:text-base">
            Refine Your Interiors
          </Button>
        </div>
      </div>
    </div>
  );
}
