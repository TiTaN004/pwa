// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import noise from "../../assets/noise.svg";
// import filter from "../../assets/filter.svg";
// import { createPortal } from "react-dom";

// export default function MobileFilterModel({ onApply, onReset }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false); // ✅ important
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: "",
//     color: [],
//     size: [],
//   });

//   const backdropRef = useRef(null);
//   const modalRef = useRef(null);
//   const tl = useRef(null); // GSAP timeline
//   const noiseRef = useRef(null);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     if (tl.current) {
//       tl.current.reverse();
//     }
//   };

//   const applyFilters = () => {
//     onApply?.(selectedFilters);
//     closeModal();
//   };

//   const resetFilters = () => {
//     setSelectedFilters({ category: "", color: [], size: [] });
//     onReset?.();
//   };

//   const toggleFilter = (type, value) => {
//     setSelectedFilters((prev) => {
//       const current = new Set(prev[type]);
//       current.has(value) ? current.delete(value) : current.add(value);
//       return { ...prev, [type]: Array.from(current) };
//     });
//   };

//   // ✅ Ensure component is mounted before accessing DOM
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!isOpen || !mounted) return;

//     tl.current = gsap.timeline({
//       defaults: { ease: "power2.out" },
//       onReverseComplete: () => setIsOpen(false),
//     });

//     tl.current
//       .set(noiseRef.current, { opacity: 0 })
//       .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
//       .fromTo(modalRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "<")
//       .to(noiseRef.current, { opacity: 0.5, duration: 0.3 }, "<+0.05");

//   }, [isOpen, mounted]);

//   // Prevent background scroll when modal is open
//   useEffect(() => {
//     if (!mounted) return;

//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.touchAction = "none";
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//     };
//   }, [isOpen, mounted]);

//   // Preload noise image
//   useEffect(() => {
//     const link = document.createElement("link");
//     link.rel = "preload";
//     link.as = "image";
//     link.href = noise;
//     document.head.appendChild(link);
//   }, []);

//   if (!mounted) return null; // ⛔️ Avoid rendering at all until mounted

//   return createPortal(
//     <>
//       <button
//         onClick={openModal}
//         className="fixed bottom-4 right-4 w-[55px] h-[55px] bg-[#D5251D] text-black px-4 py-2 rounded-full shadow-lg z-20"
//       >
//         <img src={filter} alt="arrow" className="w-[40px] sm:w-[200px]" />
//       </button>

//       {isOpen && (
//         <div
//           ref={backdropRef}
//           className="fixed inset-0 z-30 bg-opacity-60 flex items-end md:items-center justify-center overflow-hidden"
//         >
//           <div
//             ref={modalRef}
//             className="relative bg-[#010000] w-full md:max-w-md rounded-t-[20px] md:rounded-[20px] p-4 max-h-[calc(100vh-40px)] overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-4 relative z-10">
//               <h2 className="text-white text-xl font-semibold">Filters</h2>
//               <button onClick={closeModal} className="text-white text-2xl">
//                 &times;
//               </button>
//             </div>

//             {/* Category */}
//             <div className="mb-4 relative z-10">
//               <label className="text-white block mb-1">Category</label>
//               <select
//                 className="w-full p-2 rounded bg-[#1e1e1e] text-white"
//                 value={selectedFilters.category}
//                 onChange={(e) =>
//                   setSelectedFilters({ ...selectedFilters, category: e.target.value })
//                 }
//               >
//                 <option value="">Select Category</option>
//                 <option value="floor">Floor Tiles</option>
//                 <option value="wall">Wall Tiles</option>
//                 <option value="marble">Marble</option>
//                 <option value="mosaic">Mosaic</option>
//               </select>
//             </div>

//             {/* Color */}
//             <div className="mb-4 relative z-10">
//               <label className="text-white block mb-2">Color</label>
//               {["White", "Grey", "Black", "Beige"].map((color) => (
//                 <label key={color} className="flex items-center text-white mb-1">
//                   <input
//                     type="checkbox"
//                     value={color}
//                     checked={selectedFilters.color.includes(color)}
//                     onChange={() => toggleFilter("color", color)}
//                     className="mr-2"
//                   />
//                   {color}
//                 </label>
//               ))}
//             </div>

//             {/* Size */}
//             <div className="mb-4 relative z-10">
//               <label className="text-white block mb-2">Size</label>
//               {["600x600", "800x1600", "1000x1000"].map((size) => (
//                 <label key={size} className="flex items-center text-white mb-1">
//                   <input
//                     type="checkbox"
//                     value={size}
//                     checked={selectedFilters.size.includes(size)}
//                     onChange={() => toggleFilter("size", size)}
//                     className="mr-2"
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-6 relative z-10">
//               <button
//                 onClick={resetFilters}
//                 className="bg-white text-black px-6 py-2 rounded-full font-medium"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={applyFilters}
//                 className="bg-[#D5251D] text-white px-6 py-2 rounded-full font-medium"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>,
//     document.body
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import noise from "../../assets/noise.svg";
import filter from "../../assets/filter.svg";
import { createPortal } from "react-dom";
import { baseUrl } from "../../utils";

export default function MobileFilterModel({ onApply, onReset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    size: [],
  });

  // Dynamic data states
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const tl = useRef(null);
  const noiseRef = useRef(null);

  // API URLs
  const CATEGORY_API = `${baseUrl}/products/read/get_all_tile_type.php`;
  const SIZE_API = `${baseUrl}/products/read/get_all_size.php`;

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (tl.current) {
      tl.current.reverse();
    }
  };

  const applyFilters = () => {
    onApply?.(selectedFilters);
    closeModal();
  };

  const resetFilters = () => {
    setSelectedFilters({ category: "", size: [] });
    onReset?.();
  };

  const toggleSizeFilter = (value) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev.size);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, size: Array.from(current) };
    });
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(CATEGORY_API);
      const result = await response.json();
      
      if (result.success && result.data) {
        setCategories(result.data);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  // Fetch sizes from API
  const fetchSizes = async () => {
    try {
      const response = await fetch(SIZE_API);
      const result = await response.json();
      
      if (result.success && result.data) {
        setSizes(result.data);
      } else {
        throw new Error('Failed to fetch sizes');
      }
    } catch (err) {
      console.error('Error fetching sizes:', err);
      setError('Failed to load sizes');
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCategories(), fetchSizes()]);
      } catch (err) {
        console.error('Error loading filter data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Ensure component is mounted before accessing DOM
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    tl.current = gsap.timeline({
      defaults: { ease: "power2.out" },
      onReverseComplete: () => setIsOpen(false),
    });

    tl.current
      .set(noiseRef.current, { opacity: 0 })
      .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(modalRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "<")
      .to(noiseRef.current, { opacity: 0.5, duration: 0.3 }, "<+0.05");

  }, [isOpen, mounted]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen, mounted]);

  // Preload noise image
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = noise;
    document.head.appendChild(link);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        onClick={openModal}
        className="fixed bottom-24 right-8 w-[55px] h-[55px] bg-[#D5251D] text-black px-4 py-2 rounded-full shadow-lg "
      >
        <img src={filter} alt="filter" className="w-[40px] sm:w-[200px]" />
      </button>

      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-[999] bg-opacity-60 flex items-end md:items-center justify-center overflow-hidden"
        >
          <div
            ref={modalRef}
            className="relative bg-[#010000] w-full md:max-w-md rounded-t-[20px] md:rounded-[20px] p-4 max-h-[calc(100vh-40px)] overflow-y-auto"
          >
            {/* Noise background */}
            <div
              ref={noiseRef}
              className="absolute inset-0 bg-cover bg-center opacity-0 rounded-t-[20px] md:rounded-[20px]"
              style={{ backgroundImage: `url(${noise})` }}
            />

            <div className="flex justify-between items-center mb-4 relative z-10">
              <h2 className="text-white text-xl font-semibold">Filters</h2>
              <button onClick={closeModal} className="text-white text-2xl">
                &times;
              </button>
            </div>

            {loading ? (
              <div className="text-white text-center py-8 relative z-10">
                Loading filters...
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4 relative z-10">
                {error}
              </div>
            ) : (
              <>
                {/* Category */}
                <div className="mb-4 relative z-10">
                  <label className="text-white block mb-1">Category</label>
                  <select
                    className="w-full p-2 rounded bg-[#1e1e1e] text-white"
                    value={selectedFilters.category}
                    onChange={(e) =>
                      setSelectedFilters({ ...selectedFilters, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div className="mb-4 relative z-10">
                  <label className="text-white block mb-2">Size</label>
                  <div className="max-h-40 overflow-y-auto">
                    {sizes.map((sizeOption) => (
                      <label key={sizeOption.id} className="flex items-center text-white mb-1">
                        <input
                          type="checkbox"
                          value={sizeOption.size}
                          checked={selectedFilters.size.includes(sizeOption.size)}
                          onChange={() => toggleSizeFilter(sizeOption.size)}
                          className="mr-2"
                        />
                        {sizeOption.size}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6 relative z-10">
              <button
                onClick={resetFilters}
                className="bg-white text-black px-6 py-2 rounded-full font-medium"
                disabled={loading}
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="bg-[#D5251D] text-white px-6 py-2 rounded-full font-medium"
                disabled={loading}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}