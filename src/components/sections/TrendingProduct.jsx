// import React, { useEffect, useRef, useState } from "react";
// import Card from "../common/Card";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import axios from "axios";
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(useGSAP);

// export default function TrendingProduct() {

//   const [tiles, setTiles] = useState([]);
//   const [offset, setOffset] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);

//   const headingRef = useRef(null);
//   const cardsRef = useRef([]);

//   const limit = 6;

//   const fetchTiles = async (newOffset = 0) => {
//     try {
//       const data = { offset: newOffset, limit };
//       const res = await axios.post(
//         "http://localhost/freelancing/panthenterprise/products/read/get_all_tile.php",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const fetched = res.data?.data || [];

//       // If no more reviews are fetched
//       if (fetched.length < limit) {
//         setHasMore(false);
//       }

//       // Append if offset > 0, else reset
//       if (newOffset === 0) {
//         setTiles(fetched);
//       } else {
//         setTiles((prev) => [...prev, ...fetched]);
//       }

//       setOffset(newOffset + limit);
//     } catch (error) {
//       console.error("Failed to fetch reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTiles(0);
//   }, []);

//   useGSAP(() => {
//     // Animate heading
//     gsap.from(headingRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: headingRef.current,
//         start: "top 80%",
//       },
//     });

//     // Animate cards with stagger
//     cardsRef.current.forEach((el, i) => {
//       gsap.from(el, {
//         y: 40,
//         opacity: 0,
//         duration: 0.8,
//         delay: i * 0.05,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: el,
//           start: "top 85%",
//         },
//       });
//     });
//   }, []);

//   return (
//     <>
//       <div className="text-white py-20 bg-[#010000] flex flex-col justify-center">
//         {/* Heading */}
//         <div
//           ref={headingRef}
//           className="w-full mx-auto px-4 md:px-8 mb-8 text-center md:text-left"
//         >
//           <h3 className="font-montserrat text-[12px] md:text-[15px] font-light mb-2">
//             Built to Last, Designed to Impress
//           </h3>
//           <h1 className="font-montserrat text-[#fff] font-semibold text-2xl md:text-5xl leading-tight">
//             Our Floor Tiles Collection
//           </h1>
//         </div>

//         {/* Grid Section */}
//         <div className="bg-[#010000]">
//           <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-center items-center">
//             {/* {Array.from({ length: 10 }).map((_, i) => (
//               <div
//                 key={i}
//                 ref={(el) => (cardsRef.current[i] = el)}
//                 className="flex justify-center"
//               >
//                 <Card />
//               </div>
//             ))} */}

//             {loading ? (
//         <p className="text-center text-gray-400">Loading reviews...</p>
//       ) : tiles.length === 0 ? (
//         <p className="text-center text-gray-400">No Tiles found.</p>
//       ) : (
//         <>
//             {tiles.map((item, i) => (
//               <div
//                 key={i}
//                 ref={(el) => (cardsRef.current[i] = el)}
//                 className="flex justify-center"
//               >
//                 <Card id={item.id} name={item.name} slug={item.slug} img={item.image_url} type={item.tile_type} />
//               </div>
//             ))}
//         </>
//       )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import Card from "../common/Card";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { baseUrl } from "../../utils";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function TrendingProduct() {
  const [tiles, setTiles] = useState([]);
  const [offset, setOffset] = useState(6);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const limit = 8;

  const fetchTiles = async (newOffset = 0) => {
    try {
      const data = { offset: newOffset, limit };
      const res = await axios.post(
        `${baseUrl}/products/read/get_all_tile.php`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const fetched = res.data?.data || [];

      // If no more reviews are fetched
      if (fetched.length < limit) {
        setHasMore(false);
      }

      // Append if offset > 0, else reset
      if (newOffset === 0) {
        setTiles(fetched);
      } else {
        setTiles((prev) => [...prev, ...fetched]);
      }

      setOffset(newOffset + limit);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiles(0);
  }, []);

  // Animate heading once on component mount
  useGSAP(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  // Animate cards whenever tiles data changes
  useGSAP(() => {
    if (tiles.length > 0 && !loading) {
      // Clear previous animations
      gsap.killTweensOf(cardsRef.current);

      // Ensure cardsRef array is properly sized
      cardsRef.current = cardsRef.current.slice(0, tiles.length);

      // Animate cards with stagger
      cardsRef.current.forEach((el, i) => {
        if (el) {
          // Reset initial state
          gsap.set(el, { y: 40, opacity: 0 });

          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true, // Animation runs only once
            },
          });
        }
      });

      // Refresh ScrollTrigger after new content is added
      ScrollTrigger.refresh();
    }
  }, [tiles, loading]); // Dependencies: run when tiles or loading state changes

  // Cleanup function
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="text-white py-20 bg-[#010000] flex flex-col justify-center">
        {/* Heading */}
        <div
          ref={headingRef}
          className="w-full mx-auto px-4 md:px-8 mb-8 text-center md:text-left"
        >
          <h3 className="font-montserrat text-[12px] md:text-[15px] font-light mb-2">
            Built to Last, Designed to Impress
          </h3>
          <h1 className="font-montserrat text-[#fff] font-semibold text-2xl md:text-5xl leading-tight">
            Our Floor Tiles Collection
          </h1>
        </div>

        {/* Grid Section */}
        <div className="bg-[#010000]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-center items-center">
            {loading ? (
              <div className="bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading products...</p>
                </div>
              </div>
            ) : tiles.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No Tiles found.
              </p>
            ) : (
              tiles.map((item, i) => (
                <div
                  key={`${item.id}-${i}`} // Better key for React
                  ref={(el) => {
                    if (el) {
                      cardsRef.current[i] = el;
                    }
                  }}
                  className="flex justify-center"
                >
                  <Card
                    id={item.id}
                    name={item.name}
                    slug={item.slug}
                    img={item.image_url}
                    type={item.tile_type}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
