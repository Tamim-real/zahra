'use client'
import React from "react";
import NewArrival from "./NewArrival";


// Product data
const arts = [
    {
        _id: "1",
        title: "Crimson Stride T-Shirt",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2025/09/Crimson-Stride-T-Shirt-NS0303188-1.avif",
        category: "T-Shirt",
        sold: 12,
        price: 200
    },
    {
        _id: "2",
        title: "Cozy Comfort Collared Jersey",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2025/08/NOGORs-Cozy-Comfort-Sleek-Collared-Jersey-NHC0303182.avif",
        category: "Jersey",
        sold: 8,
        price: 190
    },
    {
        _id: "3",
        title: "Cozy Comfort Collared Jersey (Variant)",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2025/08/NOGORs-Cozy-Comfort-Sleek-Collared-Jersey-NHC0303181-1.avif",
        category: "Jersey",
        sold: 5,
        price: 300
    },
    {
        _id: "4",
        title: "Monochrome Dash T-Shirt",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2025/09/Monochrome-Dash-T-Shirt-NS0303187-1.avif",
        category: "T-Shirt",
        sold: 15,
        price: 280
    },
    {
        _id: "5",
        title: "Crimson City T-Shirt",
        created_by: "Nogor Fashion",
        image: "https://nogor.com.bd/wp-content/uploads/2025/08/NOGOR-Crimson-City-T-Shirt.avif",
        category: "T-Shirt",
        sold: 20,
        price: 100
    },
];

export default function NewArrivalList() {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {arts.map((art) => (
                <NewArrival key={art._id} art={art} />
            ))}
        </div>

    );
}
