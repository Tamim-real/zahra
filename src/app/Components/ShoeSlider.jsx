"use client";
import React from "react";

const shoes = [
  {
    id: 1,
    title: "SABRINA 3",
    price: "130",
    category: "BASKETBALL",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/01baa5ff-102a-4302-89f6-dfdf7e329614/SABRINA+3.png",
  },
  {
    id: 2,
    title: "SABRINA 4",
    price: "145",
    category: "SIGNATURE",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/00f99b39-4679-4fe9-96b8-ed36f417525c/SABRINA+3.png",
  },
  {
    id: 3,
    title: "PRIME (GS)",
    price: "110",
    category: "KIDS EDITION",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/560681ff-4d0f-427f-9d58-f5b0475b4f24/SABRINA+3+OR.png",
  },
  {
    id: 4,
    title: "SPORTS GAMER",
    price: "160",
    category: "LIMITED",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63a3e55d-640c-4d3c-babd-52361c10c0a7/SABRINA+3+GAMER.png",
  },
];

const ShoeCard = ({ shoe }) => {
  return (
    <div className="group relative w-[380px] px-6 py-10 transition-all duration-500">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-x-10 top-20 bottom-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative flex flex-col bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 rounded-[40px] overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-transform duration-500 group-hover:-translate-y-2">
        
        {/* Category Tag */}
        <div className="absolute top-8 left-8 z-20">
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase">
            {shoe.category}
          </span>
        </div>

        {/* Floating Price Badge */}
        <div className="absolute top-6 right-6 z-20 bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full shadow-xl translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <p className="text-sm font-bold">${shoe.price}</p>
        </div>

        {/* Image Display */}
        <div className="relative aspect-square flex items-center justify-center p-12">
          <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-800/20 scale-90 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-1000" />
          <img
            src={shoe.image}
            alt={shoe.title}
            className="relative z-10 w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12"
          />
        </div>

        {/* Content Section */}
        <div className="px-10 pb-10 pt-2 flex flex-col items-center text-center">
          <h3 className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase">
            {shoe.title}
          </h3>
          
          <button className="mt-6 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black tracking-widest rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 active:scale-95 uppercase">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ShoeSlider() {
  const infiniteShoes = [...shoes, ...shoes, ...shoes, ...shoes, ...shoes];

  return (
    <section className="relative w-full overflow-hidden py-24 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500">
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-10 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] text-indigo-500 uppercase mb-2">New Arrivals</h2>
          <p className="text-5xl font-black italic tracking-tighter dark:text-white">NIKE BY YOU</p>
        </div>
        <p className="hidden md:block text-zinc-500 text-sm max-w-[200px] text-right font-medium">
          Premium performance engineered for the next generation.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Edge Vignettes */}
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-zinc-50 dark:from-[#080808] to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-zinc-50 dark:from-[#080808] to-transparent z-30 pointer-events-none" />

        <div className="flex w-max animate-infinite-scroll items-center hover:[animation-play-state:paused]">
          {infiniteShoes.map((shoe, index) => (
            <ShoeCard key={`${shoe.id}-${index}`} shoe={shoe} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}