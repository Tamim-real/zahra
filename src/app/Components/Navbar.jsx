"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const userImg = session?.user?.image || "https://i.pravatar.cc/50";

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

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white shadow-xl rounded-2xl px-6 py-3 flex items-center justify-between z-50">
      
      {/* Logo */}
      <div className="text-3xl font-bold tracking-wide">Zahra</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-lg">
        <Link href="/" className="hover:text-pink-600 transition-colors duration-200">
          Home
        </Link>
        <Link href="/explore" className="hover:text-pink-600 transition-colors duration-200">
          Explore
        </Link>
        <Link href="/feed" className="hover:text-pink-600 transition-colors duration-200">
          Feed
        </Link>
        {isLoggedIn && (
          <>
            <Link href="/add-products" className="hover:text-pink-600 transition-colors duration-200">
              Add Products
            </Link>
            <Link href="/manage-products" className="hover:text-pink-600 transition-colors duration-200">
              Manage Products
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4 relative">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative" ref={userMenuRef}>
            <Image
              src={userImg}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer transition hover:scale-105"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              width={40}
              height={40}
            />

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-xl py-2 animate-fadeIn">
                <Link href="/add-products" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Add Product
                </Link>
                <Link href="/manage-products" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Manage Product
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-xl rounded-xl p-4 flex flex-col gap-3 md:hidden max-h-[70vh] overflow-y-auto animate-slideDown">
          <Link href="/" className="text-lg hover:text-pink-600 transition">
            Home
          </Link>
          <Link href="/explore" className="text-lg hover:text-pink-600 transition">
            Explore
          </Link>
          <Link href="/feed" className="text-lg hover:text-pink-600 transition">
            Feed
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/add-products" className="text-lg hover:text-pink-600 transition">
                Add Products
              </Link>
              <Link href="/manage-products" className="text-lg hover:text-pink-600 transition">
                Manage Products
              </Link>
            </>
          )}

          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/login"
                className="border p-2 rounded-xl hover:bg-gray-100 transition text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white p-2 rounded-xl hover:bg-gray-900 transition text-center"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <Image
                src={userImg}
                alt="user"
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
              <Link href="/add-products" className="block w-full text-left p-2 hover:bg-gray-200 rounded transition">
                Add Product
              </Link>
              <Link href="/manage-products" className="block w-full text-left p-2 hover:bg-gray-200 rounded transition">
                Manage Product
              </Link>
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
