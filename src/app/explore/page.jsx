'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("none"); 
  const router = useRouter();

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        // Ensure _id is a string
        const productsWithStringId = data.map(p => ({
          ...p,
          _id: p._id.toString()
        }));
        setProducts(productsWithStringId);
        setFilteredProducts(productsWithStringId);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 
  useEffect(() => {
    let tempProducts = [...products];

  
    if (search.trim() !== "") {
      tempProducts = tempProducts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortPrice === "asc") {
      tempProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortPrice === "desc") {
      tempProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(tempProducts);
  }, [search, sortPrice, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-purple-700 text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Explore Products</h1>


      <div className="w-full max-w-4xl mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="p-3 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        )}

        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 group"
          >
           
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

              
              <button
                onClick={() => {
                 
                  if (product._id && product._id.length === 24) {
                    router.push(`/products/${product._id}`);
                  } else {
                    console.error("Invalid product ID:", product._id);
                  }
                }}
                className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
