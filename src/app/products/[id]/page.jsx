'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clean and validate the ID
    let id = params?.id;
    if (!id) {
      console.error("No product ID provided");
      setLoading(false);
      return;
    }

    id = id.trim();              // Remove spaces
    if (id.endsWith("/")) id = id.slice(0, -1); // Remove trailing slash

    if (id.length !== 24) {
      console.error("Invalid product ID length:", id);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) return <p className="text-center mt-20 text-purple-700">Loading...</p>;
  if (!product) return <p className="text-center mt-20 text-red-500">Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 mt-20 p-6 flex justify-center">
      <div className="w-11/12 lg:w-8/12 bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">{product.title}</h1>

        {product.imageUrl && (
          <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-3xl clip-custom">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-3xl transform transition duration-500 hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="shimmer absolute w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        )}

        <p className="text-gray-700 text-lg mb-4">{product.fullDesc}</p>
        <p className="text-gray-800 font-bold text-2xl mb-6">${product.price}</p>

        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition"
        >
          Go Back
        </button>
      </div>

      <style jsx>{`
        .clip-custom { clip-path: polygon(0 0, 100% 5%, 100% 95%, 0 100%); }
        @media (min-width: 1024px) { .clip-custom { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
        .shimmer { top: 0; left: -50%; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
}
