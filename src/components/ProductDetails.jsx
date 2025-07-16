import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Assuming you're using React Router
import { baseUrl } from "../utils";

export default function ProductDetails() {
  const { slug } = useParams(); // e.g. '17-beautiful-white-marble'
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const id = slug?.split("-")[0]; // '17'
  


  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/products/read/get_tile.php`,
        { tile_id: id }, // or { product_id: slug } depending on your API
      );

      if (response.data?.success && response.data?.data) {
        setProduct(response.data.data);

      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigate()

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  // Handle multiple images (assuming images could be an array or single image)
//   const images = Array.isArray(product.image) ? product.image : [product.image];
//   const validImages = images.filter(img => img && img.trim() !== '');

const images = Array.isArray(product.images)
  ? product.images.map((imgObj) => imgObj.image_url)
  : [];

const validImages = images.filter((img) => img && img.trim() !== '');

  return (
    <div className="min-h-screen pt-32 bg-[#010000] text-white">
      {/* Navigation/Breadcrumb */}
      <div className=" px-4 md:px-16 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <span className="text-gray-500">/</span>
          <span className="text-red-500">{product.slug}</span>
        </nav>
      </div>

      <div className="px-4 md:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
                {validImages.length > 0 ? (
                  <img
                    src={`${baseUrl}/`+validImages[selectedImage] || validImages[0]}
                    alt={product.title || "Product"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE2MS4zIDEwMCAxMzAgMTMxLjMgMTMwIDE3MFMxNjEuMyAyNDAgMjAwIDI0MFMyNzAgMjA4LjcgMjcwIDE3MFMyMzguNyAxMDAgMjAwIDEwMFpNMjAwIDIxMEMxNzcuOSAyMTAgMTYwIDE5Mi4xIDE2MCAxNzBTMTc3LjkgMTMwIDIwMCAxMzBTMjQwIDE0Ny45IDI0MCAxNzBTMjIyLjEgMjEwIDIwMCAyMTBaIiBmaWxsPSIjNkI3Mjg5Ii8+CjxwYXRoIGQ9Ik0zMDAgMjgwSDEwMEMxMzUuNCAyODAgMTY1IDMwOS42IDE2NSAzNDVIMjM1QzIzNSAzMDkuNiAyNjQuNiAyODAgMzAwIDI4MFoiIGZpbGw9IiM2QjcyODkiLz4KPC9zdmc+";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>No Image Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {validImages.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {validImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-red-500 ring-2 ring-red-500/50"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {product.tile_name || "Product Name"}
                </h1>
                {product.type_name && (
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-medium">
                      {product.type_name}
                    </span>
                  </div>
                )}
              </div>

              {/* Size Information */}
              {product.size_name && (
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">Size Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-white">{product.size_name}</div>
                      <div className="text-sm text-gray-400">Dimensions</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Description</h3>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  {product.description ? (
                    product.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No description available</p>
                  )}
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.type && (
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                    <h4 className="font-semibold text-red-400 mb-2">Type</h4>
                    <p className="text-gray-300">{product.type_name}</p>
                  </div>
                )}
                
                {product.size && (
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                    <h4 className="font-semibold text-red-400 mb-2">Size</h4>
                    <p className="text-gray-300">{product.size_name}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {/* <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium transition-colors">
                  Get Quote
                </button> */}
                <button onClick={()=>navigation('/contact')} className="flex-1 border border-gray-600 hover:border-gray-500 text-white py-3 px-6 rounded-xl font-medium transition-colors">
                  Contact Us
                </button>
                <button onClick={()=>navigation('/e-catalogue')} className="flex-1 border border-gray-600 hover:border-gray-500 text-white py-3 px-6 rounded-xl font-medium transition-colors">
                  E-Catalogues
                </button>
              </div>

              {/* Additional Info */}
              {/* <div className="bg-gradient-to-r from-red-600/10 to-transparent rounded-xl p-6 border border-red-600/20">
                <h4 className="font-semibold text-red-400 mb-2">Need Help?</h4>
                <p className="text-gray-300 text-sm">
                  Contact our team for detailed specifications, pricing, or custom requirements.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}