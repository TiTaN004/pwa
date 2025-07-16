import React from "react";
import img from "../../assets/section2.png";
import { Button } from "@material-tailwind/react";
export default function WallTiles() {
  return (
    <div className="text-white h-screen bg-[#010000] flex justify-center items-center">
  <div className="w-full max-w-[95%]  flex flex-col-reverse md:flex-row items-center lg:justify-between gap-8">
    {/* w-[95%] md:w-[90%] max-w-[95%] mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 */}
    {/* Text Section */}
    <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
      <h3 className="font-montserrat text-[10px] md:text-[15px] font-light mb-2">
        Elegant designs crafted to elevate every space.
      </h3>
      <h1 className="font-montserrat text-[#ccc] font-semibold text-2xl md:text-5xl leading-tight">
        Our Wall Tiles Collection
      </h1>
      <p className="font-montserrat text-[10px] md:text-[15px] font-light mt-3 w-[90%] md:w-[100%] mx-auto md:mx-0">
        Discover a curated selection of premium wall tiles designed to add
        sophistication and style to any room. Whether you're transforming a
        bathroom, kitchen, or living space, our tiles combine durability
        with stunning aesthetics. With a variety of textures, colors, and
        finishes, you’ll find the perfect match to bring your vision to
        life.
      </p>
      <Button className="bg-[#D5251D] mt-6 md:mt-8 rounded-md h-[45px] w-4/5 sm:w-auto px-6 font-montserrat font-semibold text-sm md:text-base">
        Refine Your Interiors
      </Button>
    </div>

    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center relative">
      <img
        src={img}
        alt="model image"
        className="w-[300px] sm:w-[350px] md:w-[420px] lg:w-[460px] xl:w-[490px] rounded-[20px] z-10"
      />
    </div>
  </div>
</div>

  );
}
