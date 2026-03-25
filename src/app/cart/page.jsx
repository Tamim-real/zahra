'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard } from 'lucide-react';

const ModernCart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Luxury Silk Jersey", price: 5500, quantity: 1, color: "Pearl White", size: "XL", img: "https://nogor.com.bd/wp-content/uploads/2025/06/Arsenal-FC-Zigzag-Concept-Jersey-%E2%80%93-202526-Season.avif" },
    { id: 2, name: "Premium Chiffon Jersey", price: 850, quantity: 2, color: "Dusty Rose", size: "Standard", img: "https://nogor.com.bd/wp-content/uploads/2025/05/Barcelona-Concept-Kit-Jersey-2025-%E2%80%93-Nogor-Edition.avif" },
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));
  
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.05; // 5% VAT

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] mt-20 font-sans py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light tracking-tight italic font-serif">Your Wardrobe</h1>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">{items.length} Items Selected</p>
          </div>
          <button className="text-sm font-medium border-b border-black pb-1 hover:text-gray-500 transition">Continue Shopping</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex gap-6 pb-8 border-b border-gray-100 items-center"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 w-32 h-40">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="font-semibold text-lg">৳{item.price * item.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-400">{item.color} • Size {item.size}</p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center bg-white border border-gray-100 rounded-full shadow-sm px-2">
                        <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:text-rose-500 transition"><Minus size={14}/></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:text-emerald-500 transition"><Plus size={14}/></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary - Sticky Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 sticky top-10">
              <h2 className="text-xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (Estimated)</span>
                  <span>৳{tax}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium italic underline">Calculated at checkout</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />
                <div className="flex justify-between text-2xl font-serif">
                  <span>Total</span>
                  <span className="font-bold">৳{subtotal + tax}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-200 group">
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full bg-white border border-gray-100 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                  <CreditCard size={18} /> Pay with SSLCommerz
                </button>
              </div>

              <p className="text-[10px] text-center text-gray-400 mt-6 tracking-widest uppercase">
                Free shipping on orders over ৳10,000
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModernCart;