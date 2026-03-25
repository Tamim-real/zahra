"use client";
import React from "react";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: Home, label: "HOME", href: "/" },
    { id: "explore", icon: Search, label: "Explore", href: "/explore" },
    { id: "cart", icon: ShoppingCart, label: "Cart", href: "/cart", badge: 2 },
    { id: "wishlist", icon: Heart, label: "Saved", href: "/wishlist" },
    { id: "profile", icon: User, label: "Profile", href: "/feed" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="mx-auto max-w-md mb-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] rounded-[24px] px-2 py-1.5">
        <ul className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-purple-600"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {/* Cart Badge */}
                  {item.badge && (
                    <span className="absolute top-0 right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}

                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />

                  <span
                    className={`text-[9px] font-semibold mt-0.5 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <div className="absolute inset-0 bg-purple-500/10 rounded-xl -z-10" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}