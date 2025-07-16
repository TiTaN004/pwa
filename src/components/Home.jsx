import React from "react";
import Hero from "./sections/Hero";
import TrendingProduct from "./sections/TrendingProduct";
import TileTypeSection from "./common/TileTypeSection";
import wallImg from "../assets/section2.png";
import floorImg from "../assets/section3.png";
import marbles from "../assets/desktop-marbles.png";
import Review from "./sections/Review";
export default function Home() {
  return (
    <>
      {/* <SmoothScroller> */}
      <div className="bg-[#010000]">
        <Hero
          heroImages={[wallImg, floorImg, marbles]}
          onImageChange={(index, src) => {}}
          autoChangeInterval={4000}
          enableAutoPlay={true}
        />
        <TileTypeSection
          isReverse={true}
          isSectionRev={false}
          autoChangeInterval={3000} // 5 seconds
          images={[wallImg]}
          onImageChange={(index, src) => {}}
          heading={"Our Wall Tiles Collection"}
          subHeading={"Elegant designs crafted to elevate every space."}
          content={
            "Discover a curated selection of premium wall tiles designed to add sophistication and style to any room. Whether you're transforming a bathroom, kitchen, or living space, our tiles combine durability with stunning aesthetics. With a variety of textures, colors, and finishes, you’ll find the perfect match to bring your vision to life."
          }
          buttonText={"Refine Your Interiors"}
        />
        <TileTypeSection
          isReverse={false}
          isSectionRev={true}
          autoChangeInterval={3000} // 5 seconds
          images={[floorImg]}
          onImageChange={(index, src) => {}}
          heading={"Our Floor Tiles Collection"}
          subHeading={"Built to Last, Designed to Impress"}
          content={
            "Step into elegance with our premium floor tiles, crafted to elevate every corner of your space. From sleek modern finishes to timeless textures, our collection offers the perfect blend of strength and style. Ideal for homes, offices, or commercial settings, these tiles are designed to withstand daily wear while enhancing your interior’s overall charm."
          }
          buttonText={"Refine Your Interiors"}
        />
        <Review />
        <TrendingProduct />
      </div>
      {/* </SmoothScroller> */}
    </>
  );
}
