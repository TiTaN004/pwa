// import { useEffect, useRef, useState } from 'react';
// import CatalogueCard from './common/CatalogueCard'
// import { useGSAP } from '@gsap/react';
// import { ExternalLink } from 'lucide-react';
// import gsap from 'gsap';
// import axios from 'axios';

// // Main E-Catalogue Page Component
// export default function ECataloguePage() {
//   const [catalogue,setCatalogue] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const containerRef = useRef(null);
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const cardsRef = useRef(null);

//   useEffect(() => {
//     const res = axios.get('http://localhost/freelancing/panthenterprise/catalogue/operation.php'); // Replace with your API endpoint
//     res.then(response => {
//       // Handle the response data
//       setCatalogue(response.data.data.catalogues); // Assuming the data is in response.data.data
//       // console.log(catalogue)
//       setLoading(false); // Set loading to false after data is fetched
//       // You can set the state with the fetched data if needed
//     }).catch(error => {
//       console.error("Error fetching catalogues:", error);
//     });
//   }, []);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline({
//         defaults: { ease: "power3.out", duration: 1 },
//       });

//       tl.from(titleRef.current, { y: 60, opacity: 0 })
//         .from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.7")
//         .from(cardsRef.current.children, { 
//           y: 80, 
//           opacity: 0, 
//           duration: 0.8,
//           stagger: 0.2 
//         }, "-=0.5");
//     },
//     { scope: containerRef }
//   );

//   // If loading, show a simple loading message
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#010000] text-white">
//         <p className="text-lg">Loading catalogues...</p>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="min-h-screen bg-[#010000] py-28">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 
//             ref={titleRef}
//             className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
//           >
//             E-CATALOGUES
//           </h1>
//           <p 
//             ref={subtitleRef}
//             className="font-montserrat text-base md:text-lg text-white max-w-2xl mx-auto"
//           >
//             Download our comprehensive tile collections and discover the perfect tiles for your project. 
//             Each catalogue features detailed specifications, design inspirations, and installation guides.
//           </p>
//         </div>

//         {/* Catalogues Grid */}
//         <div 
//           ref={cardsRef}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//         >
//           {console.log(catalogue)}
//           {catalogue.map((catalogue) => (
//             <CatalogueCard
//               key={catalogue.id}
//               id={catalogue.id}
//               title={catalogue.name}
//               description={catalogue.description}
//               thumbnail={catalogue.thumbnail}
//               downloadLink={catalogue.url}
//               // fileSize={catalogue.fileSize}
//               // pages={catalogue.pages}
//             />
//           ))}
//         </div>

//         {/* Call to Action Section */}
//         {/* <div className="text-center mt-16 bg-white rounded-[20px] p-8 shadow-lg">
//           <h3 className="font-montserrat text-2xl font-semibold text-gray-900 mb-4">
//             Need a Custom Catalogue?
//           </h3>
//           <p className="font-montserrat text-gray-600 mb-6 max-w-md mx-auto">
//             Contact our team to create a personalized catalogue based on your specific requirements.
//           </p>
//           <button className="bg-[#D5251D] hover:bg-[#b91e17] text-white font-montserrat font-semibold px-8 py-3 rounded-md transition-colors duration-300 flex items-center gap-2 mx-auto">
//             Contact Us
//             <ExternalLink className="w-4 h-4" />
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import CatalogueCard from './common/CatalogueCard'
import gsap from 'gsap';
import axios from 'axios';
import { baseUrl } from '../utils';

// Main E-Catalogue Page Component
export default function ECataloguePage() {
  const [catalogue,setCatalogue] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const res = axios.get(`${baseUrl}/catalogue/operationfinal.php?action=active`);
    res.then(response => {
      setCatalogue(response.data.data.catalogues);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching catalogues:", error);
      setLoading(false); // Set loading to false even on error
    });
  }, []);

  // Alternative approach: Use useEffect to trigger animation after data loads
  useEffect(() => {
    if (!loading && catalogue.length > 0) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.from(titleRef.current, { y: 60, opacity: 0 })
        .from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.7")
        .from(cardsRef.current.children, { 
          y: 80, 
          opacity: 0, 
          duration: 0.8,
          stagger: 0.2 
        }, "-=0.5");
    }
  }, [loading, catalogue.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010000] text-white">
        <p className="text-lg">Loading catalogues...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#010000] py-28">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 
            ref={titleRef}
            className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            E-CATALOGUES
          </h1>
          <p 
            ref={subtitleRef}
            className="font-montserrat text-base md:text-lg text-white max-w-2xl mx-auto"
          >
            Download our comprehensive tile collections and discover the perfect tiles for your project. 
            Each catalogue features detailed specifications, design inspirations, and installation guides.
          </p>
        </div>

        {/* Catalogues Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {catalogue.map((catalogue) => (
            <CatalogueCard
              key={catalogue.id}
              id={catalogue.id}
              title={catalogue.name}
              description={catalogue.description}
              thumbnail={`${baseUrl}/${catalogue?.images[0]?.image_url}`}
              downloadLink={catalogue.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}