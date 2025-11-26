'use client'
import React from "react";
import { Star } from "lucide-react"; // for star icons

// Sample reviews data (all male pics now)
const reviews = [
  {
    id: 1,
    name: "Mohi Rahman",
    role: "Verified Buyer",
    review:
      "The Crimson Stride T-Shirt is super comfortable and stylish. Quality exceeded my expectations!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/15.jpg", 
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Customer",
    review:
      "Zahra’s jersies are perfect for daily wear. Soft fabric and great fit. Highly recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg", 
  },
  {
    id: 3,
    name: "Mahumd Kabir",
    role: "Fashion Enthusiast",
    review:
      "Loved the Cozy Comfort Jersey. It feels premium and looks amazing. Will buy again!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg", 
  },
];

export default function CustomerReview() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold border bg-gray-200 my-3 py-2 rounded-xl text-center text-gray-900 dark:text-white mb-10">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <img
                src={r.image}
                alt={r.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />

              {/* Name & Role */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {r.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {r.role}
              </p>

              {/* Review Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {r.review}
              </p>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
