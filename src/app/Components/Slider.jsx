"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const slides = [
  {
    id: 1,
    img: "https://nogor.com.bd/wp-content/uploads/2023/11/WEB-BANNER--scaled.avif",
  },
  {
    id: 2,
    img: "https://nogor.com.bd/wp-content/uploads/2023/11/Untitled-design-2-scaled.avif",
  },
  {
    id: 3,
    img: "https://nogor.com.bd/wp-content/uploads/2024/03/Web-Banner-3-png.avif",
  },
];

const SimpleHero = () => {
  const [current, setCurrent] = useState(0);
  const bgRef = useRef(null);

  useEffect(() => {
    // Smooth fade and zoom effect for images
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1, filter: "brightness(0.8)" },
      { scale: 1, filter: "brightness(1)", duration: 4, ease: "power2.out" }
    );
  }, [current]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[65vh] md:h-[85vh] overflow-hidden bg-zinc-950">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          key={slides[current].id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slides[current].img})`,
          }}
        />
      </div>

      {/* Floating CTA (Centered or Bottom) */}
      <div className="relative z-10 flex h-full items-end justify-center pb-20 md:pb-24">
        <Link
          href="/shop"
          className="group relative px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
        >
          <span className="text-xs font-black tracking-[0.3em] uppercase">
            Explore Collection
          </span>
        </Link>
      </div>

      {/* Modern Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative h-[3px] w-12 md:w-24 overflow-hidden bg-white/20 rounded-full"
          >
            <div
              className={`absolute inset-0 bg-white transition-transform duration-[5000ms] ease-linear origin-left ${
                i === current ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Side Vignettes for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </section>
  );
};

export default SimpleHero;