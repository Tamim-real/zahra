'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Manage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Delete product with SweetAlert confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete product");

        setProducts((prev) => prev.filter((p) => p._id !== id));

        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-purple-700 text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Manage Products</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        )}

        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 group cursor-pointer"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="shimmer absolute w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
            </div>

            {product.imageUrl && (
              <div className="relative w-full h-64">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-bold text-purple-700">{product.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{product.shortDesc}</p>
                <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shimmer {
          top: 0;
          left: -50%;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
