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
    <div className="relative group w-[340px] md:w-[420px] transition-all duration-700 p-8 flex-shrink-0">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main Card - Rounded Shape [50px] */}
      <div className="relative overflow-hidden rounded-[50px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl backdrop-blur-xl">
        
        {/* Image Section - Extra Margin and Rounded [40px] */}
        <div className="relative aspect-[4/5] m-6 overflow-hidden rounded-[40px] z-10 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 transition-colors duration-500 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800">
          <img
            src={shoe.image}
            alt={shoe.title}
            className="w-[85%] h-auto object-contain transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-[-5deg] drop-shadow-2xl"
          />
        </div>

        {/* Content Area - Increased Padding */}
        <div className="px-12 pb-16 pt-6">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              
              <h3 className="text-2xl font-light text-zinc-900 dark:text-white leading-tight truncate">
                {shoe.title.split(' ')[0]} <span className="font-black italic">{shoe.title.split(' ').slice(1).join(' ') || ''}</span>
              </h3>
            </div>
            
            <div className="shrink-0">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                ${shoe.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ShoeSlider() {
  const tripleShoes = [...shoes, ...shoes, ...shoes, ...shoes];

  return (
    <div className="relative w-full overflow-hidden py-32 bg-[#fafafa] dark:bg-black font-sans">
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 h-full w-32 md:w-80 bg-gradient-to-r from-[#fafafa] dark:from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-32 md:w-80 bg-gradient-to-l from-[#fafafa] dark:from-black to-transparent z-20 pointer-events-none" />

      {/* Fast Infinite Slide */}
      <div className="flex w-max animate-fast-slide items-center px-10">
        {tripleShoes.map((shoe, index) => (
          <ShoeCard key={index} shoe={shoe} />
        ))}
      </div>

      <style jsx>{`
        .animate-fast-slide {
          animation: slide 12s linear infinite;
        }
        .animate-fast-slide:hover {
          animation-play-state: paused;
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}