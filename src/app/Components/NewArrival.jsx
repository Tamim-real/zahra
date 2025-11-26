'use client'
import React, { useState } from "react";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewArrival({ art, onView }) {
  const [likes, setLikes] = useState(art?.likes || 0);
  const [liked, setLiked] = useState(false);

  function toggleLike(e) {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setLikes((l) => (next ? l + 1 : Math.max(0, l - 1)));
      return next;
    });
  }

  return (
    <article
      className="group relative w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl 
                 bg-gradient-to-br from-purple-100 via-pink-50 to-white 
                 border border-transparent hover:border-purple-400 
                 transform transition duration-500 hover:scale-[1.03]"
      aria-label={`Artwork card: ${art.title} by ${art.created_by}`}
    >
      {/* Image */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <Image
          src={art.image}
          alt={`${art.title} by ${art.created_by}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-md 
                        px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 shadow">
          {art.category}
        </div>

        {/* Like button */}
        <button
          onClick={toggleLike}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow 
                      transition ${liked ? "bg-pink-500 text-white" : "bg-white/70 text-gray-700"} 
                      hover:scale-110`}
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
          
        </button>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent 
                        opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-5">
          <h3 className="text-lg font-bold text-white drop-shadow">{art.title}</h3>
          <p className="text-gray-200 text-sm mt-1">{art.created_by}</p>
          <p className="text-pink-300 font-semibold mt-2">${art.price}</p>

          <Link
            href="/explore"
            onClick={() => {
              if (onView) onView(art);
            }}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold 
                       bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 
                       text-white shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
