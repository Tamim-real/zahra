"use client";
import React, { useState } from "react";
import { ArrowUpRight, Heart, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SavedPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Midnight Hoodie",
      price: 7800,
      image: "https://nogor.com.bd/wp-content/uploads/2024/11/Classic-Pullover-Hoodie-for-Men-Champaign-Contrast-scaled.avif",
      category: "Hoodie",
      created_by: "Zahra Studio",
    },
    {
      id: 2,
      title: "Silk Hoodie",
      price: 4200,
      image: "https://nogor.com.bd/wp-content/uploads/2023/11/EMBROIDERY-HOODIE-3-scaled.jpg",
        category: "Jersey",
      category: "Abaya",
      created_by: "Zahra Studio",
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen pt-28 mt-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black italic">
            Saved Items
          </h1>
          <p className="text-zinc-500">{items.length} Items</p>
        </div>

        {/* Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((art) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {/* Card */}
                <div className="relative group w-full transition-all duration-700 p-2">
                  
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Card Body */}
                  <div className="relative overflow-hidden rounded-[24px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                    
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] m-2">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      />

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(art.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {art.title}
                          </h3>
                          <p className="text-xs text-zinc-500">
                            {art.category}
                          </p>
                        </div>

                        <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                          ৳{art.price}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center border-t pt-3">
                        <p className="text-xs text-zinc-500">
                          @{art.created_by}
                        </p>

                        <button className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center hover:scale-105 transition">
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty */}
        {items.length === 0 && (
          <div className="text-center py-40">
            <h2 className="text-3xl text-gray-400">No Saved Items</h2>
          </div>
        )}
      </div>
    </div>
  );
}