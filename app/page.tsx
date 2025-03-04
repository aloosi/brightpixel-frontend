"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { products } from "@/lib/products";
import { useCart } from "@/components/cart/CartContext";

// ✅ Imports from dnd-kit
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import DraggableProductCard from "../components/DraggableProductCard";
import ProductCard from "@/components/ProductCard"; // We'll use this in the overlay

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart(); // Access cart context to add items

  // Extract filters from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const selectedSizeGroup = searchParams.get("size") || "";
  const sortingMethod = searchParams.get("sort") || "";
  const searchQuery = searchParams.get("search") || "";

  // State for search input
  const [searchInput, setSearchInput] = useState(searchQuery);
  // Track the product currently being dragged
  const [activeProduct, setActiveProduct] = useState(null);

  // Keep search in sync with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }, [searchInput]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchSizeGroup = selectedSizeGroup ? product.screenSizeGroup === selectedSizeGroup : true;
    const matchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchCategory && matchBrand && matchSizeGroup && matchQuery;
  });

  // Apply sorting
  if (sortingMethod === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortingMethod === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // ✅ Update filters in the URL
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  // ✅ DndContext callbacks
  function handleDragStart(event: any) {
    const product = event.active?.data?.current?.product;
    if (product) {
      setActiveProduct(product);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    // Reset active product
    setActiveProduct(null);

    if (!over) return; // Dropped outside

    if (over.id === "cart-icon") {
      // The item was dropped on the cart icon
      const product = active?.data?.current?.product;
      if (product) {
        addToCart(product);
      }
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />

      <main className="flex min-h-screen bg-black text-white">
        <Sidebar onFilterChange={updateFilters} onSortChange={(sort) => updateFilters("sort", sort)} />

        {/* ✅ DndContext */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">
              Showing {filteredProducts.length} results
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <DraggableProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* ✅ DragOverlay to prevent page shifting */}
          <DragOverlay>
            {activeProduct ? (
              <div className="w-72">
                <ProductCard product={activeProduct} />
              </div>
            ) : null}
          </DragOverlay>
      </main>
    </div>
    </DndContext>
  );
}
