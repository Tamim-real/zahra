'use client';
import React, { useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";

export default function NewArrival({ art }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative group w-full transition-all duration-700 p-1.5 sm:p-3">
      
      {/* 1. The Dynamic Background (Glow Effect) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 2. Main Card Container */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] bg-white dark:bg-zinc-900 sm:bg-white/10 sm:dark:bg-black/20 sm:backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 sm:border-white/20 shadow-lg">
        
        {/* Image Section: Centered using flex */}
        <div className="relative aspect-[4/5] sm:h-56 m-1.5 sm:m-2.5 overflow-hidden rounded-[18px] sm:rounded-[24px] z-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={art.image}
            alt={art.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          
          <div className="absolute top-2 inset-x-2 sm:top-3 sm:inset-x-3 flex justify-between items-start z-20">
            <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              <span className="text-[8px] sm:text-[9px] font-bold text-white tracking-widest uppercase">
                {art.category}
              </span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30 transition-all active:scale-90"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
          </div>
        </div>

        {/* 3. Content Area: Fix for Title & Price spacing */}
        <div className="px-3 pb-4 pt-1 sm:px-4 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 mb-3">
            <div className="min-w-0 flex-1">
              <p className="hidden sm:block text-[9px] text-zinc-500 uppercase tracking-tighter mb-0.5">
                Artwork
              </p>
              <h3 className="text-[13px] sm:text-lg font-light text-zinc-900 dark:text-white leading-tight truncate">
                {art.title.split(' ')[0]} <span className="font-black italic">{art.title.split(' ')[1] || ''}</span>
              </h3>
            </div>
            
            <div className="shrink-0">
              <p className="text-xs sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                ${art.price}
              </p>
            </div>
          </div>

          {/* 4. Footer Section */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-white/10">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-white/10 shrink-0" />
              <p className="text-[9px] sm:text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 truncate">
                @{art.created_by?.toLowerCase().replace(/\s+/g, '')}
              </p>
            </div>

            <button className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-zinc-900 dark:bg-zinc-100 rounded-lg sm:rounded-xl transition-all active:scale-95 shadow-md">
              <ArrowUpRight className="text-white dark:text-zinc-900 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}