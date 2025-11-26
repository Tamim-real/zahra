'use client'
import React from "react";
import NewArrival from "./NewArrival";

// Product data for Joggers
const joggers = [
  {
    _id: "1",
    title: "Premium Joggers",
    created_by: "Nogor Fashion",
    image: "https://nogor.com.bd/wp-content/uploads/2025/06/Arsenal-FC-Zigzag-Concept-Jersey-%E2%80%93-202526-Season.avif",
    category: "Jersey",
    sold: 18,
  },
  {
    _id: "2",
    title: "Premium Joggers (Gray Variant)",
    created_by: "Nogor Fashion",
    image: "https://nogor.com.bd/wp-content/uploads/2025/06/Real-Madrid-Official-Third-Kit-%E2%80%93-new.avif",
    category: "Jersey",
    sold: 10,
  },
  {
    _id: "3",
    title: "Premium Joggers (Black Variant)",
    created_by: "Nogor Fashion",
    image: "https://nogor.com.bd/wp-content/uploads/2025/05/Barcelona-Concept-Kit-Jersey-2025-%E2%80%93-Nogor-Edition.avif",
    category: "Jersey",
    sold: 7,
  },
];

export default function Jersey() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {joggers.map((art) => (
        <NewArrival key={art._id} art={art} />
      ))}
    </div>
  );
}
