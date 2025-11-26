'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Timeless Monochrome Collection",
    subtitle: "Discover classic black & white designs that never go out of style.",
    img: "https://nogor.com.bd/wp-content/uploads/2023/11/WEB-BANNER--scaled.avif",
    gradient: "from-[#2d1b3d] to-[#5d2a6e]",
  },
  {
    id: 2,
    title: "Express Your Style with Nogor",
    subtitle: "Showcase your unique taste with our premium T-shirts and hoodies.",
    img: "https://nogor.com.bd/wp-content/uploads/2023/11/Untitled-design-2-scaled.avif",
    gradient: "from-[#1a2a3d] to-[#0f172a]",
  },
  {
    id: 3,
    title: "Comfort Meets Creativity",
    subtitle: "Explore vibrant joggers and casual wear for every artistic soul.",
    img: "https://nogor.com.bd/wp-content/uploads/2024/03/Web-Banner-3-png.avif",
    gradient: "from-[#4a1a5c] to-[#8b3a8a]",
  },
];


const Slider = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);

  
  useEffect(() => {
    const contents = sectionRef.current?.querySelectorAll(".slide-content");
    if (!contents) return;

    gsap.set(contents, { opacity: 0, y: 60 });
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    tl.to(contents, { opacity: 1, y: 0, stagger: 0.2 });

    return () => tl.kill();
  }, [current]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i) => setCurrent(i);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient} opacity-70 transition-all duration-700`}
        style={{ zIndex: 5 }}
      />

      {/* Background image */}
      <div
        key={slides[current].id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${slides[current].img})`,
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          filter: "brightness(60%)",
          zIndex: 10,
        }}
      />

      {/* Slide content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="slide-content mb-3 text-3xl font-extrabold tracking-wide drop-shadow-lg md:text-5xl">
          {slides[current].title}
        </h1>
        <p className="slide-content max-w-2xl text-md font-light opacity-90 md:text-xl">
          {slides[current].subtitle}
        </p>
        <Link
          href="/explore"
          className="slide-content mt-6 rounded-xl bg-gray-200 px-6 py-3 font-semibold text-black shadow-xl transition-transform duration-300 hover:scale-105"
        >
          Explore Now
        </Link>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#f9d29d]" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
