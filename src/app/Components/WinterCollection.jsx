'use client'
import React from "react";
import NewArrival from "./NewArrival";


// Product data
const arts = [
    {
        _id: "1",
        title: "Crimson Stride T-Shirt",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2024/11/Classic-Pullover-Hoodie-for-Men-Champaign-Contrast-scaled.avif",
        category: "T-Shirt",
        sold: 12,
    },
    {
        _id: "2",
        title: "Cozy Comfort Collared Jersey",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2023/11/EMBROIDERY-HOODIE-3-scaled.jpg",
        category: "Jersey",
        sold: 8,
    },
    {
        _id: "3",
        title: "Cozy Comfort Collared Jersey (Variant)",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2023/11/Classic-Pullover-Hoodie-for-Men-Black-contrast-1-scaled.jpg",
        category: "Jersey",
        sold: 5,
    },
    
];

export default function WinterCollection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {arts.map((art) => (
                <NewArrival key={art._id} art={art} />
            ))}
        </div>

    );
}
