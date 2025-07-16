// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function Review() {
//   const [reviews, setReviews] = useState([]);
//   const [offset, setOffset] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true); // To track if more reviews exist
//   const limit = 6;

//   const fetchReview = async (newOffset = 0) => {
//      try {
//       const data = { offset: newOffset, limit };
//       const res = await axios.post(
//         "http://localhost/freelancing/panthenterprise/review/get_all_review.php",
//         data,
//         {headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         }}
//       );

//       const fetched = res.data?.data || [];

//       // If no more reviews are fetched
//       if (fetched.length < limit) {
//         setHasMore(false);
//       }

//       // Append if offset > 0, else reset
//       if (newOffset === 0) {
//         setReviews(fetched);
//       } else {
//         setReviews((prev) => [...prev, ...fetched]);
//       }

//       setOffset(newOffset + limit);
//     } catch (error) {
//       console.error("Failed to fetch reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReview(0)
//   }, [])
  

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <svg
//         key={index}
//         className={`w-5 h-5 ${
//           index < rating ? "text-red-500" : "text-gray-500"
//         }`}
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M10 15l-5.878 3.09 1.122-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.755 4.635 1.122 6.545z" />
//       </svg>
//     ));
//   };

//   return (
//     <section className="bg-black text-white py-16 px-4 md:px-16">
//   <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//     What Our Customers Say
//   </h2>

//   {loading ? (
//         <p className="text-center text-gray-400">Loading reviews...</p>
//       ) : reviews.length === 0 ? (
//         <p className="text-center text-gray-400">No reviews found.</p>
//       ) : (
//         <>
//           <div className="grid gap-8 md:grid-cols-3">
//             {reviews.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-red-600 transition-shadow"
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-red-500 font-bold text-lg">
//                     {item.name.charAt(0)}
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-semibold text-lg">{item.name}</p>
//                     <p className="text-sm text-gray-400">{item.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 italic mb-4">{item.review}</p>
//                 <div className="flex">{renderStars(item.star)}</div>
//               </div>
//             ))}
//           </div>

//           {/* Load More Button */}
//           {hasMore && (
//             <div className="text-center mt-8">
//               <span
//                 className=" text-gray-500 hover:text-red-600 transition cursor-pointer"
//                 onClick={() => fetchReview(offset)}
//               >
//                 Load More
//               </span>
//             </div>
//           )}
//         </>
//       )}
// </section>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(6);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    mobile: "",
    star: 0,
    status: 0
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  const limit = 6;

  const fetchReview = async (newOffset = 0) => {
    try {
      const data = { offset: newOffset, limit };
      const res = await axios.post(
        `${baseUrl}/review/get_front_review.php`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      const fetched = res.data?.data || [];

      if (fetched.length < limit) {
        setHasMore(false);
      }

      if (newOffset === 0) {
        setReviews(fetched);
      } else {
        setReviews((prev) => [...prev, ...fetched]);
      }

      setOffset(newOffset + limit);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview(0);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-red-500" : "text-gray-500"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.755 4.635 1.122 6.545z" />
      </svg>
    ));
  };

  const renderStarSelector = (currentRating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          index < currentRating ? "text-red-500" : "text-gray-400 hover:text-red-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        onClick={() => setFormData({ ...formData, star: index + 1 })}
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.755 4.635 1.122 6.545z" />
      </svg>
    ));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.review.trim()) {
      newErrors.review = "Review is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (formData.star === 0) {
      newErrors.star = "Rating is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await axios.post(
        `${baseUrl}/review/add_review.php`, // Adjust this URL as needed
        formData
      );

      console.log(formData)
      console.log(response)

      if (response.data.success) {
        // Reset form
        setFormData({
          name: "",
          role: "",
          review: "",
          mobile: "",
          star: 0,
          status: 0
        });
        setErrors({});
        setShowPopup(false);
        
        // Optionally refresh reviews
        fetchReview(0);
        
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData({
      name: "",
      role: "",
      review: "",
      mobile: "",
      star: 0,
      status: 0
    });
    setErrors({});
  };

  return (
    <section className="bg-black text-white py-16 px-4 md:px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center sm:text-left">
          What Our Customers Say
        </h2>
        <button
          onClick={() => setShowPopup(true)}
          className="text-red-500 hover:text-red-400 transition-colors text-sm font-medium  decoration-red-500 hover:decoration-red-400 underline-offset-4"
        >
          Add Review
        </button>
      </div>

      {loading ? (
        <div className="bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reviews...</p>
        </div>
      </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-400">No reviews found.</p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-red-600 transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-red-500 font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">{item.review}</p>
                <div className="flex">{renderStars(item.star)}</div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <span
                className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                onClick={() => fetchReview(offset)}
              >
                Load More
              </span>
            </div>
          )}
        </>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Your Review</h3>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Your role/position"
                />
              </div>

              {/* Review Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Write your review..."
                  rows="4"
                />
                {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, mobile: value });
                  }}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-1">
                  {renderStarSelector(formData.star)}
                </div>
                {errors.star && <p className="text-red-500 text-sm mt-1">{errors.star}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closePopup}
                  className="w-full sm:flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 rounded-lg transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}