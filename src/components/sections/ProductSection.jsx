// import React, { useEffect, useRef, useState } from "react";
// import MobileFilterModel from "../common/MobileFilterModel";
// import Card from "../common/Card";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import axios from "axios";

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(useGSAP);
// export default function ProductSection() {
//   const [tiles, setTiles] = useState([]);
//   const [offset, setOffset] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 6;

//   const cardsRef = useRef([]);

//   useGSAP(
//     () => {
//       if (!cardsRef.current.length) return;

//       cardsRef.current.forEach((el, i) => {
//         if (!el) return;

//         gsap.fromTo(
//           el,
//           { y: 40, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             delay: i * 0.05,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: el,
//               start: "top 85%",
//             },
//           }
//         );
//       });
//     },
//     { dependencies: [tiles], scope: cardsRef }
//   );

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

//   return (
//     <>

//       <div className="pt-20 bg-[#010000]">
//         <MobileFilterModel />
//         <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-center items-center">
          
//           {loading ? (
//             <div className="min-h-screen bg-black text-white flex items-center justify-center">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
//                 <p className="text-gray-400">Loading products...</p>
//               </div>
//             </div>
//           ) : tiles.length === 0 ? (
//             <p className="text-center text-gray-400 col-span-full">
//               No Tiles found.
//             </p>
//           ) : (
//             tiles.map((item, i) => (
//               <div
//                 key={`${item.id}-${i}`} // Better key for React
//                 ref={(el) => {
//                   if (el) {
//                     cardsRef.current[i] = el;
//                   }
//                 }}
//                 className="flex justify-center"
//               >
//                 <Card
//                   id={item.id}
//                   name={item.name}
//                   slug={item.slug}
//                   img={item.image_url}
//                   type={item.tile_type}
//                 />
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
// -----------------------------------------------------------------------------------------------------------------------------------------------
      {/* <div className="pt-20 bg-[#010000]">
        <MobileFilterModel />
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-full sm:w-auto flex justify-center sm:justify-start"
            >
              <Card />
            </div>
          ))}
        </div>
      </div> */}
{/* {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex justify-center"
            >
              <Card />
            </div>
          ))} */}
  // useGSAP(() => {
  //   // Animate cards with stagger
  //   cardsRef.current.forEach((el, i) => {
  //     gsap.from(el, {
  //       y: 40,
  //       opacity: 0,
  //       duration: 0.8,
  //       delay: i * 0.05,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 85%",
  //       },
  //     });
  //   });
  // }, []);

  // -------------------------------------------------------------------------------------------------------------------------------------

  import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MobileFilterModel from '../common/MobileFilterModel';
import Card from '../common/Card';
import { baseUrl } from '../../utils';

export default function ProductSection() {
  const [tiles, setTiles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    size: []
  });
  const [totalCount, setTotalCount] = useState(0);
  
  const limit = 8;
  const cardsRef = useRef([]);

  // API endpoint
  const API_URL = `${baseUrl}/products/read/get_filtered_tile.php`;

  useGSAP(
    () => {
      if (!cardsRef.current.length) return;

      cardsRef.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    },
    { dependencies: [tiles], scope: cardsRef }
  );

  const fetchTiles = async (newOffset = 0, filters = null, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const filtersToUse = filters || activeFilters;
      
      const requestData = {
        offset: newOffset,
        limit: limit,
        category: filtersToUse.category || '',
        size: filtersToUse.size || []
      };

      const res = await axios.post(API_URL, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        const fetched = res.data.data || [];
        const pagination = res.data.pagination || {};
        
        setTotalCount(pagination.total || 0);
        setHasMore(pagination.has_more || false);

        // Append if loading more, else reset
        if (isLoadMore && newOffset > 0) {
          setTiles((prev) => [...prev, ...fetched]);
        } else {
          setTiles(fetched);
        }

        setOffset(newOffset + limit);
      } else {
        console.error("API Error:", res.data.error);
        if (!isLoadMore) {
          setTiles([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch tiles:", error);
      if (!isLoadMore) {
        setTiles([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle filter application
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setOffset(0);
    fetchTiles(0, filters, false);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    const emptyFilters = { category: '', size: [] };
    setActiveFilters(emptyFilters);
    setOffset(0);
    fetchTiles(0, emptyFilters, false);
  };

  // Load more tiles
  const loadMore = () => {
    if (hasMore && !loadingMore) {
      fetchTiles(offset, activeFilters, true);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTiles(0);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = activeFilters.category !== '' || activeFilters.size.length > 0;
  return (
    <>
      <div className="pt-28 bg-[#010000]">
        <MobileFilterModel 
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        
        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-4">
            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2 text-white">
                <span className="text-sm text-gray-400">Active filters:</span>
                {activeFilters.category && (
                  <span className="bg-[#D5251D] text-white px-3 py-1 rounded-full text-sm">
                    Category: {activeFilters.category}
                  </span>
                )}
                {activeFilters.size.map((size, index) => (
                  <span key={index} className="bg-[#D5251D] text-white px-3 py-1 rounded-full text-sm">
                    Size: {size}
                  </span>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="text-gray-400 hover:text-white text-sm underline ml-2"
                >
                  Clear all
                </button>
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {totalCount} tiles found
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
          {loading ? (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading products...</p>
              </div>
            </div>
          ) : tiles.length === 0 ? (
            <div className="text-center text-gray-400 col-span-full py-16">
              <p className="text-xl mb-4">No tiles found</p>
              {hasActiveFilters && (
                <p className="text-sm">
                  Try adjusting your filters or{' '}
                  <button
                    onClick={handleResetFilters}
                    className="text-[#D5251D] hover:underline"
                  >
                    clear all filters
                  </button>
                </p>
              )}
            </div>
          ) : (
            <>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-center items-center">
                {tiles.map((item, i) => (
                  <div
                    key={`${item.id}-${i}`}
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
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="bg-[#D5251D] text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading...
                      </span>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}