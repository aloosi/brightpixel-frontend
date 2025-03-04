"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import AboutUs from "@/components/AboutUs";

export default function Navbar({ searchInput = "", setSearchInput }: { searchInput?: string; setSearchInput?: (value: string) => void }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <nav className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-50 border-b border-gray-800">
        {/* Left Side - Logo and Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="h-8 w-auto" />
          </Link>
          <button onClick={() => setIsAboutOpen(true)} className="hover:text-gray-400 transition font-bold">
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
          <Link href="/cart">
            <ShoppingCart size={24} className="hover:text-gray-400 transition" />
          </Link>
          <User size={24} className="hover:text-gray-400 transition cursor-pointer" />
        </div>
      </nav>

      {/* About Us Modal */}
      <AboutUs isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}
