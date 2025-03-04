"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { products } from "@/lib/products";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract filter & sorting parameters from the URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const selectedSizeGroup = searchParams.get("size") || "";
  const sortingMethod = searchParams.get("sort") || "";
  const searchQuery = searchParams.get("search") || "";

  // State for search input
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }, [searchInput]);

  // Filter products based on selections and search query
  let filteredProducts = products.filter((product) => {
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedBrand ? product.brand === selectedBrand : true) &&
      (selectedSizeGroup ? product.screenSizeGroup === selectedSizeGroup : true) &&
      (searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
    );
  });

  // Apply sorting
  if (sortingMethod === "low-to-high") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortingMethod === "high-to-low") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Function to update filters in the URL
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
      <main className="flex min-h-screen bg-black text-white">
        {/* Sidebar (Filters + Sorting) */}
        <Sidebar onFilterChange={updateFilters} onSortChange={(sort) => updateFilters("sort", sort)} />

        {/* Product Listing */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Showing {filteredProducts.length} results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
