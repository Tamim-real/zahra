"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const userImg = session?.user?.image || "https://i.pravatar.cc/50";
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Feed", href: "/feed" },
  ];

  const authLinks = [
    { name: "Add Products", href: "/add-products" },
    { name: "Manage Products", href: "/manage-products" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white shadow-xl rounded-2xl px-6 py-3 flex items-center justify-between z-50">
      
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold tracking-wide">
        Zahra
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-lg">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-pink-600 transition-colors duration-200">
            {link.name}
          </Link>
        ))}
        {isLoggedIn && authLinks.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-pink-600 transition-colors duration-200">
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right Side Desktop */}
      <div className="hidden md:flex items-center gap-4 relative">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition">
              Register
            </Link>
          </>
        ) : (
          <div className="relative" ref={userMenuRef}>
            <Image
              src={userImg}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer transition hover:scale-105"
              width={40}
              height={40}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl p-3 animate-fadeIn">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-gray-500 text-sm mb-3">{userEmail}</p>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-xl rounded-xl p-4 flex flex-col gap-3 md:hidden animate-slideDown">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg hover:text-pink-600 transition">
              {link.name}
            </Link>
          ))}

          {isLoggedIn && authLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg hover:text-pink-600 transition">
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link href="/login" className="border p-2 rounded-xl text-center hover:bg-gray-100 transition">
                Login
              </Link>
              <Link href="/register" className="bg-black text-white p-2 rounded-xl text-center hover:bg-gray-900 transition">
                Register
              </Link>
            </div>
          ) : (
            <div className="border-t pt-4 space-y-2">
              <Image src={userImg} alt="profile" width={50} height={50} className="rounded-full" />
              <p className="font-bold">{userName}</p>
              <p className="text-gray-500 text-sm">{userEmail}</p>
              <button
                onClick={() => signOut()}
                className="block w-full text-left p-2 hover:bg-gray-200 rounded text-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
