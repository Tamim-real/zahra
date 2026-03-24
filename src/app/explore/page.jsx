'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Heart, Search, SlidersHorizontal } from "lucide-react";

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("none");
  const [isLikedMap, setIsLikedMap] = useState({}); // Tracking likes for each product
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
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

  const toggleLike = (id) => {
    setIsLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="animate-pulse text-purple-600 font-bold text-xl tracking-widest">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black mt-20 p-4 md:p-10">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">
          EXPLORE <span className="italic font-light text-purple-600">COLLECTIONS</span>
        </h1>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search unique art..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition-all"
            />
          </div>
          <div className="relative w-full md:w-auto">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 md:hidden" />
            <select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              className="w-full md:w-auto pl-10 md:pl-4 pr-10 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none appearance-none cursor-pointer font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
            >
              <option value="none">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid - 2 columns on mobile, 3/4 on desktop */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="relative group w-full transition-all duration-700">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-lg md:shadow-2xl">
              
              {/* Image Section */}
              <div className="relative aspect-[4/5] m-1.5 md:m-3 overflow-hidden rounded-[20px] md:rounded-[32px] z-10">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                
                {/* Like Button */}
                <button 
                  onClick={() => toggleLike(product._id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30 transition-all active:scale-90 z-20"
                >
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLikedMap[product._id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
              </div>

              {/* Content Section */}
              <div className="px-3 pb-4 pt-1 md:px-6 md:pb-8 md:pt-2 text-left">
                <div className="flex flex-col mb-2 md:mb-4">
                  <h3 className="text-sm md:text-2xl font-light text-zinc-900 dark:text-white leading-tight truncate">
                    {product.title.split(' ')[0]} <span className="font-black italic">{product.title.split(' ')[1] || ''}</span>
                  </h3>
                  <p className="text-[12px] md:text-xl font-black text-purple-600 mt-1">
                    ${product.price}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 md:mt-6 pt-2 md:pt-6 border-t border-zinc-100 dark:border-zinc-800">
                   <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest truncate max-w-[60px] md:max-w-none">
                    ARTWORK
                   </span>

                  <button 
                    onClick={() => router.push(`/products/${product._id}`)}
                    className="relative group/btn flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-zinc-900 dark:bg-white rounded-xl md:rounded-2xl transition-all hover:md:w-32 overflow-hidden"
                  >
                    <div className="flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-[-20px] md:group-hover/btn:opacity-0">
                      <ArrowUpRight className="text-white dark:text-zinc-900 w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <span className="absolute opacity-0 group-hover/btn:opacity-100 transition-all duration-300 translate-x-2 text-white dark:text-zinc-900 text-[10px] md:text-xs font-bold whitespace-nowrap">
                      VIEW DETAIL
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-20 text-center text-zinc-400 italic">No masterpieces found matching your search.</div>
      )}
    </div>
  );
}