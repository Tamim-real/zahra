'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductDetail({ id }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id.length !== 24) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || `Error: ${res.status}`);
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or invalid ID");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-purple-700">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 mt-20 p-6 flex justify-center">
      <div className="w-11/12 lg:w-8/12 bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          {product.title}
        </h1>

        {product.imageUrl && (
          <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-3xl clip-custom">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-3xl transform transition duration-500 hover:scale-105"
            />
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
    </div>
  );
}
