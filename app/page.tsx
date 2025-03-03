import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/SideBar";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black text-white">
      {/* Left Sidebar (Filters) */}
      <Sidebar />

      {/* Product Listing */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Showing {products.length} results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </main>
  );
}
