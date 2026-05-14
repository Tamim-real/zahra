"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    img: "https://nogor.com.bd/wp-content/uploads/2023/11/WEB-BANNER--scaled.avif",
    accent: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    img: "https://nogor.com.bd/wp-content/uploads/2026/05/Nogor-New-Released-Web-Banner-MAY-2026.avif",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    img: "https://nogor.com.bd/wp-content/uploads/2024/03/Web-Banner-3-png.avif",
    accent: "from-orange-500 to-red-500",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Changed to 5 seconds for better pace

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black rounded-[40px] mx-4 md:mx-6 my-6 shadow-2xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[current].img})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-xs md:text-sm font-bold tracking-[3px] uppercase mb-6 text-zinc-300">
          NOGOR • BANGLADESH
        </p>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-8">
          ELEVATE
          <span
            className={`block bg-gradient-to-r ${slides[current].accent} bg-clip-text text-transparent`}
          >
            YOUR STYLE
          </span>
        </h2>

        <Link
          href="/explore"
          className="inline-flex items-center gap-3 bg-white text-black font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:bg-zinc-100 active:scale-95 transition-all"
        >
          SHOP NOW
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-12 bg-white"
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Border Frame */}
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[40px]" />
    </section>
  );
};

export default Slider;