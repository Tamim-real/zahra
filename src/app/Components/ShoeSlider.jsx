"use client";
import React from "react";

const shoes = [
  {
    id: 1,
    title: "Sports 3",
    price: "130",
    category: "Basketball",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/01baa5ff-102a-4302-89f6-dfdf7e329614/SABRINA+3.png",
  },
  {
    id: 2,
    title: "Sabrina 4",
    price: "145",
    category: "Signature",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/00f99b39-4679-4fe9-96b8-ed36f417525c/SABRINA+3.png",
  },
  {
    id: 3,
    title: "Prime(GS)",
    price: "110",
    category: "Kids Edition",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/560681ff-4d0f-427f-9d58-f5b0475b4f24/SABRINA+3+OR.png",
  },
  {
    id: 4,
    title: "Sports Gamer",
    price: "160",
    category: "Limited",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63a3e55d-640c-4d3c-babd-52361c10c0a7/SABRINA+3+GAMER.png",
  },
];

const ShoeCard = ({ shoe }) => {
  return (
    <div className="relative group w-[340px] md:w-[380px] perspective-1000 flex-shrink-0 px-4">
      {/* Dynamic Glow */}
      <div className="absolute -inset-8 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-500 rounded-[60px] opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700" />

      {/* Main Card */}
      <div className="relative bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[52px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_35px_60px_-15px_rgb(168,85,247,0.4)]">
        
        {/* Image Container */}
        <div className="relative aspect-[4/4.2] m-6 mb-4 overflow-hidden rounded-[40px] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
          <img
            src={shoe.image}
            alt={shoe.title}
            className="w-[88%] h-auto object-contain transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-[-8deg] drop-shadow-2xl"
          />

          {/* Category Badge */}
          <div className="absolute top-6 right-6 px-4 py-1.5 text-xs font-medium tracking-widest bg-black/70 text-white backdrop-blur-md rounded-full border border-white/20">
            {shoe.category}
          </div>
        </div>

        {/* Content */}
        <div className="px-10 pb-10">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-light text-zinc-900 dark:text-white tracking-tighter">
                {shoe.title.split(" ")[0]}{" "}
                <span className="font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {shoe.title.split(" ").slice(1).join(" ")}
                </span>
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Nike • Limited Drop</p>
            </div>

            <div className="text-right">
              <p className="text-4xl font-black bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
                ${shoe.price}
              </p>
            </div>
          </div>

          {/* Hover Action Button */}
          <button className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold tracking-wider text-sm hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/30">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ShoeSlider() {
  const tripleShoes = [...shoes, ...shoes, ...shoes, ...shoes];

  return (
    <div className="relative w-full overflow-hidden py-28 bg-[#0a0a0a] font-sans">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e520_0%,transparent_70%)]" />

      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          TRENDING DROPS
        </h2>
        <p className="text-zinc-500 mt-3">Limited. Exclusive. Yours.</p>
      </div>

      {/* Infinite Slider */}
      <div className="flex w-max animate-fast-slide items-center gap-8">
        {tripleShoes.map((shoe, index) => (
          <ShoeCard key={index} shoe={shoe} />
        ))}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .animate-fast-slide {
          animation: slide 18s linear infinite;
        }

        .animate-fast-slide:hover {
          animation-play-state: paused;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}