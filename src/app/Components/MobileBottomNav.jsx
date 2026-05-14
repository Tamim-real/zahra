"use client";
import React from "react";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "explore", icon: Search, label: "Explore", href: "/explore" },
    { id: "cart", icon: ShoppingCart, label: "Cart", href: "/cart", badge: 2 },
    { id: "wishlist", icon: Heart, label: "Saved", href: "/wishlist" },
    { id: "profile", icon: User, label: "Me", href: "/feed" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-4 px-4">
      <nav className="mx-auto max-w-md">
        <div className="bg-white border border-zinc-200 shadow-xl rounded-3xl py-2 px-3">
          <ul className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.id} className="relative flex-1">
                  <Link
                    href={item.href}
                    className="relative flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all active:scale-95 group"
                  >
                    {/* Icon Container */}
                    <div className="relative">
                      <Icon
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive
                            ? "text-purple-600 scale-110"
                            : "text-zinc-500 group-hover:text-zinc-700"
                        }`}
                      />

                      {/* Cart Badge */}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-[10px] font-medium mt-1 transition-colors ${
                        isActive ? "text-purple-600" : "text-zinc-500"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-1 w-5 h-0.5 bg-purple-600 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}