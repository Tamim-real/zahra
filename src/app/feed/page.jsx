'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const SAMPLE_DATA = [
  {
    id: "a1",
    title: "Monochrome Dash T-Shirt",
    image:
      "https://nogor.com.bd/wp-content/uploads/2025/09/Monochrome-Dash-T-Shirt-NS0303187-1.avif",
    medium: "Premium Export Cotton",
    description:
      "Modern minimal pattern with bold monochrome vibes — breathable and stylish for daily wear.",
    likes: 65,
    comments: 8,
    artist: { name: "Tanvir Ahmed", avatar: "https://i.pravatar.cc/60?img=1" },
    tags: ["t-shirt", "menswear", "streetwear"],
  },
  {
    id: "a2",
    title: "Crimson City T-Shirt",
    image:
      "https://nogor.com.bd/wp-content/uploads/2025/08/NOGOR-Crimson-City-T-Shirt.avif",
    medium: "Soft Cotton Blend",
    description:
      "Bold red design inspired by the raw energy of a midnight cityscape. Perfect for standout style.",
    likes: 91,
    comments: 14,
    artist: { name: "Tamim Islam", avatar: "https://i.pravatar.cc/60?img=2" },
    tags: ["t-shirt", "graphic", "urban"],
  },
  {
    id: "a3",
    title: "Champagne Contrast Hoodie",
    image:
      "https://nogor.com.bd/wp-content/uploads/2024/11/Classic-Pullover-Hoodie-for-Men-Champaign-Contrast-scaled.avif",
    medium: "Fleece & Cotton",
    description:
      "A smooth mix of elegance and comfort — crafted for premium winter vibes.",
    likes: 120,
    comments: 25,
    artist: { name: "Sahadat Hossain", avatar: "https://i.pravatar.cc/60?img=3" },
    tags: ["hoodie", "winterwear", "contrast"],
  },
  {
    id: "a4",
    title: "Black Contrast Hoodie",
    image:
      "https://nogor.com.bd/wp-content/uploads/2023/11/Classic-Pullover-Hoodie-for-Men-Black-contrast-1-scaled.jpg",
    medium: "Soft Heavy Fleece",
    description:
      "Classic black hoodie with premium contrast detailing — stylish and warm.",
    likes: 105,
    comments: 18,
    artist: { name: "Mohiuudin", avatar: "https://i.pravatar.cc/60?img=4" },
    tags: ["hoodie", "black", "minimal"],
  },
  {
    id: "a5",
    title: "Embroidery Premium Hoodie",
    image:
      "https://nogor.com.bd/wp-content/uploads/2023/11/EMBROIDERY-HOODIE-3-scaled.jpg",
    medium: "High-End Embroidery Finish",
    description:
      "Luxury look with smooth embroidery — premium fit designed for fashion-forward men.",
    likes: 88,
    comments: 12,
    artist: { name: "Tarique", avatar: "https://i.pravatar.cc/60?img=6" },
    tags: ["hoodie", "embroidery", "luxury"],
  },
  {
    id: "a6",
    title: "Premium Joggers — Edition A",
    image:
      "https://nogor.com.bd/wp-content/uploads/2024/08/NOGOR-Premium-Joggers-1.png",
    medium: "Soft Stretch Fabric",
    description:
      "Everyday comfort meets modern athletic design — perfect for gym or styling.",
    likes: 77,
    comments: 10,
    artist: { name: "Abu Hasan", avatar: "https://i.pravatar.cc/60?img=7" },
    tags: ["joggers", "sportswear", "comfort"],
  },
  {
    id: "a7",
    title: "Premium Joggers — Edition B",
    image:
      "https://nogor.com.bd/wp-content/uploads/2024/07/NOGOR-Premium-Joggers-NPJ01G3001004.png",
    medium: "Performance Fabric",
    description:
      "Slim-fit joggers offering smooth mobility and stylish urban edge.",
    likes: 64,
    comments: 7,
    artist: { name: "Fahim", avatar: "https://i.pravatar.cc/60?img=8" },
    tags: ["joggers", "casual", "activewear"],
  },
];




export default function CommunityHighlights() {
  const [liked, setLiked] = useState(() => new Set());

  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="max-w-6xl mx-auto mt-20 px-4 py-12">
      
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-10">
        Customer`s Feed
      </h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SAMPLE_DATA.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            
            <div className="flex items-center gap-3 p-4">
              <img
                src={item.artist.avatar}
                alt={item.artist.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.artist.name}
                </h3>
                <p className="text-xs text-gray-500">{item.medium}</p>
              </div>
            </div>

            
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-h-[400px] object-contain bg-gray-50 dark:bg-gray-700"
                loading="lazy"
              />
            </div>

            
            <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {item.description}
                </p>

             
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              
              <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 text-gray-600 dark:text-gray-300">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="flex items-center gap-2 hover:text-rose-500 transition-all"
                >
                  <Heart
                    size={18}
                    className={`${
                      liked.has(item.id) ? "text-rose-500 fill-rose-500" : ""
                    }`}
                  />
                  <span className="text-sm">
                    {item.likes + (liked.has(item.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-2 hover:text-blue-500 transition-all">
                  <MessageCircle size={18} />
                  <span className="text-sm">{item.comments}</span>
                </button>

                <button className="flex items-center gap-2 hover:text-green-500 transition-all">
                  <Share2 size={18} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
