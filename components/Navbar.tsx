"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import AboutUs from "@/components/AboutUs"; // ✅ Re-added About Us modal

export default function Navbar({ searchInput = "", setSearchInput }: { searchInput?: string; setSearchInput?: (value: string) => void }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false); // ✅ Added state for About Us
  const { cart } = useCart(); // ✅ Access cart state to show count

  return (
    <>
      <nav className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-50 border-b border-gray-700">
        {/* Left Side - Logo and Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="h-8 w-auto" />
          </Link>
          <button onClick={() => setIsAboutOpen(true)} className="hover:text-gray-400 transition text-gray-400">
            About Us
          </button>
        </div>

        {/* Center - Search Bar */}
        <div className="relative flex-1 mx-10 max-w-lg">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchInput}
            onChange={(e) => setSearchInput?.(e.target.value)}
            className="bg-gray-900 text-white px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="absolute right-3 top-2 text-gray-500" size={20} />
        </div>

        {/* Right Side - Shopping Cart and User Icon */}
        <div className="flex items-center space-x-6">
          {/* ✅ Cart Button with Item Count */}
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart size={24} className="hover:text-gray-400 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>

          <User size={24} className="hover:text-gray-400 transition cursor-pointer" />
        </div>
      </nav>

      {/* ✅ About Us Modal */}
      <AboutUs isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* ✅ Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
